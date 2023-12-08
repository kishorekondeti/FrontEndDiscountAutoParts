import { Link } from "react-router-dom";
import React from "react";

function AdminHead(){
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-light p-3" style={{background:"#EAEEE9"}}>
            <div className="container-fluid">
            <div className="navbar-brand fw-bold fs-4 px-2"><span style={{fontSize:"24px", color:"#B3446C"}}>Admin Portal</span></div>
                <div className="collapse navbar-collapse justify-content-center" id="navbarCenteredExample">
                <ul className="navbar-nav mb-2 mb-lg-0" style={{ marginRight: 'auto' }}>
                    <li className="nav-item" style={{ marginLeft: '80px' }}>
                    <Link className="nav-link " aria-current="page" to="/ahome"><b style={{fontSize:"16px"}}>Admin Home</b></Link>
                    </li>
                    <li className="nav-item" style={{ marginLeft: '80px' }}>
                    <Link className="nav-link " aria-current="page" to="/categories"><b style={{fontSize:"16px"}}>Parts</b></Link>
                    </li>
                    <li className="nav-item" style={{ marginLeft: '80px' }}>
                    <Link className="nav-link " aria-current="page" to="/subCategories"><b style={{fontSize:"16px"}}>Sub Parts</b></Link>
                    </li>
                    <li className="nav-item" style={{ marginLeft: '80px' }}>
                    <Link className="nav-link " aria-current="page" to="/merchants"><b style={{fontSize:"16px"}}>Vendors</b></Link>
                    </li>
                    <li className="nav-item" style={{ marginLeft: '80px' }}>
                    <Link className="nav-link " aria-current="page" to="/brands"><b style={{fontSize:"16px"}}>Brands</b></Link>
                    </li>
                </ul>
                <ul className="navbar-nav" style={{ marginLeft: 'auto' }}>
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/logout"><b style={{fontSize:"16px"}}>Logout</b></Link>
                    </li>

                </ul>
                </div>
            </div>
        </nav>
        </>
    )
}
export default AdminHead;