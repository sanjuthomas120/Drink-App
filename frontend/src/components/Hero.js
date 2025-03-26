import React from "react";

function Hero(props) {
  return (
    <div
      style={{ backgroundImage: "url('/images/banner/rectangle-103.png')" }}
      className="h-[311px] w-full bg-cover bg-center"
    >
      <div className="flex justify-center items-center h-full max-w-6xl mx-auto">
        <div className="flex flex-col justify-center items-center relative  gap-2">
          <h1 className="text-[40px] md:text-[75px] uppercase font-oswald font-[600] text-white tracking-[0.03em] flex gap-2 relative">
              <span className="relative">
                <span className="absolute top-[2px] -left-[5px] text-[#800020] z-0 font-bold opacity-80">
                {props.title}
                </span>
                <span className="relative z-0 "> {props.title}</span>
              </span>
          </h1>
          <p className="px-4 md:px-[190px] font-kelly text-[#BBBBBB] font-[400] text-[16px] md:text-[18px] text-center">{props.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
