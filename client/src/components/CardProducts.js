import React from 'react';

const CardProducts = ({
  products,
  quantities,
  increment,
  decrement,
  images,
  formatter,
  handleOrder
}) => {

  const total = products.reduce((sum, p) => {
    return sum + (quantities[p.name] || 0) * p.price;
  }, 0);

  return (
    <div className="card py-4 shadow-lg rounded-4" style={{ width: '300px' }}>
      <h5 className="mb-4 fw-bold text-start px-3">My Order</h5>
      <div 
        style={{ 
          maxHeight: '400px',
          overflowY: 'auto',
          paddingRight: '8px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        className="hide-scrollbar px-3"
      >
        {products.map((product, index) => {
          const imageKey = product.name.toLowerCase();
          const isLast = index === products.length - 1;
          const isOutOfStock = product.stock === 0;

          return (
            <div 
              key={product.name} 
              className="d-flex align-items-center justify-content-between mb-3"
              style={{ 
                borderBottom: isLast ? 'none' : '1px solid #ddd', 
                paddingBottom: isLast ? 0 : '0.75rem',
                opacity: isOutOfStock ? 0.4 : 1,
                pointerEvents: isOutOfStock ? 'none' : 'auto',
                userSelect: isOutOfStock ? 'none' : 'auto',
              }}
            >
              <div className="d-flex align-items-center">
                <img
                  src={images[imageKey]}
                  alt={product.name}
                  style={{ width: '40px', marginRight: '12px' }}
                />
                <div className="d-flex flex-column align-items-start"> 
                  <span 
                    className={isOutOfStock ? 'text-muted' : ''} 
                    style={{ fontWeight: 600 }}
                  >
                    {product.name}
                  </span>
                  <span className="text-muted" style={{ fontSize: '0.85rem' }}>
                    {formatter.format(product.price)}
                  </span>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2">
                <div style={{ width: '24px', textAlign: 'center' }}>{quantities[product.name]}</div>
                <button
                  className={`btn btn-sm rounded-circle fs-4 ${
                    quantities[product.name] === 0 ? 'custom-btn-disabled' : 'custom-btn-enabled'
                  }`}
                  disabled={quantities[product.name] === 0}
                  onClick={() => decrement(product.name)}
                  style={{
                    width: '32px',
                    height: '32px',
                    padding: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'black',
                  }}
                >
                  -
                </button>
                <button
                  className={`btn btn-sm rounded-circle fs-4 ${
                    quantities[product.name] === product.stock || isOutOfStock ? 'custom-btn-disabled' : 'custom-btn-enabled'
                  }`}
                  disabled={quantities[product.name] === product.stock || isOutOfStock}
                  onClick={() => increment(product.name, product.stock)}
                  style={{
                    width: '32px',
                    height: '32px',
                    padding: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'black',
                  }}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-3 shadow-top-subtle pt-3">
        <div className="d-flex justify-content-between fw-bold">
          <span className="fs-7">Total</span>
          <span className="fs-5">{formatter.format(total)}</span>
        </div>
        <button
          className="btn btn-primary mt-1 w-100 fw-bold"
          onClick={handleOrder}
          disabled={total === 0}
          style={{ background: 'linear-gradient(to right, #419df5, #186bc1)', border: 'none' }}
        >
          Order
        </button>
      </div>
    </div>
  );
};

export default CardProducts;
