import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Suspense } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import ListProduct from "./pages/listProduct/ListProduct";
import New from "./pages/newuser/Newuser";
import NewProduct from "./pages/newProduct/NewProduct";
import Single from "./pages/single/Single";
import UserItem from "./pages/userItem/UserItem";
import Gggmap from './pages/ggmap/Gggmap';
import Profile from './pages/profile/Profile';
import ProductItem from './pages/productItem/ProductItem';
import ProductView from './pages/productView/ProductView';
import Category from './pages/category/Category';
import CheckOut from './pages/checkout/CheckOut';
import { userInputs, productInputs } from "./data/formSource"
import './darkmode/style.scss'

import { useSelector } from 'react-redux'



function App() {
  const { currentUser } = useSelector(state => state.reducer)

  const { darkMode } = useSelector(state => state.reducer)

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className={darkMode ? " App dark" : 'App'}>
      <Suspense fallback={null} >
        <Router>
          <Routes >
            <Route path='/'  >
              <Route path='login' element={<Login currentUser={currentUser} />} ></Route>
              <Route index element={<RequireAuth ><Home /></RequireAuth>} ></Route>
              <Route path='ggmap' element={<RequireAuth ><Gggmap /></RequireAuth>} ></Route>
              <Route path='profile' element={<RequireAuth ><Profile /></RequireAuth>} ></Route>
              <Route path='category' element={<RequireAuth ><Category /></RequireAuth>} ></Route>
              <Route path='checkout/:checkoutId' element={<RequireAuth ><CheckOut /></RequireAuth>} ></Route>
              <Route path='user'  >
                <Route index element={<RequireAuth ><List /></RequireAuth>} ></Route>
                <Route path=':userId' element={<RequireAuth ><UserItem /></RequireAuth>} ></Route>
                <Route path='viewUser' element={<RequireAuth ><Single /></RequireAuth>} ></Route>
                <Route path='new' element={<RequireAuth ><New inputs={userInputs} title="Add New User" /></RequireAuth>} ></Route>
              </Route>

              <Route path='product'  >
                <Route index element={<RequireAuth ><ListProduct /></RequireAuth>} ></Route>
                <Route path=':productId' element={<RequireAuth ><ProductItem /></RequireAuth>} ></Route>
                <Route path='viewProduct' element={<RequireAuth ><ProductView /></RequireAuth>} ></Route>
                <Route path='new' element={
                  <RequireAuth ><NewProduct inputs={productInputs} title="Add New Product" /></RequireAuth>} ></Route>
              </Route>
            </Route>
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
