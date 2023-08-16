import { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ListHeader } from './ListHeader';
import { ListBody } from './ListBody';

function List({ data, fields, handleOpenItemDetails, infinitiScroll }) {
  const { isLoading, hasMore, setPageNum } = infinitiScroll;
  const [sort, setSort] = useState({
    type: 'asc',
    func: undefined,
  });

  const toggleSort = (fieldName) => {
    const type = sort.type === 'asc' ? 'desc' : 'asc';
    const func = fields[fieldName].sort[type];
    setSort({ type, func });
  };

  const handleClick = ({ currentTarget }) => {
    const id = currentTarget.dataset?.id;
    if (id) handleOpenItemDetails(id);
  };

  const observer = useRef();
  const lastNodeRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNum((prevState) => prevState + 1);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasMore, setPageNum]
  );

  data = data.sort(sort.func);

  return (
    <div className="my-list">
      <ListHeader fields={fields} handleSort={toggleSort} sort={sort} />
      {data && (
        <ListBody
          data={data}
          fields={fields}
          handleClick={handleClick}
          lastNodeRef={lastNodeRef}
        />
      )}
    </div>
  );
}

List.propTypes = {
  data: PropTypes.array.isRequired,
  fields: PropTypes.object.isRequired,
  handleOpenItemDetails: PropTypes.func,
  infinitiScroll: PropTypes.object,
};

export { List };
