import React from "react";
import { Link } from "react-router-dom";

function MerchantHead(){
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-light p-3" style={{background:"#EAEEE9"}}>
            <div className="container-fluid">
            <div className="navbar-brand fw-bold fs-4 px-2"><span style={{fontSize:"24px", color:"#B3446C"}}>Vendor Portal</span></div>
                <div className="collapse navbar-collapse justify-content-center" id="navbarCenteredExample">
                <ul className="navbar-nav mb-2 mb-lg-0" style={{ marginRight: 'auto' }}>
                    <li className="nav-item" style={{ marginLeft: '30px' }}>
                    <Link className="nav-link " aria-current="page" to="/mhome"><b style={{fontSize:"16px"}}>Vendor Home</b></Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to="/discounts"><b style={{fontSize:"16px"}}>Discounts</b></Link>
                    </li>
                    <li className="nav-item" style={{ marginLeft: '30px' }}>
                    <Link className="nav-link " aria-current="page" to="/addProduct"><b style={{fontSize:"16px"}}>Add Product</b></Link>
                    </li>
                    <li className="nav-item" style={{ marginLeft: '30px' }}>
                    <Link className="nav-link " aria-current="page" to="/viewProducts"><b style={{fontSize:"16px"}}>View Products</b></Link>
                    </li>
                    <li className="nav-item" style={{ marginLeft: '30px' }}>
                    <Link className="nav-link " aria-current="page" to="/viewOrders?type=ordered"><b style={{fontSize:"16px"}}>Orders</b></Link>
                    </li>
                    <li className="nav-item" style={{ marginLeft: '30px' }}>
                    <Link className="nav-link " aria-current="page" to="/viewOrders?type=dispatched"><b style={{fontSize:"16px"}}>Dispatched Orders</b></Link>
                    </li>
                    <li className="nav-item" style={{ marginLeft: '30px' }}>
                    <Link className="nav-link " aria-current="page" to="/viewOrders?type=history"><b style={{fontSize:"16px"}}>Orders History</b></Link>
                    </li>
                </ul>
                <ul className="navbar-nav" style={{ marginLeft: 'auto' }}>
                    <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to="/logout"><b style={{fontSize:"16px"}}>Logout</b></Link>
                    </li>
                       
                </ul>
                </div>
            </div>
        </nav>
        </>
    )
}
export default MerchantHead;