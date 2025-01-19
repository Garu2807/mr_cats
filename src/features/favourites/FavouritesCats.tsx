import CatItem from '../cats/CatItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Container } from '../cats/Cat.styles';

export default function FavoriteMovies() {
  const { favourites } = useSelector((store: RootState) => store.favourites);

  return (
    <Container>
      {favourites.length > 0 ? (
        favourites.map((cat) => <CatItem cat={cat} key={cat.id} />)
      ) : (
        <p>Тут пока пусто</p>
      )}
    </Container>
  );
}
