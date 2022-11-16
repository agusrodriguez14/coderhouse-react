import React from "react";
import FlexWrapper from "./FlexWrapper";
import Item from "./Item";

function ItemList(props) {
  return (
    <FlexWrapper>
      {props.productsList.map((product) => (
        <Item key={product.id} product={product} />
      ))}
    </FlexWrapper>
  );
}

export default ItemList;
