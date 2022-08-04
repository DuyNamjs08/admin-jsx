import './navbar.scss'
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import {useSelector,useDispatch  } from 'react-redux'
import {Toggle} from '../../reduxStore/action'

function Navbar(props) {
    const {darkMode } = useSelector(state => state.reducer)
    const dispatch =useDispatch()
    return (
    <div className='navbar'> 
        <div className="navbarContainer">
            <div className="search">
                <input type="text" placeholder='Rearch...' />
                < SearchIcon  className="search_icon"  />
            </div>
            <div className="items">
                <div className="item english"><LanguageIcon className='icon' /><span>English</span></div>
                <div className="item"><DarkModeIcon onClick={()=>dispatch(Toggle(!darkMode))} className='icon' /></div>
                <div className="item"><FullscreenExitIcon className='icon' /></div>
                <div className="item"><NotificationsNoneIcon className='icon' /><span className='counter'>1</span></div>
                <div className="item"><ChatBubbleOutlineIcon className='icon' /><span className='counter'>2</span></div>
                <div className="item"><FormatListBulletedIcon className='icon' /></div>
                <div className="item"><img src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" alt="" /></div>
            </div>
        </div>
    </div>
    );
}

export default Navbar;