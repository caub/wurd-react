// Provides an example of how to edit interactive elements such as dropdowns

import React from 'react';
import { NavDropdown, MenuItem } from 'react-bootstrap';


const Navbar = ({ content }) => (
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <ul className="nav navbar-nav">
        <li><a href="/"><content.Text id="home" /></a></li>
      </ul>

      <content.Object type="ul" className="nav navbar-nav navbar-right" id="menu" detect>
        {content.block('menu', block =>
          <NavDropdown id="navDropdown" title="Menu">
            <MenuItem><block.Text id="item1" /></MenuItem>
            <MenuItem><block.Text id="item2" /></MenuItem>
          </NavDropdown>
        )}
      </content.Object>
    </div>
  </nav>
);


export default Navbar;
