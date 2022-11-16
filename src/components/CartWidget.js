
import React, { useContext } from "react";
import cartContext from "./CartContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarrot } from "@fortawesome/free-solid-svg-icons";

function CartWidget() {
  const { totalItemsInCart } = useContext(cartContext);
  return (
    <div className="cart-widget">
      <FontAwesomeIcon icon={faCarrot} size="2x" color="white" />
      <div className="qty-display">{totalItemsInCart()}</div>
    </div>
  );  
}

export default CartWidget;
