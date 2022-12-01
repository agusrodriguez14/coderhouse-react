
import { useState, createContext } from "react";
//1- Inicializamos el context con CreateContext

const cartContext = createContext();

// 2. Definimos nuestro Provider
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
    /* else {
      setCart((newCart) => {
        newCart.push(itemData);
        return newCart;
      });
    } */
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

  //3.Creamos el "value" para los componentes que consuman el context

  return (
    //4. retornamos el Context Provider con el value creado
    <cartContext.Provider value={value}>{props.children}</cartContext.Provider>
  );
}

export default cartContext;