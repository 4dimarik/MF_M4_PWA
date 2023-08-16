import { NavLink, useOutletContext, useParams } from 'react-router-dom';
import moment from 'moment';
import { Flex, Avatar, Text, Group, Button } from '@mantine/core';
import { useFetch } from '../hooks/useFetch';
import BackBtn from '../components/BackBtn';

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
  const { id } = useParams();
  const { category, endpoint } = useOutletContext();

  const { data: obj, isLoading } = useFetch(
    'https://rickandmortyapi.com/api/' + endpoint + `/${id}`
  );

  return (
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
      {!isLoading && (
        <Flex justify="center">
          <Group noWrap>
            {obj?.image && <Avatar src={obj.image} size={350} radius="md" />}
            <div>
              {Object.keys(obj).map((item) => (
                <Flex key={item} align="center">
                  <Text fz="md" mr={8} c="dimmed">
                    {item}
                  </Text>
                  <Text fz="md" fw={500}>
                    {getValue(item, obj[item], category)}
                  </Text>
                </Flex>
              ))}
            </div>
          </Group>
        </Flex>
      )}
    </>
  );
}
