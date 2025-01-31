import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/Constants";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
function ClothesSection({
  onCardClick,
  handleAddClick,
  items,
  clothingItems,
  handleCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  const useritems = items.filter((item) => item.owner === currentUser?._id);
  const reverseItems = [...useritems].reverse();
  return (
    <div className="clothes__section">
      <div className="clothes__section-header">
        <p className="clothes__section_p"> Your items</p>
        <button className="clothes__section_button" onClick={handleAddClick}>
          + Add items
        </button>
      </div>
      <ul className="cards__list">
        {reverseItems.map((items) => (
          <ItemCard
            key={items._id}
            item={items}
            onCardClick={onCardClick}
            handleCardLike={handleCardLike}
          />
        ))}
      </ul>
    </div>
  );
}
export default ClothesSection;
