import React, { useContext } from 'react';
import './FoodCartSidebar.css';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const FoodCartSidebar = ({ isOpen, onClose }) => {
  const { cartItems, food_list, currency, url, removeFromCart, addToCart } = useContext(StoreContext);
  const navigate = useNavigate();

  // Get items that are in the cart
  const cartFoodItems = food_list.filter(item => cartItems[item._id] > 0);

  const handleContinueToCart = () => {
    onClose();
    navigate('/cart');
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`food-sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`food-sidebar ${isOpen ? 'open' : ''}`}>
        <div className='food-sidebar-header'>
          <h2>Your Selection</h2>
          <button className='food-sidebar-close' onClick={onClose}>✕</button>
        </div>

        <div className='food-sidebar-content'>
          {cartFoodItems.length === 0 ? (
            <div className='food-sidebar-empty'>
              <p>No items added yet</p>
              <span>Add items from the menu to get started</span>
            </div>
          ) : (
            <div className='food-sidebar-items'>
              {cartFoodItems.map((item) => (
                <div key={item._id} className='food-sidebar-item'>
                  <img 
                    src={`${url}/images/${item.image}`}
                    alt={item.name}
                    className='food-sidebar-item-image'
                  />
                  <div className='food-sidebar-item-info'>
                    <h3>{item.name}</h3>
                    <p className='food-sidebar-item-price'>{currency}{item.price}</p>
                  </div>
                  <div className='food-sidebar-item-counter'>
                    <button onClick={() => removeFromCart(item._id)}>−</button>
                    <span>{cartItems[item._id]}</span>
                    <button onClick={() => addToCart(item._id)}>+</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className='food-sidebar-footer'>
          <button 
            className='food-sidebar-cart-btn'
            onClick={handleContinueToCart}
            disabled={cartFoodItems.length === 0}
          >
            Continue to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default FoodCartSidebar;
