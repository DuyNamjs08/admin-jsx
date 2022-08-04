import "./login.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState , useEffect } from "react";
import LoginIcon from "@mui/icons-material/Login";
import {  signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../firebase/firebase.Config'
import {useNavigate} from 'react-router-dom'
import {useSelector , useDispatch} from 'react-redux'
import {Loginauth} from '../../reduxStore/action'


function Login() {
  const {currentUser} = useSelector(state=> state.reducer)
  const dispatch =useDispatch()
  console.log('check currentUser',currentUser);

  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  
  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch(Loginauth(user))
        navigate('/')

      })
      .catch((error) => {
        setError(true)
      });
  };
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);
  return (
    <div className="login">
      <Sidebar />
      <div className="loginContainer">
        <Navbar />
        <form className="formLogin" onSubmit={handleSubmit}>
          <div className="title">
            <h1>
              {" "}
              <LoginIcon className="icon" /> Login{" "}
            </h1>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button>Submit</button>
          {error && <span>Wrong email or password</span>}
        </form>
      </div>
    </div>
  );
}

export default Login;
