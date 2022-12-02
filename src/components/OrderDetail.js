import React from "react";


import "./itemdetail.css";

function OrderDetail({ order }) {
 
console.log(order);
  

  return (
   <div>
    
    
   <h2>Tu numero de Orden es {order.orderid}</h2> 
  
   
  
     
       
      
      </div>
      
   
  );
}

export default OrderDetail;