import PropTypes from 'prop-types';
import { Flex, ActionIcon, Text } from '@mantine/core';
import { IconSortAscending, IconSortDescending } from '@tabler/icons-react';

const sortIcons = {
  asc: <IconSortAscending size="1.125rem" />,
  desc: <IconSortDescending size="1.125rem" />,
};

function ListHeader({ fields, sort, handleSort }) {
  return (
    <Flex
      justify="space-between"
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
      <Text>Сортировка</Text>
      <Flex align="center">
        <Text fw={500}>Дата создания: </Text>
        <ActionIcon onClick={() => handleSort('created')}>
          {sortIcons[sort.type]}
        </ActionIcon>
      </Flex>
    </Flex>
  );
}

ListHeader.propTypes = {
  fields: PropTypes.object.isRequired,
  sort: PropTypes.object,
  handleSort: PropTypes.func,
};

export { ListHeader };
