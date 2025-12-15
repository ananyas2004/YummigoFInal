import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import FoodCartSidebar from '../FoodCartSidebar/FoodCartSidebar';

const FoodItem = ({ image, name, price, desc, id }) => {
    const [showSidebar, setShowSidebar] = useState(false);
    const { cartItems, addToCart, removeFromCart, url, currency } = useContext(StoreContext);

    // Check if cartItems and id are defined before accessing cartItems[id]
    const itemInCart = cartItems && cartItems[id];

    const handleAddClick = () => {
        addToCart(id);
        setShowSidebar(true);
    };

    return (
        <>
            <div className='food-item'>
                <div className='food-item-img-container'>
                    <img className='food-item-image' src={`${url}/images/${image}`} alt="" />
                    {!itemInCart
                        ? <img className='add' onClick={handleAddClick} src={assets.add_icon_white} alt="" />
                        : <div className="food-item-counter">
                            <img src={assets.remove_icon_red} onClick={() => removeFromCart(id)} alt="" />
                            <p>{cartItems[id]}</p>
                            <img src={assets.add_icon_green} onClick={() => addToCart(id)} alt="" />
                        </div>
                    }
                </div>
                <div className="food-item-info">
                    <div className="food-item-name-rating">
                        <p>{name}</p> <img src={assets.rating_starts} alt="" />
                    </div>
                    <p className="food-item-desc">{desc}</p>
                    <p className="food-item-price">{currency}{price}</p>
                </div>
            </div>
            <FoodCartSidebar 
                isOpen={showSidebar} 
                onClose={() => setShowSidebar(false)}
            />
        </>
    );
}

export default FoodItem;
