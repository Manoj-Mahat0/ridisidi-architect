import React from "react";
const Workingsteps = () => {
  return (
    <>
      <div className="mt-16" >
        <div className="flex items-center">
          <h2 className="text-2xl md:text-3xl font-semibold uppercase">DESIGN PHILOSOPHY</h2>
          <div className="flex-grow border-t border-black ml-4"></div>
        </div>
      </div>
      <div className="  py-12 grid md:grid-cols-2 gap-8 mt-5">

        <div>

          <h3 className="text-xl font-semibold mb-4">VISIONARY CREATIVITY</h3>
          <p className="text-gray-700 mb-6">
            At Riddhi Siddhi Architect, our philosophy is to craft spaces that inspire, engage,
            and endure. Each design is an expression of creativity blended with thoughtful functionality.
            We strive to bring a unique identity to every project while ensuring it reflects the aspirations
            of our clients and the character of its context. From concept to execution, we focus on delivering
            timeless architecture that elevates the everyday experience.
          </p>

          <h3 className="text-gray-400 mb-2 text-3xl">FUNCTIONAL DESIGN</h3>
          <hr className="border-gray-300 mb-4" />

          <h3 className="text-gray-400  mb-2 text-3xl">
            CONTEXTUAL APPROPRIATENESS
          </h3>
          <hr className="border-gray-300" />
        </div>

        <div className="aspect-w-16 aspect-h-9">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/QYhnIvd7Dyo"
            title="Riddhi Siddhi Architect Philosophy"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

      </div>
    </>
  );
};

export default Workingsteps;

