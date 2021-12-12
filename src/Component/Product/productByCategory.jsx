import { useEffect, useState } from "react";
import ProductCart from "./cart/productCart";
import { useHistory, useParams } from "react-router";
import { categoryApi } from "../Api/Category/category";
import { scrollBottom } from "../InfinityScroll/infinityScroll";
import CustomModal from "./customModal";

const ProductByCategory = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1)
  const categoryProduct = useParams();
  const [check, setCheck] = useState(false)
  const [modal, setModal] = useState({ show: false, item: "" })
  //for on Reloading effect
  const history = useHistory()
  const path = window.localStorage.getItem("path")
  if (path && !modal.show && !check) {
    history.push(path);
  }

  useEffect(() => {
    setProducts([])
  }, [categoryProduct.id])

  useEffect(() => {
    const getData = async () => {
      const data = await categoryApi.getProduct(categoryProduct.id, page)
      setProducts((prev) => [...prev, ...data])
    };
    getData();
  }, [categoryProduct.id, page]);

  if (!products) {
    return "Loadding";
  }

  return (
    <div onScroll={(e) => scrollBottom(e) ? setPage(page + 1) : ""} className="allProduct">
      <div className="container">
        <div className="headerOne">{categoryProduct.name}</div>
        <div className="row">
          <div className={modal.show ? "d-block" : "d-none"}>
            <CustomModal setModal={setModal} modal={modal} item={modal.item} setCheck={setCheck} />
          </div>
          {products.map((item) => (
            <div className="p-1 col-12 col-sm-6 col-md-3">
              <div onClick={() => setModal({ show: true, item: item })}> <ProductCart item={item} /></div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductByCategory;
