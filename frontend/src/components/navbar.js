import React, { useState } from "react";
import { NavLink, BrowserRouter } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="App">
    <nav
      className="navbar is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <header class="header">
        <h1 class="logo"><a href="#">VISME</a></h1>
        <ul class="main-nav">
          <li><a
            role="button"
            className={`navbar-burger burger ${isOpen && "is-active"}`}
            aria-label="menu"
            aria-expanded="false"
            onClick={() => setOpen(!isOpen)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
          </li>
          <li><a
            role="button"
            className={`navbar-burger burger ${isOpen && "is-active"}`}
            aria-label="menu"
            aria-expanded="false"
            onClick={() => setOpen(!isOpen)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
          </li>
          <li><a
            role="button"
            className={`navbar-burger burger ${isOpen && "is-active"}`}
            aria-label="menu"
            aria-expanded="false"
            onClick={() => setOpen(!isOpen)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
          </li>
          <li><a
            role="button"
            className={`navbar-burger burger ${isOpen && "is-active"}`}
            aria-label="menu"
            aria-expanded="false"
            onClick={() => setOpen(!isOpen)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
          </li>
          <li><a
            role="button"
            className={`navbar-burger burger ${isOpen && "is-active"}`}
            aria-label="menu"
            aria-expanded="false"
            onClick={() => setOpen(!isOpen)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
          </li>

        </ul>

      
          <BrowserRouter>
            <NavLink className="navbar-item" activeClassName="is-active" to="/">
              NEWS
            </NavLink>

            <NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/petitions"
            >
              PETITIONS
            </NavLink>

            <NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/rooms"
            >
              ROOMS
            </NavLink>
            <NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/detector"
            >
              DETECTOR
            </NavLink>
            <NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/heatmap"
            >
              HEATMAP
            </NavLink>
            </BrowserRouter>

      </header> 
          

          




    </nav>
    </div>
  );
};


export default Navbar;