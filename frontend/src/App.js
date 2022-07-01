

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'


import HomeScreen from './pages/HomeScreen';
import ProductScreen from './pages/ProductDetails';
import './App.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Badge from 'react-bootstrap/Badge'
import Container from 'react-bootstrap/Container'
import { LinkContainer } from 'react-router-bootstrap'
import { useContext } from 'react';

import { store } from './store.js'
import CartPage from './pages/CartPage';



function App() {

  const { state } = useContext(store)
  const { cart } = state

  return (
    <BrowserRouter>
      <div className='d-flex flex-column site-container'>
        {/* <header className="App-header">
          <Link to="/">Amazona</Link>
        </header> */}
        <Navbar bg='dark' variant='dark'>
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Amazona</Navbar.Brand>
            </LinkContainer>
            <Nav className="me-auto">
              <Link to="/cart" className="nav-link">
                Cart
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </Badge>
                )}
              </Link>
            </Nav>
          </Container>
        </Navbar>

        <main>
          <Container>
            <Routes>
              <Route path='/products/:slug' element={< ProductScreen />} />
              <Route path='/' element={<HomeScreen />} />
              <Route path='/cart' element={<CartPage />} />
            </Routes>
          </Container>
        </main>
        <footer className='text-center'>All rights reserved</footer>
      </div>
    </BrowserRouter>
  );
}


export default App;
