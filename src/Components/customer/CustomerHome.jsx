import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import CustomerHead from "./head";
import axios from "axios";
const rest = require('../../EndPoints')
function CustomerHome(){
const [orderCount, setOrderCount] = useState(0);
let search = window.location.search;
const queryParams = new URLSearchParams(search);
const email = queryParams.get("email");
const status = "delivered";

let header = {
    headers: {
        "Content-type": "Application/json",
        "Authorization": `Bearer ${Cookies.get('token')}`   
    }
}



useEffect(() =>{
    axios.get(rest.endPointGetCustomerOrderCount+"?email="+email+"?status="+status,header)
    .then(response => {
        console.log(response.data);
        setOrderCount(response.data)
    })
    .catch(err => {
        console.log('Error fetching order count:', err);
    })

},[email,status]);
    return(
        <>
        <div>
        <CustomerHead/>

        {orderCount === 0 ? (
                    <div className="text-center mt-5 h2" style={{ lineHeight: "60px" }}>
                        Welcome Customer! Enjoy a 5% discount on your initial order at Discount Auto Parts.
                    </div>
                ) : (
                    <div className="text-center mt-5 h2" style={{ lineHeight: "60px" }}>
                        Welcome Customer!
                    </div>
                )}
        </div>
        </>
    )
}
export default CustomerHome;