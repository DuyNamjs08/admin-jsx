import "./newproduct.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState, useEffect } from "react";
import { db, storage } from "../../firebase/firebase.Config";
import { serverTimestamp, collection, addDoc } from "firebase/firestore";

// import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

function NewProduct({ title }) {
  const [file, setFile] = useState([]);
  const [img, setImg] = useState([]);
  const [data, setData] = useState({});
  const [dataCheckbox, setDataCheckbox] = useState([]);
  const [per, setPerc] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      file.forEach((image) => {
        const name = new Date().getTime() + image.name;
        console.log(name);
        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, image);
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
              setImg((prev) => [...prev, { img: downloadURL }]);
            });
          }
        );
      });
    };
    file && uploadFile();
  }, [file]);
  // useEffect(() => {
  //   const handleCheck = async () => {
  //     const querySnapshot = await getDocs(collection(db, "product"));
  //     querySnapshot.forEach((doc) => {
  //       console.log(doc.data());
  //     });
  //   };
  //   handleCheck();
  // }, []);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value, img: [...img] });
  };
  console.log("data", data);
  console.log("datacheckbox", dataCheckbox);

  const handleImg = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];

      setFile((prevState) => [...prevState, newImage]);
    }
    // setFile(e.target.files[0])
  };
  // console.log(file);
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "product"), {
        ...data,
        size: dataCheckbox,
        timestamp: serverTimestamp(),
      });
      navigate("/product");
    } catch (error) {
      console.log(error);
    }
  };
  const handDelete = (id) => {
    // const fileCopy = _.clone(file)
    setFile(file.filter((item, index) => index !== id));
  };
  const handleCheckBox = (e) => {
    const checked = e.target.checked;
    const arr = new Set([
      ...dataCheckbox,
      { sizePd: e.target.value, id: e.target.id, checked: checked },
    ]);
    if (checked) {
      setDataCheckbox([...arr]);
    } else {
      setDataCheckbox([...arr].filter((item) => item.id !== e.target.id));
    }
  };
  return (
    <div className="newProduct">
      <Sidebar />
      <div className="newProductContainer">
        <Navbar />
        <div style={{ marginTop: 80 }}>
          <div className="top">
            <h1>{title}</h1>
          </div>
          <div className="bottom">
            <div className="left">
              <div className="left__img__create">
              {file.length > 0 ? (
                file.map((image, index) => {
                  return (
                    <>
                      <img
                        key={image.id}
                        src={image && URL.createObjectURL(image)}
                        alt=''
                      />
                      <button onClick={() => handDelete(index)}>delete</button>
                    </>
                  );
                })
              ) : (
                <img
                  src="https://png.pngtree.com/png-clipart/20190918/ourmid/pngtree-load-the-3273350-png-image_1733730.jpg"
                  alt="dsada"
                />
              )}
              </div>
              <div>Maximum file size 1 MB</div>
              <div>Format: .JPEG, .PNG</div>
            </div>
            <div className="right">
              <form onSubmit={handleAdd}>
                <div className="formInput">
                  <label htmlFor="file">
                    <CloudUploadIcon />
                  </label>
                  <input id="file" type="file" multiple onChange={handleImg} />
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
                <div className="formInput">
                  <label>Uid</label>
                  <input
                    id="uid"
                    type="number"
                    placeholder="uid product"
                    onChange={(e) => handleInput(e)}
                  />
                </div>

                <div className="formInput">
                  <label>Title</label>
                  <textarea
                    id="title"
                    type="text"
                    placeholder="Apple Macbook Pro"
                    onChange={(e) => handleInput(e)}
                    required
                  />
                </div>

                <div className="formInput">
                  <label>Description</label>
                  <textarea
                    id="description"
                    type="text"
                    placeholder="Description"
                    onChange={(e) => handleInput(e)}
                    required
                  />
                </div>

                <div className="formInput">
                  <label>Category</label>
                  <select
                    id="category"
                    type="text"
                    placeholder="category"
                    onChange={(e) => handleInput(e)}
                  >
                    <option value="choose">Choose</option>
                    <option value="Man Shoes">Man Shoes</option>
                    <option value="Woman Shoes">Woman Shoes</option>
                    <option value="Children Shoes">Children Shoes</option>
                    <option value="Sandal">Sandal</option>
                  </select>
                </div>

                <div className="formInput">
                  <label>Price</label>
                  <input
                    id="price"
                    type="number"
                    placeholder="100"
                    onChange={(e) => handleInput(e)}
                  />
                </div>

                <div className="formInput">
                  <label>Stock</label>
                  <input
                    id="stock"
                    type="number"
                    placeholder="in stock"
                    onChange={(e) => handleInput(e)}
                  />
                </div>
                <div className="formInput">
                  <label>Size</label>
                  <ul className="form__size">
                    <li>
                      <label>size 35</label>{" "}
                      <input
                        id="size1"
                        onChange={(e) => handleCheckBox(e)}
                        value={35}
                        type="checkbox"
                      />
                    </li>
                    <li>
                      <label>size 36</label>{" "}
                      <input
                        id="size2"
                        onChange={(e) => handleCheckBox(e)}
                        value={36}
                        type="checkbox"
                      />
                    </li>
                    <li>
                      <label>size 37</label>{" "}
                      <input
                        id="size3"
                        onChange={(e) => handleCheckBox(e)}
                        value={37}
                        type="checkbox"
                      />
                    </li>
                    <li>
                      <label>size 38</label>{" "}
                      <input
                        id="size4"
                        onChange={(e) => handleCheckBox(e)}
                        value={38}
                        type="checkbox"
                      />
                    </li>
                    <li>
                      <label>size 39</label>{" "}
                      <input
                        id="size5"
                        onChange={(e) => handleCheckBox(e)}
                        value={39}
                        type="checkbox"
                      />
                    </li>
                    <li>
                      <label>size 40</label>{" "}
                      <input
                        id="size6"
                        onChange={(e) => handleCheckBox(e)}
                        value={40}
                        type="checkbox"
                      />
                    </li>
                    <li>
                      <label>size 41</label>{" "}
                      <input
                        id="size7"
                        onChange={(e) => handleCheckBox(e)}
                        value={41}
                        type="checkbox"
                      />
                    </li>
                    <li>
                      <label>size 42</label>{" "}
                      <input
                        id="size8"
                        onChange={(e) => handleCheckBox(e)}
                        value={42}
                        type="checkbox"
                      />
                    </li>
                    <li>
                      <label>size 43</label>{" "}
                      <input
                        id="size9"
                        onChange={(e) => handleCheckBox(e)}
                        value={43}
                        type="checkbox"
                      />
                    </li>
                    <li>
                      <label>size 44</label>{" "}
                      <input
                        id="size10"
                        onChange={(e) => handleCheckBox(e)}
                        value={44}
                        type="checkbox"
                      />
                    </li>
                  </ul>
                </div>

                <div className="formInput">
                  <label>Status</label>
                  <select
                    id="status"
                    type="text"
                    placeholder="status"
                    onChange={(e) => handleInput(e)}
                  >
                    <option value="choose">Choose</option>
                    <option value="Pending">Pending</option>
                    <option value="Active">Active</option>
                    <option value="Inconfirm">Inconfirm</option>
                  </select>
                </div>

                <div className="btn__product__submit">
                  <button type="submit" disabled={per !== null && per < 100}>
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewProduct;
