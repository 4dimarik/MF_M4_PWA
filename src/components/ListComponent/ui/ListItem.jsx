import PropTypes from 'prop-types';
import { Flex, Box, Title, Text } from '@mantine/core';

function ListItem({ index, fields, item, lastNodeRef, onClick }) {
  return (
    <Box
      ref={lastNodeRef}
      onClick={onClick}
      data-id={item?.id}
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        textAlign: 'center',
        padding: theme.spacing.sm,
        borderRadius: theme.radius.md,
        cursor: 'pointer',

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[5]
              : theme.colors.gray[1],
        },
      })}
    >
      <Flex>
        <Flex align="center">
          <Title order={4} p="sm">
            {`#${index}`}
          </Title>
        </Flex>
        <Box p="sm">
          <Text fz="lg" align="left" fw={700}>
            {fields.name.value(item.name)}
          </Text>
          <Text fz="sm" c="dimmed" align="left">
            {fields.created.value(item.created)}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

ListItem.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  lastNodeRef: PropTypes.func,
};

export { ListItem };
