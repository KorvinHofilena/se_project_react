import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ItemCard.css";
import likeIcon from "../../assets/❤.png";
import activeLikeIcon from "../../assets/ActiveLikeButton.png";

function ItemCard({ item, onCardClick, handleCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes?.some((id) => id === currentUser?._id);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = (e) => {
    e.stopPropagation(); // prevent triggering card click
    handleCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      {currentUser?._id && (
        <button
          className="item__heart"
          type="button"
          onClick={handleLike}
          style={{
            backgroundImage: `url(${isLiked ? activeLikeIcon : likeIcon})`,
          }}
        />
      )}
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl || item.link}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
