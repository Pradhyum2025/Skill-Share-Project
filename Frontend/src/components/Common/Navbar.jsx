import React, { useState, useEffect, useRef } from 'react';
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import Logo from './Logo';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../operations/auth';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currUser = useSelector(store => store.auth);
  const userBag = useSelector(store => store.bag);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const currLocation = useLocation().pathname;

  //SignOut function calling 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(dispatch, navigate);
  }

  return (
    <nav className="bg-white sticky top-0 z-10 border-b">
      <div className="w-full flex flex-wrap items-center justify-around px-2 md:px-5 py-1">

        {/* -------------- Brand logo ------------------- */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Logo />
          {/* <SiSkillshare className='text-[4rem] text-indigo-700 m-0 p-0'/> */}
          {/* <span className="self-center text-[1.1rem] font-bold whitespace-nowrap text-indigo-700 bg-gray-800 p-2 rounded"></span> */}
        </Link>
        {/*-------------- Brand logo ended ------------------- */}

        <ul className="flex gap-x-5 hidden md:inline-flex " >
          {currUser?.email?
          <Link
          to="/dashbord">
          <li

            className={`w-[5rem] text-black text-center  hover:bg-gray-100 rounded text-[.95rem] font-bold ${currLocation === '/dashbord' ||currLocation==='/dashbord/categories' ? 'scale-110 text-indigo-600 font-[900]' : ''}`}
            aria-current="page"
          >
            Dashbord
          </li>
        </Link>
          :
          null}
          <Link
            to="/">
            <li

              className={`w-[4rem] text-black text-center  hover:bg-gray-100 rounded text-[.95rem] font-bold ${currLocation === '/' ? 'scale-110 text-indigo-600 font-[900]' : ''}`}
              aria-current="page"
            >
              Home
            </li>
          </Link>

          <Link
            to="/course">
            <li
              className={`w-[4rem] text-black text-center hover:bg-gray-100 rounded text-[.95rem] font-bold ${currLocation === '/course' ? 'scale-110 text-indigo-600 font-[900]' : ''}`}
            >
              Course
            </li>
          </Link>

          <Link to={'/about'}>
            <li

              className={`w-[4.5rem] text-black text-center hover:bg-gray-100 rounded text-[.95rem] font-bold ${currLocation === '/about' ? 'scale-110 text-indigo-600 font-[900]' : ''}`}
            >
              About
            </li>
          </Link>

          <Link to={'/contactUs'}>
            <li
              className={`w-[4.5rem] text-center rounded hover:bg-gray-100 text-black text-[.95rem] font-bold ${currLocation === '/contactUs' ? 'scale-110 text-indigo-600 font-[900]' : ''}`}
            >
              Contect
            </li>
          </Link>
        </ul>

        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className='flex gap-x-4 align-end justify-center'>

            {/* Search btn */}
            <Link to={'/search'}>
              <button className='btn  btn-ghost rounded-[50%] py-2 px-3'>
                <IoSearchSharp className='text-[1.5rem] text-gray-600' />
              </button>
            </Link>

            {/* card btn */}
            {currUser && currUser?.accountType === 'Student' ?
              <Link to={'/cart'}>
                <button className='relative btn btn-ghost rounded-[50%] py-2 px-3'>
                  <span className="absolute top-0 right-0 badge badge-sm indicator-item h-[20px] text-white bg-indigo-600 border-0">{userBag?.length}</span>
                  <MdOutlineShoppingCart className='text-[1.5rem] text-gray-600' />
                </button>
              </Link> :
              null
            }

            {/* -------------- Set dropDownOpen btn------------------- */}
            {currUser.image === undefined ?
              location.pathname === '/signup' ?
                <Link to={'/'}>
                  <button className='bg-indigo-600 border-0 text-white font-bold hover:bg-indigo-700 btn min-h-[2.5rem] h-[2.5rem]'>

                    Login
                  </button>
                </Link> :
                <Link to={'/signup'}>
                  <button className='bg-indigo-600 border-0 text-white font-bold hover:bg-indigo-700 btn min-h-[2.5rem] h-[2.5rem]'>

                    Signup
                  </button>
                </Link> :
              <button
                className="flex max-h-[36px] mt-1 mx-1 h-[36px] text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                <span className="sr-only">Open user menu</span>
                <img className="w-9 h-9 fit rounded-full m-0 p-0" src={currUser.image} alt="user photo" />
              </button>
            }{/* -------------- Set dropDownOpen btn ended------------------- */}

          </div>
          {/* -------------- Set dropDownOpen btn------------------- */}
          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-10 right-1 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">{`${currUser.firstName} ${currUser.lastName}`}</span>
                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{currUser.email}</span>
              </div>
              <ul className="py-2">

                <li
                onClick={()=>setDropdownOpen(()=>false)} 
                >
                  <Link
                    to="/dashbord"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li>

                <li
                 onClick={()=>setDropdownOpen(()=>false)} 
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>

                <li 
                 onClick={()=>setDropdownOpen(()=>false)} 
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Earnings
                  </a>
                </li>

                {currUser.image !== undefined ?
                  <li onClick={()=>{
                    setDropdownOpen(()=>false)
                    return handleSignOut()}}>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Sign out
                    </a>
                  </li> :
                  null
                }
              </ul>
            </div>
          )}
          {/* -------------- Set dropDownOpen  section ended------------------- */}


          {/* -------------- User manu btns------------------- */}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          {/* -------------- User manu btns ended------------------- */}

        </div>


      </div>
      {/* -------------- User manu btns section start------------------- */}
      <div
        className={`items-center justify-between ${menuOpen ? 'block' : 'hidden'
          } w-full`}
      >
        <ul className="flex flex-col gap-y-1  font-medium p-3  my-1 border border-gray-800 rounded-lg bg-gray-700  rtl:space-x-reverse mx-1">
       
        <Link
            to="/dashbord">
            <li
              onClick={()=>setMenuOpen(()=>false)}
              className={`text-[.89rem] font-[700]   py-1 px-3 rounded ${ currLocation === '/dashbord' ||currLocation==='/dashbord/categories'? 'bg-indigo-600 text-white' : 'text-white'}`}
              aria-current="page"
            >
              Dashbord
            </li>
          </Link>

          <Link
            to="/">
            <li
              onClick={()=>setMenuOpen(()=>false)}
              className={`text-[.89rem] font-[700]   py-1 px-3 rounded ${currLocation === '/' ? 'bg-indigo-600 text-white' : 'text-white'}`}
              aria-current="page"
            >
              Home
            </li>
          </Link>

          <Link
            to="/course">
            <li
             onClick={()=>setMenuOpen(()=>false)}
                className={`text-[.89rem] font-[700]   py-1 px-3 rounded ${currLocation === '/course' ? 'bg-indigo-600 text-white' : 'text-white'}`}
            >
              Course
            </li>
          </Link>

          <Link to={'/about'}>
            <li
             onClick={()=>setMenuOpen(()=>false)}
                className={`text-[.89rem] font-[700]   py-1 px-3 rounded ${currLocation === '/about' ? 'bg-indigo-600 text-white' : 'text-white'}`}
              >
                About
            </li>
          </Link>

          <Link to={'/contactUs'}>
            <li
             onClick={()=>setMenuOpen(()=>false)}
                className={`text-[.89rem] font-[700]   py-1 px-3 rounded ${currLocation === '/contactUs' ? 'bg-indigo-600 text-white' : 'text-white'}`}
              >
                Contect
            </li>
          </Link>
        </ul>
      </div>
      {/* -------------- User manu btns section ended------------------- */}
    </nav>
  );
};

export default Navbar;
