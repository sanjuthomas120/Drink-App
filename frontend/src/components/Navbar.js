import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation} from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navbarLinks = [
    { title: "Home", path: "" },
    { title: "Menu", path: "/" },
    { title: "Make a reservation", path: "" },
    { title: "Contact us", path: "" },
  ];
  return (
    <div className="h-[40px] md:h-[100px] top-[-2px] bg-primary">
      <div className="flex justify-center md:justify-between items-center h-full max-w-6xl mx-auto">
        <div className="md:ml-[64px] lg:ml-0 flex justify-center items-center relative mt-[36px] md:mt-[96px] gap-2">
          <img
            src="/images/logo/Logo.png"
            alt="logo"
            className="w-[50px] h-[44px] md:w-[86px] md:h-[76px]"
          />
          <div className="hidden md:flex md:flex-col font-oswald text-[30px] font-[400] py-6 -space-y-[6px]">
            <h3 className="text-white">
              <span className="text-secondary">DEEP</span> NET
            </h3>
            <h3 className="text-[#857878]">SOFT</h3>
          </div>
        </div>
        <div className="hidden md:flex space-x-6 pt-14 pr-10">
          {navbarLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={` font-[400] text-[16px] font-oswald uppercase ${
                location.pathname === link.path ? "text-secondary" : "text-[#F5F5F5] "
              }`}
            >
              {link.title}
            </Link>
          ))}
        </div>
        <div className="md:hidden absolute right-4 top-4">
        {isOpen ? (
              <X
                color="#ffffff"
                size={16}
                className="cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            ) : (
              <Menu
                color="#ffffff"
                size={16}
                className="cursor-pointer"
                onClick={() => setIsOpen(true)}
              />
            )}
        </div>
      </div>
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-primary transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg z-50 lg:hidden`}
      >
      <div className="flex flex-1 flex-col justify-start h-full px-8 py-16 space-y-3">
        {navbarLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className={` font-[400] text-[16px] font-oswald uppercase ${
                location.pathname === link.path ? "text-secondary" : "text-[#F5F5F5] "
              }`}
            onClick={() => setIsOpen(false)}
          >
            {link.title}
          </Link>
        ))}
      </div>
      </div>
    </div>
  );
}

export default Navbar;
