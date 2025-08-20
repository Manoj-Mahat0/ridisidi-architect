import React, { useEffect, useState } from "react";
import {  FaBars, FaTimes } from "react-icons/fa";
import logoo from "../../../Public/Images/logo.jpg";
import { NavLink, useLocation } from "react-router-dom";
import ContactForm from "../Contactus/Contactfrom";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
   const [showForm, setShowForm] = useState(false);
  const location = useLocation(); 
  useEffect(() => {
   setMenuOpen(false);
  }, [location]);
  return (
    <>
      <div className="sticky top-0 z-50 shadow bg-white  ">
        <nav className=" text-black  px-6 py-4 lg:mx-12 mx-0 md:mx-0">
          <div className="flex justify-between items-center">
            <NavLink to="/">
              <div className="flex items-center gap-2">
                <img
                  src={logoo}
                  alt="logo"
                  className="w-20 h-20 sm:w-20 sm:h-20 object-contain "
                />
                {/* <span className="text-sm  ">
             Riddhi Siddhi Architect
             <br />
             Architecture Interior Designing Landscape
                </span> */}
                  {/* <span className="block font-medium">Riddhi Siddhi Architect</span> */}
              </div>
                 {/* <span className="text-[10px] sm:text-xs md:text-sm leading-tight">
    
      <span className="block text-gray-600">
        Architecture · Interior Designing · Landscape
      </span>
    </span> */}
            </NavLink>
           
            <div
              className="md:hidden text-2xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </div>

          <ul className="hidden md:flex gap-6 font-semibold text-sm cursor-pointer">
  <NavLink to="/">
    <li >HOME</li>
  </NavLink>
  <NavLink to="/menuaboutus">
    <li >ABOUT US</li>
  </NavLink>
  <NavLink to="/menuservices">
    <li >SERVICES</li>
  </NavLink>
  <NavLink to="/menuourteam">
    <li >OUR TEAM</li>
  </NavLink>
  <NavLink to="/Menugallery">
    <li >PROJECT</li>
  </NavLink>
  <NavLink to="/menucontactus">
    <li>CONTACT US</li>
  </NavLink>
</ul>
{/* <NavLink to="/menucontactus"> */}
  <button 
         onClick={() => setShowForm(true)}
  className="hidden md:block bg-white  font-bold text-sm px-4 py-3 bg-gray-200
   rounded hover:bg-gray-400 transition">
    ENQUIRY
  </button>
{/* </NavLink> */}

          </div>

          {/* Mobile Menu */}
          {menuOpen && (
          <ul className="md:hidden mt-4 flex flex-col gap-3 font-semibold text-sm h-screen">
  <NavLink to="/">
    <li
      onClick={() => setMenuOpen(false)}
     
    >
      HOME
    </li>
  </NavLink>
  <NavLink to="/menuaboutus">
    <li onClick={() => setMenuOpen(false)}>ABOUT US</li>
  </NavLink>
  <NavLink to="/menuservices">
    <li onClick={() => setMenuOpen(false)}>SERVICES</li>
  </NavLink>
  <NavLink to="/menuourteam">
    <li onClick={() => setMenuOpen(false)}>OUR TEAM</li>
  </NavLink>
  <NavLink to="/Menugallery">
    <li onClick={() => setMenuOpen(false)}>PROJECT</li>
  </NavLink>
  <NavLink to="/menucontactus">
    <li onClick={() => setMenuOpen(false)}>CONTACT US</li>
  </NavLink>
  {/* <NavLink to="/menucontactus"> */}
    <button
      // onClick={() => setMenuOpen(false)}
         onClick={() => {
                  setShowForm(true);
                 setMenuOpen(false);
                }}
      className="bg-gray-200  font-bold text-sm px-4 py-2 rounded
    transition"
    >
      ENQUIRY
    </button>
  {/* </NavLink> */}
</ul>

          )}
        </nav>


         {showForm && (
        <div className="fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full lg:w-[40vw] relative animate-fade-in-up">
            <button
              className="absolute top-2 right-2 text-black  text-xl"
              onClick={() => setShowForm(false)}
            >
              <FaTimes />
            </button>
            <h2
              className="text-2xl font-bold mb-4   
            underline underline-offset-8 decoration-4 decoration-black"
            >
            Riddhi Siddhi Architect
            </h2>
            <ContactForm />
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default Navbar;
