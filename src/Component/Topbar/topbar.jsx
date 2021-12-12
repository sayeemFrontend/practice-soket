import { useHistory } from "react-router";
import "./topbar.css";
import { useState } from "react";
const Topbar = ({ right, left }) => {
  const history = useHistory();
  const [popover, setPopover] = useState(false);
  const handleClick = () => {
    localStorage.removeItem("user");
    history.push("/");
    window.location.reload();
  };
  return (
    <div
      style={{ height: "90px", paddingTop: "30px" }}
      className="d-flex justify-content-between align-items-center"
    >
      <div
        style={{ cursor: "pointer" }}
        onClick={() => history.goBack()}
        className="leftContent"
      >
        {left.icon} <span className=" ms-2 headerLarge">{left.name}</span>
      </div>
      <div className="rightContent list-unstyled">
        <div className="headerLarge">
          <li>{right.name}</li>
          <li className=" headerSmall">{right.donation.level}</li>
        </div>
        <div
          onClick={() => history.push("/profile/")}
          style={{ width: "45px", cursor: "pointer" }}
        >
          <img
            className="rounded-circle"
            src={right.image2}
            alt=""
            width="100%"
          />
        </div>
        <div onMouseOver={() => setPopover(!popover)} className="topbarDot">
          <i class="fas fa-circle  "></i>
          <i class="fas fa-circle  "></i>
          <i class="fas fa-circle "></i>
        </div>
        <div
          onMouseLeave={() => setPopover(!popover)}
          className={popover ? "popUp list-unstyled" : "d-none"}
        >
          <li onClick={handleClick} style={{ cursor: "pointer" }}>
            Logout
          </li>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
