// filepath: /Users/gagikarutunan/Desktop/frontend-cats-challenge/src/features/cats/CatList.tsx
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import CatItem from './CatItem';
import { Container } from './Cat.styles';
import {
  getCats,
  selectCats,
  selectCurrentPage,
  selectFetching,
} from './CatsSlice';

function CatList() {
  const dispatch = useAppDispatch();
  const cats = useAppSelector(selectCats);
  const currentPage = useAppSelector(selectCurrentPage);
  const fetching = useAppSelector(selectFetching);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (cats.length === 0) {
      dispatch(getCats(currentPage));
    }
  }, [dispatch, cats.length, currentPage]);

  useEffect(() => {
    const scrollHandler = (e: any) => {
      if (
        e.target.documentElement.scrollHeight -
          (e.target.documentElement.scrollTop + window.innerHeight) <
          100 &&
        !fetching
      ) {
        dispatch(getCats(currentPage));
      }
    };

    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [dispatch, currentPage, fetching]);

  console.log('Cats:', cats); // Вывод данных котиков в консоль

  return (
    <Container>
      {cats.map((cat) => (
        <CatItem cat={cat} key={cat.id} />
      ))}
      {fetching && (
        <div style={{ textAlign: 'center', padding: '20px', width: '100%' }}>
          ... загружаем еще котиков ...
        </div>
      )}
    </Container>
  );
}

export default CatList;