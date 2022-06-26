

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'


import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import './App.css';


function App() {

  return (
    <BrowserRouter>
      <div>
        <header className="App-header">
          <Link to="/">Amazona</Link>
        </header>

        <main>
          <Routes>
            <Route path='/products/:slug' element={< ProductScreen />} />
            <Route path='/' element={<HomeScreen />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}


export default App;
