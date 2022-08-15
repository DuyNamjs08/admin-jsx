import './list.scss'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Datatable from '../../components/datatable/Datatable';

function List(props) {
    return (
        <div className='list'>
           <Sidebar />
           <div className="listContainer">
            <Navbar />
            <div style={{marginTop:50}}><Datatable /></div>
           </div>
        </div>
    );
}

export default List;