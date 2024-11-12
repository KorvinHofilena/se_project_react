// ItemCard.jsx

import "./ItemCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import likeActive from "../../assets/like-active.png";
import likeInactive from "../../assets/like-inactive.svg";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  // Determine if the item is liked by the current user
  const isLiked = item?.likes?.some(
    (id) => id === currentUser?._id || id === currentUser?.id
  );

  const handleCardClick = () => {
    // Use whichever identifier is available
    if (onCardClick && (item._id || item.id)) {
      onCardClick(item);
    }
  };

  const handleLike = (evt) => {
    evt.preventDefault();
    if (onCardLike && (item._id || item.id)) {
      onCardLike({ id: item._id || item.id, isLiked });
    }
  };

  return (
    <li className="card-container">
      <h2 className="card__title">{item.name}</h2>
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
