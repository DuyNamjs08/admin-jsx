import "./productTable.scss";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { userColumnProduct } from "../../data/dataTableSource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  collection,
  // getDocs,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/firebase.Config";
import { useNavigate } from "react-router-dom";
import LoadingMui from "../loading/LoadingMui";

function ProductTable(props) {
  const [data, setData] = useState([]);
  const [loading , setLoading]=useState(true)
  const navigate = useNavigate();
  useEffect(() => {
    // const list=[]
    // const fetchData = async () => {
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "user"));
    //     querySnapshot.forEach((doc) => {
    //       list.push({id:doc.id, ...doc.data()})
    //     });
    //     setData(list)
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // fetchData()

    // listen Realtime

    const unsub = onSnapshot(
      collection(db, "product"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
        setLoading(false)
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);
  console.log('data:',data);

  const handleDelete = async(id) => {
    try {
      await deleteDoc(doc(db, "product", id));
      setData(data.filter((item) => item.id !== id));
    } catch (error) {}
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        // console.log("checkk id product:", params.row.id);
        const handleView = () => {
          navigate("/product/viewProduct", { state: params.row.id });
        };
        return (
          <div className="cellAction">
            {/* <Link  to="/product/viewProduct"
             style={{ textDecoration: "none" }}> */}
            <div onClick={handleView} className="viewButton">
              View
            </div>
            {/* </Link> */}
            <Link
              to={`/product/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Edit</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
    {loading ?<LoadingMui /> : 
    <div className="dataProducttable">
      <div className="datatableTitle">
        Add New Product
        <Link className="datatableAddLink" to="/product/new">
          Add New
        </Link>
      </div>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          className="datatableBox"
          rows={data}
          columns={userColumnProduct.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    </div>
     }
    </>
  );
}

export default ProductTable;
