

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'


import HomeScreen from './pages/HomeScreen';
import ProductScreen from './pages/ProductDetails';
import './App.css';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { LinkContainer } from 'react-router-bootstrap'



function App() {

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
          </Container>
        </Navbar>

        <main>
          <Container>
            <Routes>
              <Route path='/products/:slug' element={< ProductScreen />} />
              <Route path='/' element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer className='text-center'>All rights reserved</footer>
      </div>
    </BrowserRouter>
  );
}


export default App;
