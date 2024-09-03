import React from 'react';
import {useSelector} from "react-redux";
import {Container} from "../index";
import {useNavigate, Link} from "react-router-dom";


function Header() {

  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      nav: 'Home',
      add: '/',
      active: true,
    },
    {
      nav:'login',
      add:'/login',
      active: !authStatus
    },
    {
      nav:'signup',
      add:'/signup',
      active: !authStatus
    },
    {
      nav:'All Posts',
      add:'/all-posts',
      active: authStatus
    },
    {
      nav:'Add Post',
      add:'/add-post',
      active: authStatus
    },
  ]

  return (
    <Container>
      
    </Container>
  )
}

export default Header
