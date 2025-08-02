'use client';

import React, { useState } from 'react'
import Navbar from './Navbar';
import MobileNavbar from './MobileNavbar';


type Props = {
    headerBgColor?: boolean;
}

const ResponsiveNav: React.FC<Props> = ({ headerBgColor}) => {
    const [showNav, setShowNav] = useState(false);
    const toggleOpenNav = () => setShowNav((prev) => !prev);


    return (
        <div>
            <Navbar
                headerBgColor={headerBgColor}
                toggleOpenNav={toggleOpenNav}
            />
            <MobileNavbar
                showNav={showNav}
                toggleOpenNav={toggleOpenNav}
            />
        </div>
    )
}

export default ResponsiveNav