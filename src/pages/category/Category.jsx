import "./category.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import _ from "lodash";
import {
  collection,
  // getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/firebase.Config";
import LoadingMui from "../../components/loading/LoadingMui";

function Category() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "product"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        const cloneList = _.clone(list);
        setFilter(cloneList);
        console.log(list);
        setData(list);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);
  console.log("filter : ", filter);

  const filterProduct = (category) => {
    const updateProduct = data.filter((item) => item.category === category);
    setFilter(updateProduct);
  };

  const ShowProduct = () => {
    return (
      <>
        <div>
          <div className="btn__category ">
            <button onClick={() => setFilter(data)}>All</button>
            <button onClick={() => filterProduct("Man Shoes")}>Man Shoe</button>
            <button onClick={() => filterProduct("Woman Shoes")}>
              Woman Shoe
            </button>
            <button onClick={() => filterProduct("Children Shoes")}>
              Children Shoe
            </button>
            <button onClick={() => filterProduct("Sandal")}>Sandal</button>
          </div>
          <div
            className="list__img__category"
            style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}
          >
            {filter.map((product) => {
              return (
                <div
                  key={product.id}
                  style={{ display: "flex", gap: 10, flexDirection: "column" }}
                >
                  <img src={filter.length > 0 ? product.img[0].img : 'https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/loader-icon.png'} alt="" />
                  <h4>Name: {product.title}</h4>
                  <div style={{ display: "flex", gap: 50 }}>
                    <p>Price: {product.price}</p>
                    <p>Stock: {product.stock}</p>
                  </div>
                  <div style={{ display: "flex", gap: 40 }}>
                    <p>Status: <span className={`${product.status === 'Active' ? 'green_st' : 'red_st'}`}>{product.status}</span></p>
                    <p>Category: {product.category}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="category">
      <Sidebar />
      <div className="categoryContainer">
        <Navbar />
        <div style={{ marginTop: 60 }}>
          <div style={{ padding: 20 }}>
            {loading ? <LoadingMui /> : <ShowProduct />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
