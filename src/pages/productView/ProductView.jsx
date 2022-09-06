import "./productView.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { useEffect, useCallback } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.Config";
import { useState } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

function ProductView() {
  const [data, setData] = useState({});
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  const { state } = useLocation();
  console.log("state product:", state);

  const handleView = useCallback(async () => {
    const docRef = doc(db, "product", state);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      setData(docSnap.data());
      setloading(false);
    } else {
      console.log("No such document!");
    }
  }, [state]);
  console.log("check data:", data.size);

  useEffect(() => {
    if (state !== undefined && state !== "") {
      handleView();
    }
  }, [handleView, state, dispatch]);


  const ShowImg = () => {
    return (
      <div>
        {data.img.map((item) => {
          return <img key={item.img} src={item.img} alt='item' />;
        })}
      </div>
    );
  };
  const ShowSize = () => {
    return (
      <div className="show__size">
        {data.size.map((item) => {
          return <div className="show__size__item"  key={item.id}>{item.sizePd}</div>
        })}
      </div>
    );
  };
  return (
    <div className="productView">
      <Sidebar />
      <div className="productViewContainer">
        <Navbar />
        <div className="productViewMain" style={{ marginTop: 60 }}>
          <div className="viewMain">
            <div className="left">
              {/* <img src={data && data.img[0].img} alt="" /> */}
              {loading ? <div>loading .....</div> : <ShowImg />}
            </div>
            <div className="right">
              <h1>{data.title}</h1>
              <h4>18 reviews</h4>
              <h2>$50.00</h2>
              <p>{data.description}</p>
              <FavoriteBorderIcon />

              <ul className="ul2">
                <li>
                  <div>Category</div>
                  <span>{data.category}</span>
                </li>
                <li>
                  <div>Price</div>
                  <span>{data.price}</span>
                </li>
                <li>
                  <div>In Stock</div>
                  <span>{data.stock}</span>
                </li>
                <li>
                  <div>Status</div>
                  <span className="status__state">{data.status}</span>
                </li>
                <li>
                  <div>Size</div>
                  <span> {loading ? <div>loading .....</div> : <ShowSize />}</span>
                </li>
                <li>
                  <div>Share on</div>
                  <ul className="shareIcon">
                    <li>
                      <FacebookIcon />
                    </li>
                    <li>
                      <TwitterIcon />
                    </li>
                    <li>
                      <InstagramIcon />
                    </li>
                    <li>
                      <PinterestIcon />
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductView;
