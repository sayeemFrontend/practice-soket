import { useHistory } from "react-router-dom";
import "./sidebar.css";
import { useEffect, useState } from "react"
import { categoryApi } from "../Api/Category/category";

const Sidebar = () => {
  const [category, setCategory] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      const data = await categoryApi.get()
      setCategory(data);
    };
    getData();
  }, []);

  const [active, setActive] = useState("");

  const handleActiveCategory = (index, item) => {
    if (index === "all") {
      setActive("all");
      history.push("/");
    } else {
      setActive(index);
      history.push(`/product/by/category/${item._id}/${item.name}`);
    }
  };

  if (active === "all") {
    history.push("/");
  }

  if (category) {
    return (
      <div className="container-fluid">
        <div className="logo mt-3 mb-3 text-center">
          <img src="/Image/logo/logo.png" width="40%" alt="" />
        </div>
        <div className="conatiner">
          <div
            className="sidebarItem"
            onClick={() => handleActiveCategory("all")}
          >
            <div className={active === "all" ? " row activeStyle" : " row"}>
              <p>All</p>
            </div>
          </div>
          {category.map((item) => (
            <div
              className="sidebarItem"
              onClick={() => handleActiveCategory(category.indexOf(item), item)}
            >
              <div
                className={
                  category.indexOf(item) === active
                    ? " row activeStyle"
                    : " row"
                }
              >
                <p>{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return "looding";
  }
};

export default Sidebar;
