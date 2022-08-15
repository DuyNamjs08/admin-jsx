import "./checkout.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useSelector } from "react-redux";

function CheckOut() {
  const { cartItems ,count } = useSelector((state) => state.reducer);
  console.log("cartItems", cartItems , count);
  const onRemove =()=>{
    
  }
  const onAdd =()=>{

  }
  return (
    <div className="checkout">
      <Sidebar />
      <div className="checkoutContainer">
        <Navbar />
        <div style={{ marginTop: 60 }}>
          <div>
            {cartItems.length === 0 && <div>Cart is empty</div>}
            {cartItems.map((item) => (
              <div key={item.id} className="row">
                <div className="col-2">{item.title}</div>
                <div className="col-2">
                  <button onClick={() => onRemove(item)} className="remove">
                    -
                  </button>{" "}
                  <button onClick={() => onAdd(item)} className="add">
                    +
                  </button>
                </div>

                <div className="col-2 text-right">
                  {item.count} x ${item.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
