import React, { useState, useContext } from "react";
import ItemCount from "./ItemCount";
import cartContext from "./CartContext";
import { Link } from "react-router-dom";
import "./itemdetail.css";

function ItemDetail({ product }) {
  const [isInCart, setIsInCart] = useState(false);

  const { addToCart } = useContext(cartContext);

  function onAddToCart(count) {
    /* Swal.fire({
      title: `Agregadas ${count} unidades al Carrito`,
      text: "¿Deseas ir al carrito?",
      icon: "success",
      confirmButtonText: "Ir al carrito",
    }).then((result) => {      
      if (result.isConfirmed) {
        navigate("/cart");
      }
    }); */

    const itemForCart = {
      ...product,
      count,
    };

    addToCart(itemForCart);
    setIsInCart(true);
  }

  return (
    <div className="card-detail2">
      <div className="card-detail_img">
        <img src={product.thumbnail} alt="Product img" />
      </div>
      <div className="card-detail_detail">
        <h2>{product.nombre}</h2>
        <p>{product.categoria}</p>
        <h4 className="priceTag">$ {product.precio}</h4>
      </div>
      {!isInCart ? (
        <ItemCount
          text="Agregar al carrito"
          onAddToCart={onAddToCart}
          stock={product.stock}
        />
      ) : (
        <div>
          <Link to="/cart">
            <button>Ir al Carrito</button>
          </Link>
          <button>Volver al catálogo</button>
          <button>Quitar del carrito</button>
        </div>
      )}
    </div>
  );
}

export default ItemDetail;