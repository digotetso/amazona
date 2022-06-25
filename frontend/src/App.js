import './App.css';
import data from './data'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a href="/home">Amazona</a>
      </header>

      <main>
        <h1 className="heading">Featured products</h1>
        <div className="products">
          {data.products.map(product => (
            <div key={product.slug}>
              <div className="product">
                <img src={product.image} alt={product.name} />
                <div className="product-info">
                  <a href={`products/${product.slug}`}>
                    <p>{product.name}</p>
                  </a>
                  <p> <strong>${product.price}</strong></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}


export default App;
