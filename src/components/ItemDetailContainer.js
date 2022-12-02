import React, { useState, useEffect } from "react";
import { getSingleItemFromAPI } from "./firebase";
import { useParams } from "react-router-dom";
import ItemDetail from "./ItemDetail";


function ItemDetailContainer() {
  const [product, setProduct] = useState([]);
  

  let id = useParams().id;

  useEffect(() => {
    getSingleItemFromAPI(id)
      .then((itemsDB) => {
        setProduct(itemsDB);
      })
      .catch((error) => {
        console.error(error);
      })
    
  }, [id]);


 

return (
  
      <ItemDetail product={product} />
  
  
);
}

export default ItemDetailContainer;






  