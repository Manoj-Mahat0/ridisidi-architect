import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Contactfrom from "./Contactfrom";
const ContactSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <>
<div className="flex items-center justify-center y-12 lg:mt-10 -mt-20">
        <div
          className="rounded-xl  flex flex-col lg:flex-row overflow-hidden"
          data-aos="zoom-in-up"
        >
          <div
            className=" text-black w-full lg:w-1/2 p-8 space-y-5"
            data-aos="fade-right"
          >
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-2">
                Address- CMCE Campus Lane, Near Daffodils International Public School, Chira Chas, Bokaro Steel City, Jharkhand 827013
              </div>

              <div className="space-y-3">
                <h4 className="text-base font-semibold">Contact</h4>
                <p className="text-sm">
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

                <p className="text-sm">
                  Phone:{" "}
                  <a href="tel:+918826243157" className="hover:underline">
                    +91 882 624 3157
                  </a>
                </p>
<div className="flex space-x-6 pt-3 text-4xl font-bold text-black">
  <a
    href="https://www.instagram.com/jiten3635/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <i className="ri-instagram-line text-black"></i>
  </a>
<a
  href="https://www.facebook.com/jiten.kumar.37"
  target="_blank"
  rel="noopener noreferrer"
>
 <i class="ri-facebook-circle-fill"></i>
</a>
  <a
    href="https://www.youtube.com/@riddhisiddhiarchitect"
    target="_blank"
    rel="noopener noreferrer"
  >
    <i className="ri-youtube-line text-black"></i>
  </a>
  <a
    href="https://wa.me/918826243157"
    target="_blank"
    rel="noopener noreferrer"
  >
    <i className="ri-whatsapp-line text-black"></i>
  </a>
</div>
  </div>
            </div>
            <div className="pt-6" data-aos="fade-up">
              <iframe
                title="Dhanbad Jharkhand Location"
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.7489346934117!2d86.18824!3d23.649160699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4218837d0eae1%3A0xb651e555a651495f!2sRiddhi%20Siddhi%20Architect!5e0!3m2!1sen!2sin!4v1752864435502!5m2!1sen!2sin" 
                width="100%"
                height="250"
                allowFullScreen=""
                loading="lazy"
                className="rounded-xl border-2 border-white"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>

          <div className="w-full lg:w-1/2 p-8  text-black" data-aos="fade-left">
            <h2 className="text-2xl font-bold text- mb-1">
              Get in Touch
            </h2>
            <p className=" text-sm mb-6">
              Feel free to drop us a line below!
            </p>

            <Contactfrom />
          </div>
        </div>
      </div>

    </>
  );
};

export default ContactSection;
