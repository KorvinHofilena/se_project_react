// ItemCard.jsx

import "./ItemCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import likeActive from "../../assets/like-active.png";
import likeInactive from "../../assets/like-inactive.svg";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item?.likes?.some((id) => id === currentUser?.id) || false;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = (evt) => {
    evt.preventDefault();
    if (onCardLike) {
      onCardLike({ id: item.id, isLiked });
    }
  };

  return (
    <li className="card-container">
      <h2 className="card__title"> {item.name} </h2>
      {currentUser && (
        <img
          src={isLiked ? likeActive : likeInactive}
          alt={isLiked ? "Unlike" : "Like"}
          className="card__like-btn"
          onClick={handleLike}
        />
      )}
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
