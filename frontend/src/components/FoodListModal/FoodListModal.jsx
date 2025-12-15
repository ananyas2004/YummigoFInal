import React, { useContext } from 'react';
import './FoodListModal.css';
import { StoreContext } from '../../Context/StoreContext';

const FoodListModal = ({ isOpen, onClose, onSelectFood }) => {
  const { food_list, currency, url } = useContext(StoreContext);

  if (!isOpen) return null;

  return (
    <div className='food-modal-overlay' onClick={onClose}>
      <div className='food-modal-content' onClick={(e) => e.stopPropagation()}>
        <div className='food-modal-header'>
          <h2>Select a Food Item</h2>
          <button className='food-modal-close' onClick={onClose}>✕</button>
        </div>
        
        <div className='food-modal-list'>
          {food_list.map((item) => (
            <div
              key={item._id}
              className='food-modal-item'
              onClick={() => {
                onSelectFood(item._id);
              }}
            >
              <img 
                src={`${url}/images/${item.image}`} 
                alt={item.name}
                className='food-modal-item-image'
              />
              <div className='food-modal-item-info'>
                <h3>{item.name}</h3>
                <p className='food-modal-item-desc'>{item.description}</p>
                <span className='food-modal-item-price'>{currency}{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodListModal;

