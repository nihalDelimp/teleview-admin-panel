import React, { useState } from 'react'
import Header from '../common/Header'
import Sidebar from '../common/Sidebar'

const CommonLayout = ({ children }) => {
    const [sidebarState, setSidebarState] = useState(false);
    const handleHeaderClick = () => {
        setSidebarState(!sidebarState);
      }
    return (
        <>
            <Header toggleSidebar={handleHeaderClick} setSidebarState={setSidebarState} />
            <Sidebar sidebarState={sidebarState} setSidebarState={setSidebarState} />
            <div className='relative overflow-y-auto bg-[#172240] lg:ml-64 min-h-screen lg:pl-[50px] pl-[15px]'>
                <div className=''>
                    {children}
                </div>
            </div>
        </>
    )
}

export default CommonLayout