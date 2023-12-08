import { Link } from "react-router-dom";
import React from "react";
function CustomerHead(){
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-light p-3" style={{background:"#EAEEE9"}}>
            <div className="container-fluid">
            <div className="navbar-brand fw-bold fs-4 px-2"><span style={{fontSize:"25px", color:"#B3446C"}}>Customer Portal</span></div>
                <div className="collapse navbar-collapse justify-content-center" id="navbarCenteredExample">
                <ul className="navbar-nav mb-2 mb-lg-0" style={{ marginRight: 'auto' }}>
                    <li className="nav-item" style={{ marginLeft: '80px' }}>
                    <Link className="nav-link " aria-current="page" to="/chome"><b style={{fontSize:"16px"}}>Customer Home</b></Link>
                    </li>
                    <li className="nav-item" style={{ marginLeft: '80px' }}>
                    <Link className="nav-link " aria-current="page" to="/viewProducts"><b style={{fontSize:"16px"}}>Products</b></Link>
                    </li>
                    <li className="nav-item" style={{ marginLeft: '80px' }}>
                    <Link className="nav-link " aria-current="page" to="/viewOrders?type=cart"><b style={{fontSize:"16px"}}>Cart</b></Link>
                    </li>
                    <li className="nav-item" style={{ marginLeft: '80px' }}>
                    <Link className="nav-link " aria-current="page" to="/viewOrders?type=ordered"><b style={{fontSize:"16px"}}>Orders</b></Link>
                    </li>
                    <li className="nav-item" style={{ marginLeft: '80px' }}>
                    <Link className="nav-link " aria-current="page" to="/viewOrders?type=history"><b style={{fontSize:"16px"}}>Orders History</b></Link>
                    </li>      
                </ul>
                <ul>
                    <li className="nav-item" style={{ marginLeft: 'auto' }}>
                    <Link className="nav-link " aria-current="page" to="/logout"><b style={{fontSize:"16px"}}>Logout</b></Link>
                    </li> 
                </ul>
                </div>
            </div>
        </nav>
        </>
    )
 }
                   
 export default CustomerHead;