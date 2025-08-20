import React from 'react'
import { motion } from "framer-motion";
import Contactus from '../Contactus/Contactus';
import Contactslider from "../../componants/Contactus/Contactslider";
import Aboutslider from '../Aboutus/Aboutslider';
const Menucontactus = () => {
  return (
    <>
        <Aboutslider />

<Contactus />

<div className="pt-6 mb-20" data-aos="fade-up">
  <iframe
    title="Google Map Location"
   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.7489346934117!2d86.18824!3d23.649160699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4218837d0eae1%3A0xb651e555a651495f!2sRiddhi%20Siddhi%20Architect!5e0!3m2!1sen!2sin!4v1752864435502!5m2!1sen!2sin" 
    width="100%"
    height="450"
    allowFullScreen=""
    loading="lazy"
    className="rounded-xl border-2 border-white"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>
    </>
  )
}

export default Menucontactus
