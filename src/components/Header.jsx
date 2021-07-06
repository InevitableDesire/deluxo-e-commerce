import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUser } from "../redux/user";
import '../assets/styles/components/Header.scss'

function Header() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(async ()=> {
    try {
      if(localStorage.getItem('token')){
        const token = localStorage.getItem('token')
        const res = await axios.get('/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const user = res.data
        dispatch(setUser({...user, token, isLoggedIn: true}))
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleLogOut = e => {
    localStorage.removeItem('token')
    dispatch(setUser({
      id: null,
      email: null,
      full_name: null,
      first_name: null,
      last_name: null,
      user_address: null,
      shipping_address: null,
      phone_number: null,
      token: null,
      isLoggedIn: false,
    }))
  }

  return (
    <header>
      <div className="links">
        {
          user.isLoggedIn
            ? <button onClick={handleLogOut}> Logout </button>
            : <>
                <Link to="/login"> Login </Link>
                <Link to="/register">Register</Link>
              </>
        }
        <Link to='/products'>Products</Link>
        <Link to='/cart'>Shopping Cart</Link>
      </div>
      {
        user.isLoggedIn
          ? <p>Welcome: {user.full_name}</p>
          : null
      }
    </header>
  );
}

export default Header;
