import "./productCart.css";
import { baseUrl } from "./../../Api/baseUrl";

const ProductCart = ({ item }) => {

  return (
    <div className="cartContainer">
      <div
        style={{ cursor: "pointer" }}
        className="container"
      >
        <img src={`${baseUrl}${item.cover.medium}`} alt="" />

        <div className="itemName">
          <p>{item.name}</p>
        </div>
        <ul className="groupItemsX">
          <li className="tkOne">
            ${item.price.offer ? item.price.offer : item.price.regular}
          </li>
          <li className="tkTwo">
            ${item.price.offer ? item.price.regular : ""}
          </li>
          <li>
            <button className="customButton">Add Cart</button>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default ProductCart;
