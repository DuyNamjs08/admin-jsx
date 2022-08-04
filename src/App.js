import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import New from "./pages/newuser/New";
import Single from "./pages/single/Single";
import {userInputs , productInputs} from  "./data/formSource"
import './darkmode/style.scss'

import {useSelector  } from 'react-redux'



function App() {
   const {currentUser} = useSelector(state=> state.reducer)

  const {darkMode } = useSelector(state => state.reducer)
  
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className={darkMode ? " App dark" : 'App'}>
      <Router>
        <Routes >
          <Route path='/'  >
            <Route path='login' element={<Login currentUser={currentUser} />} ></Route>
            <Route index element={<RequireAuth ><Home /></RequireAuth>} ></Route>
            <Route path='user'  >
              <Route index element={<RequireAuth ><List /></RequireAuth>} ></Route>
              <Route path=':userId' element={<RequireAuth ><Single /></RequireAuth>} ></Route>
              <Route path='new' element={<RequireAuth ><New inputs={userInputs} title="Add New User"  /></RequireAuth>} ></Route>
            </Route>

            <Route path='product'  >
              <Route index element={<RequireAuth ><List /></RequireAuth>} ></Route>
              <Route path=':productId' element={<RequireAuth ><Single /></RequireAuth>} ></Route>
              <Route path='new' element={
            <RequireAuth ><New inputs={productInputs} title="Add New Product" /></RequireAuth>} ></Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
