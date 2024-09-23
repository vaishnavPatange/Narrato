import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {AddPost, AllPost, EditPost, Home, Login, Post, Signup} from "./pages/index.js";
import {Protected} from "./components/index.js"
import store from "./store/store.js"

const router = createBrowserRouter([{
  path:"/",
  element:<App/>,
  children: [
    {path:"/", element:<Home />},
    {path: "/user/login", element:( <Protected authentication={false}><Login /></Protected>)},
    {path: "/user/new", element:( <Protected authentication={false}><Signup /></Protected>)},
    {path: "/post/all", element:( <Protected authentication={true}><AllPost /></Protected>)},
    {path: "/post/new", element:( <Protected authentication={true}><AddPost /></Protected>)},
    {path: "/post/edit/:_id", element:( <Protected authentication={true}><EditPost /></Protected>)},
    {path: "/post/:_id", element:( <Protected authentication={true}><Post /></Protected>)},
  ]
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
