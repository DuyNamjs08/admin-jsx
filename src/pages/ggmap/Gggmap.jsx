import './ggmap.scss'
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Map from '../../components/map/Map'

function Gggmap(props) {
    return (
        <div className='ggmap'>
            <Sidebar />
            <div className="ggmapContainer">
                <Navbar />
                <div style={{marginTop:50}}>
                <Map />
                </div>
            </div>
            
        </div>
    );
}

export default Gggmap;