import "./productItem.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, addDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/firebase.Config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function ProductItem() {
  const productId = useParams();
  // console.log('productId',productId);
  const navigate = useNavigate();
  const [img, setImg] = useState("");
  const [file, setFile] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("");
  const [dataCheckbox, setDataCheckbox] = useState([]);
  const [per, setPerc] = useState(null);

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
              // console.log("File available at", downloadURL);
              setImg((prev) => [...prev, { img: downloadURL }]);
            });
          }
        );
      });
    };
    file && uploadFile();
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      title,
      category,
      description,
      price,
      stock,
      status,
      size: dataCheckbox,
      img: [...img],
    };
    console.log("newProduct::", newProduct);
    try {
      if (productId.productId !== undefined && productId.productId !== "") {
        const docRef = doc(db, "product", productId.productId);
        await updateDoc(docRef, newProduct);
      } else {
        const docRef = doc(db, "product", productId.productId);
        await addDoc(docRef, newProduct);
      }
    } catch (err) {
      console.log(err);
    }

    setTitle("");
    setCategory("");
    setDescription("");
    setPrice("");
    setStock("");
    navigate(-1);
  };
  const handleEdit = async () => {
    const docRef = doc(db, "product", productId.productId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      try {
        setImg(docSnap.data().img);
        setTitle(docSnap.data().title);
        setCategory(docSnap.data().category);
        setDescription(docSnap.data().description);
        setPrice(docSnap.data().price);
        setStock(docSnap.data().stock);
        setStatus(docSnap.data().status);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("No such document!");
    }
  };
  // console.log("img::::", img);
  // console.log('file::',file);
  useEffect(() => {
    console.log("The id here is : ", productId);
    if (productId !== undefined && productId !== "") {
      handleEdit();
    }
  }, [productId]);
  const hadleDelete = (id) => {
    setImg(img.filter((item, index) => index !== id));
  };
  const handleImg = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      setFile((prevState) => [...prevState, newImage]);
    }
    // setFile(e.target.files[0])
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
    <div className="productItem">
      <Sidebar />
      <div className="productItemContainer">
        <Navbar />
        <div style={{ marginTop: 60 }}>
          <h1>Edit Product {productId ? productId.productId : ""}</h1>
          <form className="productItemMain" onSubmit={handleSubmit}>
            <div className="left">
              {/* <img style={{width:200 , height:200 ,objectFit:'cover' , borderRadius:100}}
             src={
                file
                  ? URL.createObjectURL(file)
                  : img
              } alt="" /><br/> */}
              {img.length > 0 ? (
                <div>
                  {img.map((item, index) => {
                    return (
                      <div key={item.img} className="list__img__updating">
                        <img
                          src={item.img}
                          style={{ width: "200px", height: "200px" }}
                        />
                        <button onClick={() => hadleDelete(index)}>
                          Delete
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>Loading ........</div>
              )}
            </div>
            <div className="right">
              <input id="file" type="file" multiple onChange={handleImg} />
              <div className="update__form ">
                <div>
                  <label htmlFor="">Title</label>
                  <input
                    className="input__update"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="">Category</label>
                  <input
                    className="input__update"
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <select
                    placeholder="category"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="choose">Choose</option>
                    <option value="Man Shoes">Man Shoes</option>
                    <option value="Woman Shoes">Woman Shoes</option>
                    <option value="Children Shoes">Children Shoes</option>
                    <option value="Sandal">Sandal</option>
                  </select>
                </div>
              </div>

              <label htmlFor="">Description</label>
              <textarea
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="update__form">
                <div>
                  <label htmlFor="">Price</label>
                  <input
                    className="input__update"
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="">Stock</label>
                  <input
                    className="input__update"
                    type="text"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
              </div>

              <div className="update__form">
                <div>
                  <label htmlFor="">Status</label>
                  <input
                    className="input__update"
                    type="text"
                    value={status}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <select
                    placeholder="status"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="choose">Choose</option>
                    <option value="Pending">Pending</option>
                    <option value="Active">Active</option>
                    <option value="Inconfirm">Inconfirm</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="">Size</label>
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
              </div>

              <button disabled={per !== null && per < 100} type="submit">
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
