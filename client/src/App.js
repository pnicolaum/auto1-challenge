import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CardProducts from './components/CardProducts';
import CardOrder from './components/CardOrder';

const images = {
  croissant: require('./assets/images/croissant.png'),
  bread: require('./assets/images/bread.png'),
  cupcake: require('./assets/images/cupcake.png'),
  pretzel: require('./assets/images/pretzel.png'),
  muffin: require('./assets/images/muffin.png'),
  pancake: require('./assets/images/pancake.png'),
  cake: require('./assets/images/cake.png'),
  waffle: require('./assets/images/waffle.png'),
  star: require('./assets/images/star.png')
};

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function App() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetch('/api/storage')
      .then(res => res.json())
      .then(data => {
        setProducts(data.storage);
        const initial = {};
        data.storage.forEach(p => (initial[p.name] = 0));
        setQuantities(initial);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch products.');
        setLoading(false);
      });
  }, []);

  const increment = (name, stock) => {
    setQuantities(prev => ({
      ...prev,
      [name]: Math.min(prev[name] + 1, stock),
    }));
  };

  const decrement = (name) => {
    setQuantities(prev => ({
      ...prev,
      [name]: Math.max(prev[name] - 1, 0),
    }));
  };

  const handleOrder = () => {
    const items = products
      .filter(p => quantities[p.name] > 0)
      .map(p => ({ name: p.name, quantity: quantities[p.name] }));

    if (items.length === 0) return;

    fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items })
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => {
        fetch('/api/storage')
          .then(res => res.json())
          .then(data => {
            setProducts(data.storage);
            setShowModal(true);
          });
      })
      .catch(() => {
        alert('Order failed. Try again.');
      });
  };

  const resetQuantities = () => {
    const reset = {};
    products.forEach(p => (reset[p.name] = 0));
    setQuantities(reset);
  };

  const total = products.reduce((sum, p) => {
    const qty = quantities[p.name] ?? 0;
    const price = Number(p.price) || 0;
    return sum + qty * price;
  }, 0);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-danger text-center mt-5">{error}</div>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bakery</h1>
      </header>
      <div className="container d-flex justify-content-center mt-5 mb-5">
        <CardProducts
          products={products}
          quantities={quantities}
          increment={increment}
          decrement={decrement}
          images={images}
          formatter={formatter}
          handleOrder={handleOrder}
        />

        <CardOrder
          products={products}
          quantities={quantities}
          total={total}
          formatter={formatter}
          showModal={showModal}
          setShowModal={setShowModal}
          showDetails={showDetails}
          setShowDetails={setShowDetails}
          images={images}
          resetQuantities={resetQuantities}
          />
        </div>
    </div>
  );
}


export default App;
