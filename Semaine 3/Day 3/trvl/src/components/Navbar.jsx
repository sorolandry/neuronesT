import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Importe les icônes spécifiques dont tu as besoin
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
// import { faTypo3 } from '@fortawesome/free-brands-svg-icons'; // Pour 'fab fa-typo3'

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);


  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const shwoButton = () =>{
    if(window.innerWidth >= 960){
      setButton(false);
        } else{
          setButton(true);
        }
  };

  window.addEventListener('resize', shwoButton);
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            TRVL <i className="fab fa-typo3" /> {/* Utilisation du composant FontAwesomeIcon */}
          </Link>
          <div className="menu-icon" onClick={handleClick}> {/* Ajoute le onClick ici pour le menu-icon */}
            <FontAwesomeIcon icon={click ? faTimes : faBars} /> {/* Icône dynamique */}
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/services" className="nav-links" onClick={closeMobileMenu}>
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-links" onClick={closeMobileMenu}>
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/sign-up" className="nav-links" onClick={closeMobileMenu}>
                Sign Up
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;