//1. Importamos el hook de Ciclo de Vida
import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import "./item.css";

function Item({ product }) {
  //const [isFavorite, setIsFavorite] = useState(false);

  let urlDetail = `/detalle/${product.id}`;

  return (
    <div className="card">
      <div className="card-img">
        <img src={product.thumbnail} alt="Product img" />
      </div>
      <div className="card-detail">
        <h2>{product.nombre}</h2>
        <p>{product.categoria}</p>
        <h4 className="priceTag">$ {product.precio}</h4>
      </div>
      <Link to={urlDetail}>
        <Button>Ver más!</Button>
      </Link>
    </div>
  );
}

export default Item;
