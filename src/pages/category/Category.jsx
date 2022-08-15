import "./category.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import {
  collection,
  // getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/firebase.Config";

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
        const cloneList = _.clone(list)
        setFilter(cloneList)
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
    const updateProduct = data.filter(item => item.category === category )
    setFilter(updateProduct)

  };

  const Loading = () => {
    return <div>loading .....</div>;
  };
  const ShowProduct = () => {
    return (
      <>
        <div>
          <div>
            <button onClick={()=>setFilter(data)} >All</button>
            <button onClick={() => filterProduct("Men Clothes")}>
              Men Clothes
            </button>
            <button onClick={() => filterProduct("Women Clothes")}>
              Women Clothes
            </button>
            <button onClick={() => filterProduct("Mobile")}>Mobile</button>
            <button onClick={() => filterProduct("Men Shoes")}>
              Men Shoes
            </button>
            <button onClick={() => filterProduct("Women Shoes")}>
              Women Shoes
            </button>
            <button onClick={() => filterProduct("Books")}>Books</button>
            <button onClick={() => filterProduct("Heath")}>Heath</button>
            <button onClick={() => filterProduct("Electronics")}>
              Electronics
            </button>
            <button onClick={() => filterProduct("Accessories")}>
              Accessories
            </button>
            <button onClick={() => filterProduct("Sport")}>Sport</button>
            <button onClick={() => filterProduct("")}>Common</button>
          </div>
          <div style={{display:'grid' , gridTemplateColumns:'repeat(4,1fr)'}}>
          {filter.map((product) => {
            return (
              <div key={product.id} style={{ display: "flex", gap: 10 ,flexDirection:'column' }}>
                <img
                  style={{ width: 100, height: 100 }}
                  src={product.img}
                  alt=""
                />
                <h5>{product.title}</h5>
                <p>{product.price}</p>
                <p>{product.category}</p>
                <Link to={`/product/${product.id}`}>Buy Now</Link>
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
          <div>{loading ? <Loading /> : <ShowProduct />}</div>
        </div>
      </div>
    </div>
  );
}

export default Category;
