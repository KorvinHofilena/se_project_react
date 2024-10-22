import { useContext } from "react";

import "./ClothesSection.css";

import ItemCard from "../ItemCard/ItemCard";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ClothesSection({ settingArray, handler, onClick, onCardLike }) {
  const currentUserId = useContext(CurrentUserContext)._id;
  const userItems = settingArray.filter((item) => item.owner === currentUserId);
  return (
    <section className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your items</p>
        <button
          className="clothes-section__add"
          type="button"
          onClick={onClick}
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__list">
        {userItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handler}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default ClothesSection;
