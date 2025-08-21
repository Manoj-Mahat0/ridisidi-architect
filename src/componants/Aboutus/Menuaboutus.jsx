import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Aboutslider from "../../componants/Aboutus/Aboutslider";
const AboutUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",

    });
  }, []);

  return (
    <>
      <Aboutslider />
      <section className="py-6 lg:mt-10 -mt-20">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-black" data-aos="fade-up">Our Story</h2>
          <p className="text-gray-700 leading-relaxed" data-aos="fade-up" data-aos-delay="100">
            Riddhi Siddhi Architect is a premier architectural firm with a passion
            for creating timeless spaces that inspire. With over a decade of
            experience, we have delivered innovative designs across residential,
            commercial, and institutional projects.
          </p>
        </div>
      </section>
      <section className="bg-gray-50 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="px-4">
            <h3 className="text-2xl font-semibold mb-2 text-black" data-aos="fade-up">Our Vision</h3>
            <p data-aos="fade-up" data-aos-delay="100">
              To be recognized as a leading architecture firm known for
              sustainable, innovative, and functional designs.
            </p>
          </div>
          <div className="px-4">
            <h3 className="text-2xl font-semibold mb-2 text-black" data-aos="fade-up">Our Mission</h3>
            <p data-aos="fade-up" data-aos-delay="100">
              To deliver exceptional architectural solutions that exceed client
              expectations and contribute positively to communities.
            </p>
          </div>
        </div>
      </section>
      <section className="py-12 px-4">
        <h2 className="text-3xl font-bold mb-6 text-black" data-aos="fade-up">Our Core Values</h2>
        <ul className="grid md:grid-cols-3 gap-6">
          <li className="bg-black text-white p-6 rounded-lg shadow" data-aos="fade-up" data-aos-delay="50">
            <h4 className="font-semibold mb-2">Integrity</h4>
            <p>We uphold honesty and transparency in all our endeavors.</p>
          </li>
          <li className="bg-black text-white p-6 rounded-lg shadow" data-aos="fade-up" data-aos-delay="100">
            <h4 className="font-semibold mb-2">Innovation</h4>
            <p>We embrace creativity to deliver unique and impactful designs.</p>
          </li>
          <li className="bg-black text-white p-6 rounded-lg shadow" data-aos="fade-up" data-aos-delay="150">
            <h4 className="font-semibold mb-2">Excellence</h4>
            <p>We strive for the highest standards in every project we undertake.</p>
          </li>
        </ul>
      </section>
      <section className="py-12 px-4">
        <h2 className="text-3xl font-bold mb-4 text-black" data-aos="fade-up">Why Choose Us?</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li data-aos="fade-up" data-aos-delay="50">Over 14 years of proven professional experience</li>
          <li data-aos="fade-up" data-aos-delay="100">Client-centric and transparent approach</li>
          <li data-aos="fade-up" data-aos-delay="150">Expertise in sustainable architecture</li>
          <li data-aos="fade-up" data-aos-delay="200">Timely project delivery</li>
          <li data-aos="fade-up" data-aos-delay="250">A time- and cost-effective solution for Bokaro clients by reducing the need for frequent architect site visits</li>
          <li data-aos="fade-up" data-aos-delay="300">Same professional work quality as provided in metro cities</li>
        </ul>
      </section>
      {/* Google Reviews Section */}
      <section className="py-12 px-4">
        <h2 className="text-3xl font-bold mb-6 text-black text-center" data-aos="fade-up">Google Reviews</h2>
        <div className="max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mr-3">
                    <span className="text-yellow-800 font-bold text-lg">★</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Riddhi Siddhi Architect</h3>
                    <p className="text-gray-600 text-sm">Bokaro, Jharkhand</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-yellow-500">4.8</span>
                    <span className="text-gray-500 ml-1">/5</span>
                  </div>
                  <p className="text-sm text-gray-600">Based on Google Reviews</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-lg">Recent Reviews</h4>
                  <a
                    href="https://www.google.co.in/search?ibp=gwp;0,7&q=Riddhi+Siddhi+Architect&ludocid=13137533744041773407&lsig=AB86z5W832wdheo1m6AUvn4_wsOK#lkt=LocalPoiReviews&lpg=cid:CgIgAQ%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View All Reviews →
                  </a>
                </div>

                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-sm">★</span>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">5.0</span>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">
                      "Excellent work! Riddhi Siddhi Architect delivered exactly what we wanted. Professional team and timely completion."
                    </p>
                    <p className="text-xs text-gray-500">- Amit Kumar, 2 weeks ago</p>
                  </div>

                  <div className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-sm">★</span>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">5.0</span>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">
                      "Great experience working with Riddhi Siddhi Architect. They understood our requirements perfectly and delivered beyond expectations."
                    </p>
                    <p className="text-xs text-gray-500">- Priya Singh, 1 month ago</p>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(4)].map((_, i) => (
                          <span key={i} className="text-sm">★</span>
                        ))}
                        <span className="text-sm text-gray-300">★</span>
                      </div>
                      <span className="ml-2 text-sm text-gray-600">4.0</span>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">
                      "Good quality work and professional approach. Would recommend for architectural services."
                    </p>
                    <p className="text-xs text-gray-500">- Rajesh Verma, 2 months ago</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <a
                  href="https://www.google.co.in/search?ibp=gwp;0,7&q=Riddhi+Siddhi+Architect&ludocid=13137533744041773407&lsig=AB86z5W832wdheo1m6AUvn4_wsOK#lkt=LocalPoiReviews&lpg=cid:CgIgAQ%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <span className="mr-2">★</span>
                  Leave a Review on Google
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 bg-black text-white text-center" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
        <p className="mb-6">Contact our team today to schedule a consultation.</p>
        <a
          href="/menucontactus"
          className="inline-block bg-white text-black px-6 py-3 font-semibold rounded shadow hover:bg-gray-100"
        >
          Get in Touch
        </a>
      </section>
    </>
  );
};

export default AboutUs;
