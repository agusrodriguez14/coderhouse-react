
import { useState, createContext } from "react";


const cartContext = createContext();

export function CartContextProvider(props) {
  const [cart, setCart] = useState([]);

  function addToCart(itemData) {
    let itemFound = cart.find((itemInCart) => itemInCart.id === itemData.id);

    if (itemFound) {
      let newCart = cart.map((itemInCart) => {
        if (itemInCart.id === itemData.id) {
          itemInCart.count += itemData.count;
          return itemInCart;
        } else {
          return itemInCart;
        }
      });

      setCart(newCart);
     
    } else {
      const newCart = [...cart];
      newCart.push(itemData);
      setCart(newCart);
     
    }
  }

  function totalItemsInCart() {
    let total = 0;
    cart.forEach((itemInCart) => {
      total = total + itemInCart.count 
    });
    
    return total;
    
  }

  function totalPriceInCart() {
    let total = 0;
    cart.forEach((itemInCart) => {
      total = (itemInCart.precio * itemInCart.count) + total;
    });
    return total;
  }

  function removeItem(itemId) {
    
    let itemFound = cart.find((itemInCart) => itemInCart.id === itemId);
    cart.splice(itemFound, 1);
    setCart([...cart]);}

  function clear() {
    cart.splice(0, cart.length);
    setCart([...cart]);
    
  }

  const value = {
    cart,
    addToCart,
    totalItemsInCart,
    removeItem,
    totalPriceInCart,
    clear
  };

  return (
    <cartContext.Provider value={value}>{props.children}</cartContext.Provider>
  );
}

export default cartContext;