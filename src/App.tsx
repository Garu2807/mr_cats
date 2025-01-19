import { Global, Main } from './App.styles';
import CatList from './features/cats/CatList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './features/navbar/NavBar';
import FavouritesCats from './features/favourites/FavouritesCats';

function App() {
  return (
    <Router>
      <Global />
      <Main>
        <NavBar />
        <Routes>
          <Route path="/" element={<CatList />} />
          <Route path="/likes" element={<FavouritesCats />} />
        </Routes>
      </Main>
    </Router>
  );
}

export default App;
