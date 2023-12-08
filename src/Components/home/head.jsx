import React from "react";
import { Link } from "react-router-dom";
function Head(){
    return(
        <>
        <nav class="navbar navbar-expand-lg navbar-light p-3" style={{background:"#EAEEE9"}}>
            <div className="container-fluid">
            <div className="navbar-brand fw-bold fs-4 px-2"><span style={{fontSize:"40px", color:"#B3446C"}}>Discount Auto Parts</span></div>
                <div className="collapse navbar-collapse justify-content-center" id="navbarCenteredExample">
                <ul className="navbar-nav mb-2 mb-lg-0" style={{ marginRight: 'auto' }}>
                    <li class="nav-item" style={{ marginLeft: '80px' }}>
                    <Link class="nav-link " aria-current="page" to="/"><b style={{fontSize:"18px"}}>Home</b></Link>
                    </li>
                    <li class="nav-item" style={{ marginLeft: '80px' }}>
                    <Link class="nav-link " aria-current="page" to="/alogin"><b style={{fontSize:"18px"}}>Admin</b></Link>
                    </li>
                     <li class="nav-item" style={{ marginLeft: '80px' }}>
                    <Link class="nav-link " aria-current="page" to="/mlogin"><b style={{fontSize:"18px"}}>Vendor</b></Link>
                    </li>
                    <li className="nav-item" style={{ marginLeft: '80px' }}>
                    <Link className="nav-link " aria-current="page" to="/clogin"><b style={{fontSize:"18px"}}>Customer</b></Link>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
        </>
    )
}
export default Head;