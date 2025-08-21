import React from "react";
import { NavLink } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="bg-whitetext-white py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

        <div>
          <h3 className="text-xl font-bold mb-4">Riddhi Siddhi Architect</h3>
          <p >
            Creating innovative spaces with passion and precision. Your vision is our mission.
          </p>
        </div>
        <div>
          <div className="lg:ml-10  ml-0">
            <h4 className="text-lg font-semibold mb-4  uppercase">Quick Links</h4>
          <ul className="space-y-2">

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
              <li >CONTACT US</li>
            </NavLink>
            <NavLink to="/login"><li >ADMIN PANEL</li></NavLink>
          </ul>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4 uppercase" >Our Services</h4>
          <ul className="space-y-2 uppercase">
            <li>
              <NavLink
                to="/menuservices"
                className="hover:text-black"
              >
                Architecture
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/menuservices"
                className="hover:text-black"
              >
                Interior Designing
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/menuservices"
                className="hover:text-black"
              >
                Landscape
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4 uppercase">Contact Us</h4>
          Address- CMCE Campus Lane, Near Daffodils International Public School, Chira Chas, Bokaro Steel City, Jharkhand 827013
          <p>Phone:+91-882 624 3157</p>
          {/* <p>Email:contact@riddhisiddhiarchitect.in </p> */}
          <p className="flex">
            Email:{" "}
            <a
              href="mailto: contact@riddhisiddhiarchitect.in"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              contact@riddhisiddhiarchitect.in
            </a>
          </p>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-white border-t border-white/20 ">
        <p className="mt-5 pb-6 text-black ">
          &copy; 2025 Riddhi Siddhi Architect. All rights reserved. Powered by{" "}
          <a
            href="https://www.systaio.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-300 transition-colors"
          >
            SystAIO Technologies
          </a>
        </p>
      </div>
    </footer>
  );
}
