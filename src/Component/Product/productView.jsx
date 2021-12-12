import { useEffect, useState } from "react";
import { baseUrl } from "../Api/baseUrl";
import { categoryApi } from "../Api/Category/category";
import { productApi } from "../Api/Product/product";
import { getName } from "../utility/getName";

const ProductVeiw = (props) => {
    const [item, setItem] = useState()
    const [categories, setCategory] = useState()
    const [quantity, setQuantity] = useState(1)
    const id = props.match.params.id

    if (quantity === 0) {
        setQuantity(1)
    }

    useEffect(() => {
        const getData = async () => {
            const data = await categoryApi.get()
            setCategory(data);
        };
        getData();
    }, []);

    useEffect(() => {
        const getAll = async () => {
            const data = await productApi.getSingle(id)
            setItem(data)
        }
        getAll()
    }, [id]);


    window.localStorage.removeItem("path")

    if (item && categories) {
        return (
            <div className="innerContainer">

                {item && <div className="row">

                    <div className="col-6"><img src={`${baseUrl}${item.cover.medium}`} alt="" width="100%" /></div>
                    <div className="col-6 pt-2">
                        <p className="name">{item.name}</p>
                        <p className="my-2 price">Price: {item.price.regular}tk</p>
                        <div className="category">
                            Category: {item.category?.map(it => (
                            <span>{getName(it._id, categories)}</span>
                        ))}
                        </div>
                        <div className="groupItemsX customBorder">
                            <div className="plusMinus" onClick={() => setQuantity(quantity + 1)}><i class="fas fa-plus"></i></div>
                            <div className="quantity">{quantity}</div>
                            <div className="plusMinus" onClick={() => setQuantity(quantity - 1)}><i class="fas fa-minus"></i></div>
                        </div>
                        <div className="name">Total Price: <span style={{ fontSize: "22px" }} className="mx-2">{quantity * item.price.regular}</span>tk</div>

                        <div style={{ width: "250px" }} className="my-4 groupItemsX">

                            <button className="customBtn">Buy Now</button>

                            <button className="customBtn" style={{ background: "#842029" }}>Add Cart</button>
                        </div>

                    </div>

                </div>
                }
            </div>
        );
    }
    else {
        return "loading"
    }

}

export default ProductVeiw;