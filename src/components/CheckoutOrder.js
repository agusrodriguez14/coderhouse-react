import React, { useState, useEffect } from "react";
import { getOrderFromAPI } from "./firebase";
import { useParams } from "react-router-dom";
import OrderDetail from "./OrderDetail";


function CheckoutOrder() {
  const [order, setOrder] = useState([]);
  

  let orderid = useParams().orderid;

  useEffect(() => {
    getOrderFromAPI(orderid)
      .then((itemsDB) => {
        setOrder(itemsDB);
      })
      .catch((error) => {
        console.error(error);
      })
    
  }, [orderid]);



  return <OrderDetail order={order} />;
}

export default CheckoutOrder;