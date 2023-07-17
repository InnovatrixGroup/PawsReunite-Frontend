
import React, { useState } from 'react'
import './NavbarNew.css'
import PersonIcon from '@mui/icons-material/Person';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import logo from '../pics/logo.png'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Dropdown from './Dropdown';

export default function NavbarNew() {

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [isDarkFilterVisible, setIsDarkFilterVisible] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsDarkFilterVisible(!isDarkFilterVisible);
  };

  const toglleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  const handleMouseEnter = () => {
    setIsSubmenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsSubmenuOpen(false);
  };

  return (
    <div>
    <div className={`dark-filter ${isDarkFilterVisible ? 'active' : ''}`} onClick={toggleMenu}></div>
    <div className='navbar flex justify-between items-center bg-gray-200 py-2 px-6 h-16'>
      <div className='navbar__logo'>
        <img src={logo} alt='logo' className='w-10' />
      </div>
      <div className='navbar__icons flex gap-4'>
        <div className="hidden justify-between items-center gap-6 md:flex lg:flex">
          <div>Home</div>
          <div className='pet__menu relative' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          Pets
          {isSubmenuOpen && (
            <Dropdown />
          )}
          </div>

          <div>Pet Resources</div>
          <div>Contact</div>
        </div>
        <div className='navbar__icon cursor-pointer'>
          <PersonIcon />
        </div>
        <div className='navbar__icon cursor-pointer'>
          <NotificationsOutlinedIcon />
        </div>
        <div className={`navbar__menu-icon ${isOpen ? 'open' : ''} cursor-pointer w-5 flex flex-col justify-center md:hidden lg:hidden`} onClick={toggleMenu}>
          <span className="navbar__menu-icon-bar" />
          <span className="navbar__menu-icon-bar" />
          <span className="navbar__menu-icon-bar" />
        </div>
      </div>
      <div className={`navbar__menu ${isOpen ? 'active' : ''} text-base`}>
        {console.log('isOpen', isOpen)}
        <div className='navbar__menu-link'>Home</div>
        <div className='navbar__menu-link flex' onClick={toglleSubmenu}>
          <div className='submenu-button mr-12'>
           {isSubmenuOpen ? <RemoveIcon style={{fontSize: "22px"}}/> : <AddIcon style={{fontSize: "22px"}}/>}
          </div>
          <div>Pets</div>
        </div>
          {isSubmenuOpen && (
            <div className={`navbar__submenu ${isSubmenuOpen ? 'active' : ''}`}>

            <div className='navbar__submenu-link flex flex-col items-end'>
              <div>Lost Pets</div>
              <div>Found Pets</div>
            </div>
            </div>

          )}
        <div className='navbar__menu-link'>Pet Resources</div>
        <div className='navbar__menu-link'>Contact</div>
      </div>   
    </div>
   

    </div>
  )
}

