import {
  NavLink,
  useOutletContext,
  useParams,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import moment from 'moment';
import {
  Flex,
  Avatar,
  Text,
  Group,
  Button,
  AspectRatio,
  Box,
} from '@mantine/core';
import { useFetch } from '../hooks/useFetch';
import BackBtn from '../components/BackBtn';
import { Loader } from '@mantine/core';

const getValue = (fieldName, value, category) => {
  switch (fieldName) {
    case 'created':
      return moment(value).format('YYYY-MM-DD HH:mm');
    case 'residents':
    case 'characters':
    case 'episode':
      return null;
    case 'location':
    case 'origin': {
      if (value.name !== 'unknown') {
        const urlParts = value.url.split('/');
        const to = `/${urlParts[urlParts.length - 2]}/${
          urlParts[urlParts.length - 1]
        }`;
        return <NavLink to={to}>{value.name}</NavLink>;
      } else {
        return value.name;
      }
    }
    default:
      return value;
  }
};

export default function CategoryItemPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { category, endpoint } = useOutletContext();

  const {
    data: obj,
    isLoading,
    error,
  } = useFetch('https://rickandmortyapi.com/api/' + endpoint + `/${id}`);

  return error ? (
    <Navigate to="/404" replace />
  ) : (
    <>
      <Flex
        justify="end"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[5]
              : theme.colors.gray[1],
          padding: theme.spacing.sm,
          borderRadius: theme.radius.md,
          marginBottom: theme.spacing.md,
        })}
      >
        <Group position="center">
          <BackBtn>
            <Button variant="subtle" size="md">
              Назад
            </Button>
          </BackBtn>
        </Group>
      </Flex>
      {isLoading ? (
        <Flex justify="center">
          <Loader variant="bars" />
        </Flex>
      ) : (
        <Flex justify="center">
          <Group w="100%">
            {obj?.image && (
              <AspectRatio ratio={1 / 1} maw={300} mx="auto" sx={{ flex: 1 }}>
                <Avatar src={obj.image} radius="md" />
              </AspectRatio>
            )}
            <Box maw="100%">
              {Object.keys(obj).map((item) => (
                <Flex key={item} align="center">
                  <Text fz="md" mr={8} c="dimmed">
                    {item}
                  </Text>
                  <Text
                    fz="md"
                    fw={500}
                    sx={{ display: 'inline-block', wordBreak: 'break-word' }}
                  >
                    {getValue(item, obj[item], category)}
                  </Text>
                </Flex>
              ))}
            </Box>
          </Group>
        </Flex>
      )}
    </>
  );
}
