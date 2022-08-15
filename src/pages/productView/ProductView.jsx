import "./productView.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { useEffect, useCallback } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.Config";
import { useState  } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import { Link } from "react-router-dom";
import { useDispatch,useSelector  } from "react-redux";
import {AddCart ,DelCart} from '../../reduxStore/action'




function ProductView() {
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const cart = useSelector(state => state.CartReducer)
  const { state } = useLocation();

  const handleView = useCallback(async () => {
    const docRef = doc(db, "product", state);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      //   console.log("Document data:", docSnap.data());
      setData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  },[state])

  
  useEffect(() => {
    if (state !== undefined && state !== "") {
      handleView();
    }
  }, [handleView,state,dispatch]);
  // console.log("datata:", data);

  const HandleAdd =(product) =>{
    data && dispatch(AddCart(product))
  }
  const HandleDelete =(product) =>{
    console.log('HandleDelete')
    data && dispatch(DelCart(product))
  }
  
  return (
    <div className="productView">
      <Sidebar />
      <div className="productViewContainer">
        <Navbar />
        <div className="productViewMain" style={{ marginTop: 60 }}>
          <div className="viewMain">
            <div className="left">
              <img src={data.img} alt="" />
            </div>
            <div className="right">
              <h1>{data.title}</h1>
              <h4>18 reviews</h4>
              <h2>$50.00</h2>
              <p>{data.description}</p>
              <ul className="ul1">
                <li className="box1">
                  <span onClick={()=>HandleDelete(data)}>-</span>
                  <div>{cart.length}</div>
                  <span onClick={()=>HandleAdd(data)}>+</span>
                </li>
                <li  className="linkCart" onClick={()=>HandleAdd(data)}>
                    Add to cart
                </li>
                <li className="icon ">
                  <FavoriteBorderIcon />
                </li>
              </ul>
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
