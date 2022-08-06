import "./login.scss";
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

  const [errorPassword, setErrorPassword] = useState(false);
  const [errorinValid, setErrorinValid] = useState(false);
  const [errEmty, setErrEmty] = useState(false);
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
        console.log(error.message)
        if(error.message ==='Firebase: Error (auth/user-not-found).' ){
          setErrorinValid(true)
          console.log('aaaaa');
        }
        if(error.message ==='Firebase: Error (auth/invalid-email).' ){
          setErrorPassword(true)
          console.log('aaaaa');
        }
        if(error.message ==='Firebase: Error (auth/invalid-email).' ){
          setErrEmty(true)
          console.log('aaaaa');
        }
        // error.message === 'Error (auth/invalid-email).' && setError(true)
        setError(true)
        
      });
  };
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);
  return (
    <div className="login">
      <div className="loginContainer">
        <h1 style={{textAlign:'center', marginTop:20 , color:"#e3543e" , fontSize:40}}>Wellcome to Web Admin</h1>
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
          {errEmty && <span>You need fill email</span>}
          <br/>
          {errorinValid && <span>Email is invalid</span>}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          {errorPassword && <span>Wrong email or password</span>} 
          <br/>
          {errEmty && <span>You need fill password</span>}
          </div>
          <button>Submit</button>
          {error && <span>Wrong email or password</span>}
        </form>
      </div>
    </div>
  );
}

export default Login;
