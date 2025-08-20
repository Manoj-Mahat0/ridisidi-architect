import React from 'react';
import { FaPhoneAlt, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const StickyContactButtons = () => {
  return (
    <>
      {/* Right Side: Phone & WhatsApp */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-3">
        <a
          href="tel:+918826243157"
          className="bg-black text-white p-4 rounded-full shadow-lg flex items-center justify-center transition duration-300"
          title="Call Now"
        >
          <FaPhoneAlt size={20} />
        </a>
        <a
          href="https://wa.me/918826243157"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white p-4 rounded-full shadow-lg flex items-center justify-center transition duration-300"
          title="Chat on WhatsApp"
        >
          <FaWhatsapp size={20} />
        </a>
      </div>

      {/* Left Side: Email */}
      <div className="fixed bottom-4 left-4 z-50">
        <a
          href="mailto:ar.jitenkumar@gmail.com"
          className="bg-black text-white p-4 rounded-full shadow-lg flex items-center justify-center transition duration-300"
          title="Send Email"
        >
          <FaEnvelope size={20} />
        </a>
      </div>
    </>
  );
};

export default StickyContactButtons;
