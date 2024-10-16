import "./ClothesSection.css";

import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ settingArray, handler, onClick }) {
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
        {settingArray.map((item) => {
          return <ItemCard key={item._id} item={item} onCardClick={handler} />;
        })}
      </ul>
    </section>
  );
}

export default ClothesSection;
