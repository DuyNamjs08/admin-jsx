import './listproduct.scss'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import ProductTable from '../../components/productTable/ProductTable';
function ListProduct(props) {
    return (
        <div className='listProduct'>
            <Sidebar />
            <div className="listProductContainer">
                <Navbar />
                <div style={{marginTop:50}}>
                <ProductTable />
                </div>
            </div>
            
        </div>
    );
}

export default ListProduct;