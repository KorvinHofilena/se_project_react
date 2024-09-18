import React from "react";

function ItemCard({ item }) {
  return (
    <li className="item-card">
      <img src={item.link} alt={item.name} className="item-card__image" />
      <div className="item-card__name">{item.name}</div>
    </li>
  );
}

export default ItemCard;
