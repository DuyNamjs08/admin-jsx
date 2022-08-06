import "./sidebar.scss";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StoreIcon from '@mui/icons-material/Store';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
// import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
// import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
// import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import {Link} from 'react-router-dom'
import {useDispatch  } from 'react-redux'
import {Dark , Light} from '../../reduxStore/action'
import {  signOut } from "firebase/auth";
import {auth} from '../../firebase/firebase.Config'
import { useNavigate} from 'react-router-dom'
import {LogOutauth} from '../../reduxStore/action'



function Sidebar(props) {
  const dispatch =useDispatch()
  const naviagte = useNavigate()
  const handleSignout = () => {
    signOut(auth).then(() => {
      naviagte('/login')
      dispatch(LogOutauth(null))
    console.log("remove");
    }).catch((error) => {
      console.log(error.message);
    });
  }

  return (
    <div className="sidebar">
      <div className="top">
        <Link to='/' style={{textDecoration:'none'}}>
        <span className="logo">Admin</span>
        </Link>
      </div>

      <div className="center">
        <ul>
        <p className="title">MAIN</p>
          <Link to='/' style={{textDecoration:'none'}}>
          <li>
            <DashboardIcon  className='icon'/>
            <span>Dashboard</span>
          </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to='/user' style={{textDecoration:'none'}}>
          <li> <AccountCircleIcon  className='icon'/>
            <span>Users</span>
          </li>
          </Link>
          <Link to='/product' style={{textDecoration:'none'}}>
          <li> <StoreIcon className='icon' />
            <span>Products</span>
          </li>
          </Link>
          
          <li> <Inventory2Icon  className='icon'/>
            <span>Orders</span>
          </li>
          <li> <LocalShippingIcon className='icon' />
            <span>Delivery</span>
          </li>
          <p className="title">USEFUL</p>
          <li> <InsertChartIcon  className='icon'/>
            <span>Status</span>
          </li>
          <li> <CircleNotificationsIcon  className='icon'/>
            <span>Notifications</span>
          </li>
          {/* <p className="title">SERVICE</p> */}
          {/* <li> <SettingsSystemDaydreamIcon className='icon' />
            <span>System heath</span>
          </li> */}
          {/* <li> <ChatBubbleOutlineIcon className='icon' />
            <span>Logs</span>
          </li>
          <li> <SettingsApplicationsIcon  className='icon'/>
            <span>Setting</span>
          </li> */}
          <p className="title">USER</p>
          <li> <PersonIcon className='icon' />
            <span>Profile</span>
          </li>
          <li onClick={handleSignout}> <LogoutIcon  className='icon'/>
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div onClick={()=>dispatch(Dark(false))} className="colorOption"></div>
        <div onClick={()=>dispatch(Light(true))} className="colorOption"></div>
      </div>
    </div>
  );
}

export default Sidebar;
