import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import { FiSearch, FiSun, FiMoon } from "react-icons/fi";

function Navbar({ search, setSearch, cart, wishlist, isDark, toggleTheme }) {
  const location = useLocation();
  const showSearch = location.pathname === "/shop";
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClassName = ({ isActive }) =>
    `nav-link${isActive ? " active" : ""}`;

  const handleCloseMenu = () => setIsOpen(false);

  return (
    <header className="navbar-shell">
      <nav className="navbar navbar-expand-lg storefront-navbar">
        <div className="container align-items-center">

          {/* LOGO */}
          <Link className="navbar-brand brand-mark" to="/">
            Veloura
          </Link>

          {/* TOGGLER */}
          <button
            className="navbar-toggler simple-toggle"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "Close" : "Menu"}
          </button>

          {/* NAV ITEMS */}
          <div className={`navbar-collapse ${isOpen ? "show" : ""}`}>
            <div className="navbar-nav mx-auto nav-pill-group">

              <NavLink to="/" className={navLinkClassName} onClick={handleCloseMenu}>
                Home
              </NavLink>

              <NavLink to="/shop" className={navLinkClassName} onClick={handleCloseMenu}>
                Shop
              </NavLink>

              <NavLink to="/about" className={navLinkClassName} onClick={handleCloseMenu}>
                About
              </NavLink>

              <NavLink to="/contact" className={navLinkClassName} onClick={handleCloseMenu}>
                Contact
              </NavLink>

              <NavLink to="/wishlist" className={navLinkClassName} onClick={handleCloseMenu}>
                Wishlist
                <span className="nav-count">{wishlist.length}</span>
              </NavLink>

              <NavLink to="/cart" className={navLinkClassName} onClick={handleCloseMenu}>
                Cart
                <span className="nav-count">{cart.length}</span>
              </NavLink>

            </div>

            {/* RIGHT SIDE */}
            <div className="nav-search-slot">
              <div className="nav-actions">

                
              </div>
            </div>
{showSearch ? (
  <SearchBar search={search} setSearch={setSearch} />
) : (
  <>
    {/* SEARCH ICON */}
    <Link
      className="nav-icon-btn"
      to="/shop"
      onClick={handleCloseMenu}
      title="Search"
    >
      <FiSearch size={18} />
    </Link>

    {/* THEME TOGGLE */}
    <button
      className="nav-icon-btn"
      onClick={toggleTheme}
      title="Toggle Theme"
    >
      {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  </>
)}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;