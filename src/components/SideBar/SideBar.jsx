import "./SideBar.css";

import avatar from "../../assets/avatar.png";

function SideBar() {
  return (
    <section className="side-bar">
      <div className="side-bar__user-info">
        <img className="side-bar__avatar" src={avatar} alt="Avatar" />
        <p className="side-bar__username">Terrence Tegegne</p>
      </div>
    </section>
  );
}

export default SideBar;
