import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Home from './pages/Home/index.jsx';
import Dashboard from './pages/dashboard';
import Main from './components/Main';
import LoginPage from './pages/login';
import SignUpPage from './pages/signup';
import PlayersPage from './pages/players';
import { StyledEngineProvider } from "@mui/material/styles";


let SiteConfig = createContext();


const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/dashboard",
      element: <Dashboard><Main /></Dashboard>,
    },
    {
      path: "/players",
      element: <Dashboard><PlayersPage /></Dashboard>,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignUpPage />,
    },
  ]);
function App() {
    const [user, setUser] = useState(null)
    
  return (
    
    <SiteConfig.Provider value={{user:user, setUser: setUser}}>
        <RouterProvider router={router} />
    </SiteConfig.Provider>
    
  )
}

export default App

export { SiteConfig }