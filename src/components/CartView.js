import React, { useContext } from "react";
import { createBuyOrderFirestoreWithStock } from "./firebase";
import cartContext from "./CartContext";
import Button from "./Button";
import "./itemdetail.css";
import "./form.css";
import { useNavigate } from "react-router-dom";
import BuyForm from "./BuyForm";

function CartView() {
  const { cart, clear, removeItem, totalPriceInCart } = useContext(cartContext);
  const navigate = useNavigate();

  if (cart.length === 0) return <h1>Carrito Vacio</h1>;

  function createBuyOrder(userData) {
    const buyData = {
      buyer: userData,
      items: cart,
      total: totalPriceInCart(),
      date: new Date(),
    };

    createBuyOrderFirestoreWithStock(buyData).then((orderId) => {
      clear();
      navigate(`/checkout/${orderId}`);
      
    });
  }


  
  return (
    <div>
      <h1>Este es el contenido de tu carrito</h1>
      {cart.map((cartItem) => (
      
        <div key={cartItem.id}>
          <img className="card-detail_img2" src={cartItem.thumbnail} alt={cartItem.nombre} />
          <h3>{cartItem.nombre}</h3>
          <h4>$ {cartItem.precio}</h4>
          <h4>Cantidad: {cartItem.count}</h4>
          <h4>Precio a pagar: {cartItem.count * cartItem.precio}</h4>
          
           
          
          <Button onClick={() => removeItem(cartItem.id)} type="danger">
            X
          </Button>
       
        </div>
      ))}
     <Button type="danger" onClick={clear}>
        Vaciar Carrito
      </Button>
     
      <h2>Total a pagar: ${totalPriceInCart()}</h2>
      <BuyForm className="form" onSubmit={createBuyOrder} />
    </div>
  );
}

export default CartView;

