import { Stack } from '@mantine/core';
import PropTypes from 'prop-types';
import { ListItem } from './ListItem';

function ListBody({ data, fields, handleClick, lastNodeRef }) {
  return (
    <Stack
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
        width: '80%',
        margin: 'auto',
      })}
    >
      {data.map((item, idx) => (
        <ListItem
          key={item?.id}
          lastNodeRef={data.length === idx + 1 ? lastNodeRef : null}
          onClick={handleClick}
          index={idx + 1}
          item={item}
          fields={fields}
        />
      ))}
    </Stack>
  );
}

ListBody.propTypes = {
  data: PropTypes.array.isRequired,
  fields: PropTypes.object.isRequired,
  handleClick: PropTypes.func,
  lastNodeRef: PropTypes.func,
};

export { ListBody };
