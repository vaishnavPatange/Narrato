import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

function Protected({children, authentication=true}) {
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        if(authentication && userData.status !== authentication){
            navigate("/login")
        } else if(!authentication && userData.status !== authentication){
            navigate("/")
        }
        setLoader(false)
    },[userData, navigate, authentication])

  return loader ? <h1>Loading .....</h1> : <>{children}</>
}

export default Protected
