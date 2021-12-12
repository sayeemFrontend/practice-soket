import { useEffect, useState } from "react";
import "./product.css";
import ProductCart from "./cart/productCart";
import CustomModal from "./customModal";
import { useHistory } from "react-router";
import { productApi } from "../Api/Product/product"
import { scrollBottom } from "../InfinityScroll/infinityScroll";

const AllProduct = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState({ show: false, item: "" })
  const history = useHistory()
  const [check, setCheck] = useState(false)

  const path = window.localStorage.getItem("path")

  if (path && !modal.show && !check) {
    history.push(path);
  }

  useEffect(() => {
    const getAll = async () => {
      const data = await productApi.get()
      setAllProduct((prev) => [...prev, ...data])
      setLoading(false)
    }
    getAll()
  }, [page]);

  return (
    <div onScroll={(e) => scrollBottom(e) ? setPage(page + 1) : ""} className="allProduct">
      <div className="container">
        <div className="headerOne">All Products</div>
        <div className="row">
          <div className={modal.show ? "d-block" : "d-none"}>
            <CustomModal setModal={setModal} modal={modal} item={modal.item} setCheck={setCheck} />
          </div>
          {allProduct && allProduct.map((item) => (
            <div className="p-1 col-12 col-sm-6 col-md-3">
              <div onClick={() => setModal({ show: true, item: item })}> <ProductCart item={item} /></div>

            </div>
          ))}

          {loading && <div>Loadingg</div>}

        </div>
      </div>
    </div>
  );
};

export default AllProduct;
