import "./datatable.scss";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../data/dataTableSource";
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

function Datatable() {
  const [data, setData] = useState([]);
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
      collection(db, "user"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "user", id));
      setData(data.filter((item) => item.id !== id));
    } catch (error) {}
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        // console.log("checkk id user:", params.row.id);
        const handleView = () => {
          navigate("/user/viewUser", { state: params.row.id });
        };
        return (
          <div className="cellAction">
            <div onClick={handleView} className="viewButton">
              View
            </div>
            <Link
              to={`/user/${params.row.id}`}
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
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link className="datatableAddLink" to="/user/new">
          Add New
        </Link>
      </div>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          className="datatableBox"
          rows={data}
          columns={userColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    </div>
  );
}

export default Datatable;
