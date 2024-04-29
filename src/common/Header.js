import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Redux/reducers/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { RxHamburgerMenu } from "react-icons/rx";


const Header = ({toggleSidebar}) => {
    const navigate = useNavigate();

    const [logoutDropdown, setLogoutDropdown] = useState(false)

    const dispatch = useDispatch()
    const handlelogout = () => {
        dispatch(logout())
        navigate("/")
    }
    const token = useSelector(state => state?.auth?.token)
    useEffect(() => {
        if (!token) {
            navigate("/")
        }
    }, []);

    const handleClick = () => {
        toggleSidebar()
      }

    return (
        <header className="fixed z-30 w-[100%] bg-[#000] border-b border-gray-200">
            <nav>
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">

                            <Link to="/" className="flex ml-2 md:mr-24">
                                <img src='/assets/images/logo.png' className="h-8 mr-3" alt="FlowBite Logo" />
                            </Link>

                        </div>

                        <div className="flex items-center">
                            <div className='profile--view--top'>
                                <div
                                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 cursor-pointer"
                                    onClick={() => setLogoutDropdown(!logoutDropdown)}
                                >
                                    <img
                                        className="w-8 h-8 rounded-full"
                                        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                        alt="user photo"
                                    />
                                </div>

                                {logoutDropdown && (

                                    <div
                                        className="absolute right-[20px] z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow"
                                        id="dropdown-2"
                                    >
                                        <div className="px-4 py-3" role="none">
                                            <p className="text-sm text-gray-900" role="none">
                                                Admin
                                            </p>
                                            <p
                                                className="text-sm font-medium text-gray-900 truncate"
                                                role="none"
                                            >
                                                admin@gmail.com
                                            </p>
                                        </div>
                                        <ul className="py-1" role="none">
                                            <li onClick={handlelogout}>
                                                <span
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</span>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <button
                                className="p-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 bg-gray-100 ml-[20px] hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100"
                                onClick={handleClick}
                            >
                                <RxHamburgerMenu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>

    )
}

export default Header