import React, { useState, useEffect } from 'react';
import { Cat } from './types/Cat';
import {
  ButtonStyled,
  IMG,
  Item,
  StyledFavoriteBorderIcon,
  StyledFavoriteIcon,
  IconWrapper,
} from './Cat.styles';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  addToFavorites,
  removeFromFavorites,
} from '../favourites/FavouritesSlice';

type CatPropsType = {
  cat: Cat;
};

function CatItem({ cat }: CatPropsType) {
  const dispatch = useAppDispatch();
  const favourites = useAppSelector((state) => state.favourites.favourites);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setClicked(favourites.some((favouriteCat) => favouriteCat.id === cat.id));
  }, [favourites, cat.id]);

  const handleToggleFavorite = (cat: Cat): void => {
    if (clicked) {
      dispatch(removeFromFavorites(cat));
    } else {
      dispatch(addToFavorites(cat));
    }
    setClicked(!clicked);
  };

  return (
    <Item>
      <IMG src={cat.url} alt="котик" />
      <ButtonStyled onClick={() => handleToggleFavorite(cat)}>
        <IconWrapper>
          <StyledFavoriteBorderIcon clicked={clicked} />
          <StyledFavoriteIcon clicked={clicked} />
        </IconWrapper>
      </ButtonStyled>
    </Item>
  );
}

export default CatItem;
