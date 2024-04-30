
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineHome } from "react-icons/ai";
import { PiVideoCamera } from "react-icons/pi";
import { GoChevronDown } from "react-icons/go";

const Sidebar = ({sidebarState, setSidebarState}) => {
    const location = useLocation();
    const [dropdowns, setDropdowns] = useState({});

    const toggleDropdown = (dropdownName) => {
        setDropdowns(prevState => ({
            ...prevState,
            [dropdownName]: !prevState[dropdownName] // Toggle the dropdown state based on its current value
        }));
    };

    useEffect(() => {
        setSidebarState(false);
      }, [location]);

    return (
        <>
        <aside
            className={`fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 w-64 h-full pt-16 font-normal duration-75 flex transition-width ${sidebarState ? 'sidebarmenu--active': 'sidebarmenu'}`}
        >
            <div className="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200">
                <div className="flex flex-col flex-1 pt-5 pb-28 overflow-y-auto scrollbar scrollbar-w-2 scrollbar-thumb-rounded-[0.1667rem] scrollbar-thumb-slate-200 scrollbar-track-gray-400">
                    <div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200">
                        <ul className="pb-2 space-y-2">
                            <li>
                                <Link to="/Home" className="flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group">
                                    <AiOutlineHome className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                                    <span className="ml-3" >Welcome</span>
                                </Link>
                            </li>
                            <li >
                                <button
                                    type="button"
                                    className={`flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group ${location.pathname === '/movies' || location.pathname === '/add-movie' ? 'bg-black text-white shadow-lg' : ''}`}
                                    onClick={() => toggleDropdown('dropdown1')}
                                >
                                    <PiVideoCamera className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75" />
                                    <span className="flex-1 ml-3 text-left whitespace-nowrap" >Movies</span>
                                    <GoChevronDown className="w-6 h-6" />
                                </button>
                                <ul className={`py-2 space-y-2 ${dropdowns['dropdown1'] ? 'hidden' : 'block'}`}>
                                    <li>
                                        <Link to="/movies" className="flex items-center p-2 text-base text-gray-900 tranition duration-75 rounded-lg pl-11 group hover:bg-gray-100">All Movies</Link>
                                    </li>
                                    <li>
                                        <Link to="/add-movie" className={`flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 ${location.pathname === '/add-movie' ? 'bg-gray-100' : ''}`}>Add Movie</Link>
                                    </li>
                                    <li>
                                        <Link to="/add-banner" className={`flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 ${location.pathname === '/add-movie' ? 'bg-gray-100' : ''}`}>Add banner</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>

        {sidebarState ? <div className='sidebar--overlay' onClick={() => setSidebarState(false)}></div>: null}
        </>
    );
}

export default Sidebar;
