import "./useritem.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useParams ,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc ,updateDoc ,addDoc  } from "firebase/firestore";
import { db ,storage} from "../../firebase/firebase.Config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


 
function UserItem() {
  // const productId = useParams();
  const userId = useParams();
  console.log(userId);
  const navigate = useNavigate()
const[data,setData] = useState({})
const[img,setImg] = useState('')
const[file,setFile] =useState('')
const[username,setUsername] = useState('')
const[displayname,setDisplayname] = useState('')
const[email,setEmail] = useState('')
const[phone,setPhone] = useState('')
const[password,setPassword] = useState('')
const[address,setAddress] = useState('')
const[country,setCountry] = useState('')
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
        const newUser = {
          username,
          displayname,
          email,
          phone,
          password,
          address,
          country,
          ...data
          };
        try {
            if (userId.userId !== undefined && userId.userId !== "") {
                const docRef = doc(db, "user" , userId.userId);
                await updateDoc(docRef,newUser );
            } else {
                const docRef = doc(db, "user" , userId.userId);
                await addDoc(docRef,newUser );
            }
          } catch (err) {
            console.log(err);
          }
      
          setUsername("");
          setDisplayname("");
          setEmail("");
          setPhone("");
          setPassword("");
          setAddress("")
          setCountry("")
          navigate(-1)

     }
    const handleEdit = async() => {
      const docRef = doc(db, "user" , userId.userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        try {
            setImg(docSnap.data().img)
            setUsername(docSnap.data().username);
            setDisplayname(docSnap.data().displayname);
            setEmail(docSnap.data().email);
            setPhone(docSnap.data().phone);
            setPassword(docSnap.data().password);
            setAddress(docSnap.data().address);
            setCountry(docSnap.data().country);
          } catch (err) {
            console.log(err);;
          }
      } else {
        console.log("No such document!");
      }
    };
    useEffect(() => {
        console.log("The id here is : ", userId);
        if (userId !== undefined && userId !== "") {
            handleEdit()
        }
      }, [userId]);
  return (
    <div className="userItem">
      <Sidebar />
      <div className="userItemContainer">
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
            <label htmlFor="">username</label>
            <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} />
            <label htmlFor="">displayname</label>
            <input type="text" value={displayname} onChange={(e)=>setDisplayname(e.target.value)} />
            <label htmlFor="">email</label>
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <label htmlFor="">phone</label>
            <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} />
            <label htmlFor="">password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <label htmlFor="">address</label>
            <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} />
            <label htmlFor="">country</label>
            <input type="text" value={country} onChange={(e)=>setCountry(e.target.value)} />
            <button disabled={(per !== null && per < 100)} type="submit" >submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserItem;
