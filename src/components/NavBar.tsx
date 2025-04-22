import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/auth-context";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 font-poppins">
      <div className="container  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-xl font-semibold text-gray-800">
            SnapShop
          </Link>

          <div className="hidden md:flex space-x-6 items-center">
            {["/", "/user", "/product", "/order"].map((path, i) => {
              const labels = ["Home", "Users", "Products", "Orders"];
              return (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `text-sm font-medium px-3 py-2 rounded-md transition ${
                      isActive
                        ? "text-green-600 bg-green-50"
                        : "text-gray-700 hover:text-green-600 hover:bg-gray-100"
                    }`
                  }
                >
                  {labels[i]}
                </NavLink>
              );
            })}
            {user ? (
              <button
                onClick={logout}
                className="text-sm font-medium px-3 py-2 text-gray-700 hover:text-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `text-sm font-medium px-3 py-2 rounded-md transition ${
                    isActive
                      ? "text-green-600 bg-green-50"
                      : "text-gray-700 hover:text-green-600 hover:bg-gray-100"
                  }`
                }
              >
                Sign In
              </NavLink>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-800 hover:text-green-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 pt-2 pb-2 space-y-2">
            {["/", "/user", "/product"].map((path, i) => {
              const labels = ["Home", "User", "Product"];
              return (
                <NavLink
                  key={path}
                  to={path}
                  onClick={toggleMobileMenu}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium transition ${
                      isActive
                        ? "text-green-600 bg-green-50"
                        : "text-gray-700 hover:text-green-600 hover:bg-gray-100"
                    }`
                  }
                >
                  {labels[i]}
                </NavLink>
              );
            })}
            {user ? (
              <button
                onClick={() => {
                  logout();
                  toggleMobileMenu();
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-100 rounded-md"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                onClick={toggleMobileMenu}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition ${
                    isActive
                      ? "text-green-600 bg-green-50"
                      : "text-gray-700 hover:text-green-600 hover:bg-gray-100"
                  }`
                }
              >
                Sign In
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
