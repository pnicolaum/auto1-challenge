import React from 'react';

const CardOrder = ({
  products,
  quantities,
  total,
  formatter,
  showModal,
  setShowModal,
  showDetails,
  setShowDetails,
  images,
  resetQuantities
}) => {

  if (!showModal) return null;

  return (
    <div 
      className="modal d-block px-3" 
      tabIndex="-1" 
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card py-4 shadow-lg rounded-4" style={{ width: '300px' }}>
          <h5 className="mb-2 fw-bold text-start px-3">Order Received</h5>
          <div className="d-flex justify-content-center align-items-center">
            <img
              src={images.star}
              alt="star"
              style={{ width: '150px' }}
            />
          </div>
          <h4 className="fw-bold px-3">Thank you!</h4>
          <p className="mb-1 px-3">We have successfully received your order.</p>
          <div className="text-start px-3">
            <button 
              className="btn btn-link p-0 mb-3" 
              onClick={() => setShowDetails(!showDetails)}
              aria-expanded={showDetails}
              aria-controls="orderDetails"
              style={{ textDecoration: 'none', fontWeight: 500 }}
            >
              {showDetails ? 'Hide details' : 'Show details'}
            </button>
          </div>
          <div className={`collapse ${showDetails ? 'show' : ''}`} id="orderDetails">
            <div 
              style={{ 
                maxHeight: '200px',
                overflowY: 'auto',
                paddingRight: '8px',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
              className="hide-scrollbar px-3"
            >
              {products.filter(p => quantities[p.name] > 0).map(p => (
                <div key={p.name} className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center">
                    <img
                      src={images[p.name.toLowerCase()]}
                      alt={p.name}
                      style={{ width: '40px', marginRight: '12px' }}
                    />
                    <div className="d-flex flex-column align-items-start">
                      <span style={{ fontWeight: 600 }}>{p.name}</span>
                      <span className="text-muted" style={{ fontSize: '0.85rem' }}>
                        {formatter.format(p.price)} × {quantities[p.name]}
                      </span>
                    </div>
                  </div>
                  <span className="fw-semibold">
                    {formatter.format(p.price * quantities[p.name])}
                  </span>
                </div>
              ))}
            </div>
            <div className="px-3 shadow-top-subtle pt-3">
              <div className="d-flex justify-content-between fw-bold">
                <span className="fs-7">Total</span>
                <span className="fs-5">{formatter.format(total)}</span>
              </div>
            </div>
          </div>

          <div className="px-3">
            <button
              className="btn btn-primary w-100 fw-bold "
              onClick={() => {
                resetQuantities();
                setShowModal(false);
              }}
              style={{ background: 'linear-gradient(to right, #419df5, #186bc1)', border: 'none' }}
              >
              Submit Another Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardOrder;
