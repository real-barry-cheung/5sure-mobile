import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
/* Contains the component for an address in create pages */
export default function Header({ title, backLink }) {
  return (
    <div className='headerContainer'>
      <div className="headerBar">
        {backLink && <Link className="backButton" to={backLink} align="left"> <i class="fa-solid fa-arrow-left"></i> </Link>}
        <h1 className="title">{title}</h1>
      </div>
    </div>
  );
}