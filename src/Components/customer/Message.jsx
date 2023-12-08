import CustomerHead from "./head";
import React from "react";
function Message(){
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let msg = params.get('msg');
    return(
        <>
        <CustomerHead/>
        <div className="mt-5 h4 text-center" style={{lineHeight:"100px"}}>{msg}</div>
        </>
    )
}
export default Message