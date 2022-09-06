import "./new.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState, useEffect } from "react";
import { db, auth, storage } from "../../firebase/firebase.Config";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

function New({  title }) {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      console.log(name);
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value });
  };
  console.log("data user", data);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log(res);
      await setDoc(doc(db, "user", res.user.uid), {
        ...data,
        timestamp: serverTimestamp(),
      });
      navigate("/user");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div style={{ marginTop: 80 }}>
          <div className="top">
            <h1>{title}</h1>
          </div>
          <div className="bottom">
            <div className="left">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt=""
              />
            </div>
            <div className="right">
              <form onSubmit={handleAdd}>
                <div className="formInput">
                  <label htmlFor="file">
                    <CloudUploadIcon />
                  </label>
                  <input
                    id="file"
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
                {/* {inputs.map((item) => {
                return (
                  <div className="formInput" key={item.id}>
                    <label>{item.label}</label>
                    <input
                      id={item.id}
                      type={item.type}
                      placeholder={item.placeholder}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                );
              })} */}

                <div className="formInput" >
                  <label>Username</label>
                  <input
                    id="username"
                    type="text"
                    placeholder="John Joe"
                    onChange={(e) => handleInput(e)}
                  />
                </div>

                <div className="formInput" >
                  <label>Name and surname</label>
                  <input
                    id="displayname"
                    type="text"
                    placeholder="John Doe"
                    onChange={(e) => handleInput(e)}
                  />
                </div>

                <div className="formInput" >
                  <label>Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john_doe@gmail.com"
                    onChange={(e) => handleInput(e)}
                  />
                </div>

                <div className="formInput" >
                  <label>Phone</label>
                  <input
                    id="phone"
                    type="number"
                    placeholder="+1 234 567 89"
                    onChange={(e) => handleInput(e)}
                  />
                </div>

                <div className="formInput" >
                  <label>Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="enter password"
                    onChange={(e) => handleInput(e)}
                  />
                </div>

                <div className="formInput" >
                  <label>Address</label>
                  <input
                    id="address"
                    type="text"
                    placeholder="Elton St. 216 NewYork"
                    onChange={(e) => handleInput(e)}
                  />
                </div>

                <div className="formInput" >
                  <label>Country</label>
                  <input
                    id="country"
                    type="text"
                    placeholder="USA"
                    onChange={(e) => handleInput(e)}
                  />
                </div>

                <button type="submit" disabled={per !== null && per < 100}>
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default New;
