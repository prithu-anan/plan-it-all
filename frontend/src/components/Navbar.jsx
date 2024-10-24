import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { styles } from '../styles'
import { navLinks } from '../constants'
import { logo, menu, close, plan } from '../assets'

const Navbar = () => {
  const [active, setActive] = useState("")
  const [toggle, setToggle] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setActive("");
    navigate('/');
  };

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIsLoggedIn(true)
    }
  })

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("")
            window.scrollTo(0, 0)
          }}
        >
          <img src={plan} alt="logo" className="w-9 h-9 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex">Plan it All</p>
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((link) => (
            // If user is logged in and the link is "Login", render "Logout" instead
            isLoggedIn && link.title === "Login" ? (
              <li key="logout">
                <button
                  className="text-secondary hover:text-white text-[18px] font-medium cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            ) : (
              <li key={link.id}>
                <Link
                  to={`${link.id}`}
                  className={`${
                    active === link.title
                      ? "text-white"
                      : "text-secondary"
                  } hover:text-white text-[18px] font-medium cursor-pointer`}
                  onClick={() => setActive(link.title)}
                >
                  {link.title}
                </Link>
              </li>
            )
          ))}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />

          <div className={`${!toggle ? 'hidden' : 'flex'} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
            <ul className='list-none flex justify-end items-start flex-col gap-4'>
              {navLinks.map((link) => ( 
                isLoggedIn && link.title === "Login" ? null : (
                  <li key={link.id}>
                    <Link
                      to={`${link.id}`}
                      className={`${
                        active === link.title
                          ? "text-white"
                          : "text-secondary"
                      } hover:text-white text-[18px] font-medium cursor-pointer`}
                      onClick={() => {
                        setActive(link.title)
                        setToggle(false)
                      }}
                    >
                      {link.title}
                    </Link>
                  </li>
                )
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar