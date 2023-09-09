import { useOutletContext, useNavigate, useLocation } from 'react-router-dom';
import { routes } from '../context/router';
import { List } from '../components/ListComponent';
import moment from 'moment/moment';
import { Loader } from '@mantine/core';
import { useFetch } from '../hooks/useFetch';
import { useState, useEffect } from 'react';

export default function CategoryPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { category, endpoint } = useOutletContext();
  const [pageNum, setPageNum] = useState(1);
  const [itemList, setItemList] = useState([]);

  const { data, isLoading, error, refetch } = useFetch(
    'https://rickandmortyapi.com/api/' + endpoint,
    { params: { page: 1 } }
  );

  useEffect(() => {
    setItemList([]);
  }, [category]);

  useEffect(() => {
    if (data?.results) {
      setItemList((prevState) => [...prevState, ...data.results]);
    }
  }, [data]);

  useEffect(() => {
    if (pageNum > 1) {
      refetch({
        params: {
          page: pageNum,
        },
      });
    }
  }, [pageNum]);

  // const results = data?.results;
  const hasMore = data?.info.pages !== pageNum;

  const handleOpenItemDetails = (id) => {
    navigate(`${location.pathname}/${id}`);
  };

  const fields = {
    name: {
      name: 'name',
      label: 'Name',
      value: (value) => value,
      sort: null,
    },
    created: {
      name: 'created',
      label: 'Created',
      value: (value) => moment(value).format('YYYY-MM-DD HH:mm'),
      sort: {
        asc: (a, b) => {
          return moment(a.created).unix() - moment(b.created).unix();
        },
        desc: (a, b) => {
          return moment(b.created).unix() - moment(a.created).unix();
        },
      },
    },
  };
  return (
    <>
      <h2>{routes.categories.nav.variations[category].label}</h2>
      <div>
        {isLoading ? (
          <Loader variant="bars" m="auto" />
        ) : error ? (
          <div>Ошибка. Повторите попытку позже.</div>
        ) : (
          <List
            data={itemList}
            fields={fields}
            handleOpenItemDetails={handleOpenItemDetails}
            infinitiScroll={{
              isLoading,
              hasMore,
              setPageNum,
            }}
          />
        )}
      </div>
    </>
  );
}
