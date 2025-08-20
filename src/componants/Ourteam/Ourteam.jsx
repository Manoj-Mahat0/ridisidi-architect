import React, { useState } from "react";
import jiten from "../../../Public/Images/Jiten.webp"
import viplav from "../../../Public/Images/Viplav.jpg"
import sachin from "../../../Public/Images/Sachin.webp";

const testimonials = [
  {
    text: `Ar. Jiten Kumar is the founder and principal architect of Riddhi Siddhi Architect. 
He graduated in B.Arch with distinction from the Padmashree Dr. D.Y. Patil College of Architecture, Pune University in 2011. 
Thereafter, he worked at Arcop Associates Pvt. Ltd in Gurgaon for eleven years, contributing immensely to the Commune’s varied ongoing projects. 
Here, he imbibed a new spiritual approach to spatial design, as a means of connecting man with himself and his environment. 
Having identified the true meaning and purpose of Architecture, he established Riddhi Siddhi Architect in 2022. 
He post-graduated with an M.Arch in Landscape in 2021 from MDU University. 
He has been practicing architecture for over 14 years with a deep understanding of architecture and respect for client needs and emotions regarding their dream projects. 
Throughout his career, Ar. Jiten Kumar has worked on numerous versatile projects like residential group housing, commercial complexes, and public buildings.

Recognition with other Institutions:
1) Registered Architect with Council of Architecture, New Delhi
2) Approved Architect of Chas Municipal Corporation, Chas, Bokaro
3) Approved Architect of Bokaro Zila Parishad, Bokaro
4) Associate Member of Institution of Valuers`,
    name: "Ar. Jiten Kumar",
    role: "Principal Architect",
    image: jiten,
  },
  {
    text: `Viplav Agrahari is a seasoned architect with over 10 years of professional experience in the field of architectural and interior design. 
He holds a Bachelor's degree in Architecture and has worked on a diverse portfolio of residential, commercial, institutional, and mixed-use projects. 
Combining design excellence with technical precision, he delivers thoughtful and contextually responsive solutions.

Known for seamlessly integrating form, function, and sustainability, Viplav plays a key role in leading project development—from concept to design visualization. 
He is dedicated to creating spaces that are not only visually compelling but also aligned with user needs and environmental considerations.

A collaborative team player and strategic thinker, Viplav brings leadership, creative insight, and a meticulous eye for detail to every stage of the design process.`,
    name: "Viplav Agrahari",
    role: "Senior Architect",
    image: viplav,
  },
  {
    text: `Sachin Jain is a qualified and experienced Structural Engineer known for delivering safe, practical, and cost-effective structural design solutions. 
He holds a B.Tech (Honors) in Civil Engineering and an M.Tech in Structural Engineering. 
With expertise in analysis, detailing, and coordination, he has contributed to a wide range of residential, commercial, and industrial projects.

Sachin brings a deep understanding of structural behavior, design codes, and construction practices, ensuring high-quality outcomes and timely project delivery. 
His commitment to technical excellence and collaborative approach makes him a valuable asset to any project team.`,
    name: "Sachin Jain",
    role: "Structural Engineer",
    image: sachin,
  },
];

export default function Testimonials() {
  const [openModal, setOpenModal] = useState(null);

  return (
    <>

      <section className="bg-white text-black py-8 mt-0 lg:mt-10" >
        <div className=" px-4 text-center">
          <h2 className="uppercase tracking-widest text-sm font-semibold mb-2">
            Testimonials
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-2">
            What They Say About Us
          </h3>
          <div className="flex justify-center mb-8">
            <div className="h-1 w-16 bg-black"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="border border-gray-300 p-6 flex flex-col items-center text-center relative pb-12"
              >
                <p className="mb-4 text-sm text-justify">
                  {testimonial.text.substring(0, 250)}...
                </p>
                <button
                  className="border border-black px-4 py-2 uppercase mt-4 hover:bg-black hover:text-white transition"
                  onClick={() => setOpenModal(index)}
                >
                  View All
                </button>
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-black
               absolute -bottom-10 bg-black">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="mt-7">
                  <h4 className="font-bold text-lg">{testimonial.name}</h4>
                  <p className="">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Modal */}
          {openModal !== null && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
              <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
                <button
                  onClick={() => setOpenModal(null)}
                  className="absolute top-2 right-4 text-gray-600 text-xl font-bold"
                >
                  &times;
                </button>
                <div className="flex flex-col items-center text-center">
                  <img
                    src={testimonials[openModal].image}
                    alt={testimonials[openModal].name}
                    className="w-24 h-24 rounded-full border-4 border-black object-cover mb-4"
                  />
                  <h4 className="font-bold text-xl mb-1">
                    {testimonials[openModal].name}
                  </h4>
                  <p className="mb-6 text-sm">
                    {testimonials[openModal].role}
                  </p>
                </div>
                <div className="text-sm text-justify whitespace-pre-line">
                  {testimonials[openModal].text}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}












