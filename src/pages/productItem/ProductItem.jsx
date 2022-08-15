import "./productItem.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useParams ,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc ,updateDoc ,addDoc  } from "firebase/firestore";
import { db ,storage} from "../../firebase/firebase.Config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


 
function ProductItem() {
  const productId = useParams();
  const navigate = useNavigate()
const[data,setData] = useState({})
const[img,setImg] = useState('')
const[file,setFile] =useState('')
const[title,setTitle] = useState('')
const[category,setCategory] = useState('')
const[description,setDescription] = useState('')
const[price,setPrice] = useState('')
const[stock,setStock] = useState('')
const [per, setPerc] = useState(null);
       
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
  console.log('data img :' , data);
     const handleSubmit = async (e)=>{
        e.preventDefault()
        const newProduct = {
            title,
            category,
            description,
            price,
            stock,...data
          };
        try {
            if (productId.productId !== undefined && productId.productId !== "") {
                const docRef = doc(db, "product" , productId.productId);
                await updateDoc(docRef,newProduct );
            } else {
                const docRef = doc(db, "product" , productId.productId);
                await addDoc(docRef,newProduct );
            }
          } catch (err) {
            console.log(err);
          }
      
          setTitle("");
          setCategory("");
          setDescription("");
          setPrice("");
          setStock("");
          navigate(-1)

     }
    const handleEdit = async() => {
      const docRef = doc(db, "product" , productId.productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        try {
            setImg(docSnap.data().img)
            setTitle(docSnap.data().title);
            setCategory(docSnap.data().category);
            setDescription(docSnap.data().description);
            setPrice(docSnap.data().price);
            setStock(docSnap.data().stock);
          } catch (err) {
            console.log(err);;
          }
      } else {
        console.log("No such document!");
      }
    };
    useEffect(() => {
        console.log("The id here is : ", productId);
        if (productId !== undefined && productId !== "") {
            handleEdit()
        }
      }, [productId]);
  return (
    <div className="productItem">
      <Sidebar />
      <div className="productItemContainer">
        <Navbar />
        <div style={{ marginTop: 60 }}>
          <h1>Edit Product</h1>
          <form className="productItemMain" onSubmit={handleSubmit}>
            <div className="left">
            <img style={{width:200 , height:200 ,objectFit:'cover' , borderRadius:100}}
             src={
                file
                  ? URL.createObjectURL(file)
                  : img
              } alt="" /><br/>
            
            </div>
            <div className="right">
            <input
                    id="file"
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
            <label htmlFor="">title</label>
            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} />
            <label htmlFor="">category</label>
            <input type="text" value={category} onChange={(e)=>setCategory(e.target.value)} />
            <label htmlFor="">description</label>
            <textarea type="text" value={description} onChange={(e)=>setDescription(e.target.value)} />
            <label htmlFor="">price</label>
            <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)} />
            <label htmlFor="">stock</label>
            <input type="text" value={stock} onChange={(e)=>setStock(e.target.value)} />
            <button disabled={(per !== null && per < 100)} type="submit" >submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
