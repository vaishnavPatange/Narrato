import React from 'react';
import { useSelector } from "react-redux";
import { Container } from "../index";
import { useNavigate, Link } from "react-router-dom";
import {LogoutBtn, Logo} from '../index';


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
      nav: 'login',
      add: '/user/login',
      active: !authStatus
    },
    {
      nav: 'signup',
      add: '/user/new',
      active: !authStatus
    },
    {
      nav: 'All Posts',
      add: '/post/all-posts',
      active: authStatus
    },
    {
      nav: 'Add Post',
      add: '/post/add-post',
      active: authStatus
    },
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {
              navItems.map((item) => (
                item.active ? (
                  <li key={item.nav}>
                    <button onClick={() => {
                      navigate(item.add)
                    }}
                    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                    >
                      {item.nav}
                    </button>
                  </li>
                ) :null
              ))
            }
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
