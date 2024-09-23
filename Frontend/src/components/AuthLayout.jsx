import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

function Protected({children, authentication=true}) {
    const status = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        if(authentication && status !== authentication){
            navigate("/login")
        } else if(!authentication && status !== authentication){
            navigate("/")
        }
        setLoader(false)
    },[status, navigate, authentication])

  return loader ? <h1>Loading .....</h1> : <>{children}</>
}

export default Protected
