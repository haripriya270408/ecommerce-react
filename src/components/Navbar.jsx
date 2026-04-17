import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";

function Navbar({ search, setSearch, cart, wishlist, isDark, toggleTheme }) {
  const location = useLocation();
  const showSearch = location.pathname === "/shop";
  const [isOpen, setIsOpen] = useState(false);
  const navLinkClassName = ({ isActive }) =>
    `nav-link${isActive ? " active" : ""}`;

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="navbar-shell">
      <nav className="navbar navbar-expand-lg storefront-navbar">
        <div className="container-fluid px-0 align-items-center">
          <Link className="navbar-brand brand-mark" to="/">
            Veloura
          </Link>

          <button
            className="navbar-toggler glass-icon-button"
            type="button"
            aria-controls="storefrontNav"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
            onClick={() => setIsOpen((open) => !open)}
          >
            <span className="navbar-toggler-label">{isOpen ? "Close" : "Menu"}</span>
          </button>

          <div className={`navbar-collapse ${isOpen ? "show" : ""}`} id="storefrontNav">
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
              <NavLink
                to="/wishlist"
                className={navLinkClassName}
                onClick={handleCloseMenu}
              >
                Wishlist
                <span className="nav-count">{wishlist.length}</span>
              </NavLink>
              <NavLink to="/cart" className={navLinkClassName} onClick={handleCloseMenu}>
                Cart
                <span className="nav-count">{cart.length}</span>
              </NavLink>
            </div>

            <div className="nav-search-slot">
              <div className="nav-actions">
                {showSearch ? (
                  <SearchBar search={search} setSearch={setSearch} />
                ) : (
                  <Link className="glass-button nav-cta" to="/shop" onClick={handleCloseMenu}>
                    Search products
                  </Link>
                )}
                <button
                  type="button"
                  className="glass-button secondary-button theme-toggle-button"
                  onClick={toggleTheme}
                >
                  {isDark ? "Light" : "Dark"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
