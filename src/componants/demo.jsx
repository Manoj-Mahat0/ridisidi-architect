<div className="lg:mx-28 md:mx-5 sm:mx-4 sm:pt-14 mb-10">

  <p className="font-light text-center lg:mx-32 tracking-wide">{item.para}</p>

  <div className="flex items-center justify-center gap-3 mt-7">
    <a 
      href={item.Brochure} // Assuming this is the correct path to the brochure PDF
      download
      className="py-2 lg:px-12 md:px-11 px-8 bg-[#f85b13] rounded-[50px] flex items-center justify-center gap-5"
    >
      <div className="text-white font-light opacity-85">
        Brochure
        <FaDownload className="text-lg" />
      </div>
    </a>
  </div>

  <div className="mt-12">
    <img src={item.lastimg} />
  </div>

</div>
