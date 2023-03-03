import './App.css';
import Header from './components/header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddNewProductPage from './pages/AddNewProductPage';
import { useEffect } from 'react';
import { LOCALSTORAGE_LIST_PRODUCT } from './utils';
import { LIST_PRODUCT_DATA } from './constants';
import EditProductPage from './pages/EditProductPage';

function App() {

  useEffect(() => {
    window.localStorage.setItem(LOCALSTORAGE_LIST_PRODUCT, JSON.stringify(LIST_PRODUCT_DATA));
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-new" element={<AddNewProductPage />} />
          <Route path='/product/:id/edit' element={<EditProductPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
