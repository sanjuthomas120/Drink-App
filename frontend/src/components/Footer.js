import { Facebook, Instagram, Mail, MapPin, PhoneCall, Twitter, Youtube } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
    <div className="h-[582px] md:h-72 bg-black grid grid-cols-1 md:grid-cols-3 md:gap-4 px-4 md:p-4 md:place-items-center pt-16 md:px-24">
      <div className="w-full md:w-[373px] h-[134px] border-[1px] border-white border-opacity-75 rounded-[15px] font-oswald flex flex-col items-center justify-center gap-2 order-2 md:order-1">
        <p className="text-secondary font-[500] text-[16px] tracking-[3%] uppercase">
          Connect with us
        </p>
        <div className="flex flex-col justify-center items-center gap-2">
            <div className="flex gap-2 items-center">
        <PhoneCall color="#aa9d18" size={18} /> <span className="text-white opacity-75">+91 9567843340</span>
            </div>
            <div className="flex gap-2 items-center">
            <Mail color="#aa9d18" /> <span className="text-white opacity-75">info@deepnetsoft.com</span>
            </div>
        </div>
      </div>
      <div className="w-full md:w-[373px] h-[134px] border-[1px] border-white border-opacity-75 rounded-[15px] order-1 md:order-2">
        <div className="md:ml-[64px] lg:ml-0 flex justify-center items-center relative -mt-[22px] md:-mt-[38px] gap-2">
          <img
            src="/images/logo/Logo.png"
            alt="logo"
            className="w-[50px] h-[44px] md:w-[86px] md:h-[76px]"
          />
        </div>
        <div className="flex justify-center items-start w-full font-oswald text-[30px] font-[400] ">
          <h3 className="text-white">
            <span className="text-secondary">DEEP</span> NET{" "}
            <span className="text-[#857878]">SOFT</span>
          </h3>
        </div>
        <div className="flex gap-4  justify-center items-center">
            <Facebook color="#ffffff" size={14} className="opacity-75" />
            <Twitter color="#ffffff" size={14} className="opacity-75" />
            <Youtube color="#ffffff" size={14} className="opacity-75" />
            <Instagram color="#ffffff" size={14} className="opacity-75" />
          </div>
      </div>
      <div className="w-full md:w-[373px] h-[134px] border-[1px] border-white border-opacity-75 rounded-[15px] order-3 md:order-3">
        <div className="w-full md:w-[373px] h-[134px] border-[1px] border-white border-opacity-75 rounded-[15px] font-oswald flex flex-col items-center justify-center gap-2">
          <p className="text-secondary font-[500] text-[16px] tracking-[3%] uppercase">
            Find us
          </p>
          <div className="flex gap-2 items-center px-10">
        <MapPin color="#aa9d18" size={18} /> <span className="text-white  opacity-75 text-center flex-wrap">First floor, Geo infopark, Infopark EXPY, Kakkanad</span>
            </div>
        </div>
      </div>
    </div>
    <div className="h-45 flex flex-col md:flex-row justify-between items-center px-20 bg-primary py-1">
        <p className="text-white opacity-75 text-[10px] md:text-[16px]">&copy; {new Date().getFullYear()} Deepnetsoft Solutions. All rights reserved</p>
        <div className="flex space-x-4  text-[10px] md:text-[16px]">
            <Link to="/" className="decoration-secondary hover:underline text-white opacity-75">Terms & Conditions</Link>
            <Link to="/"  className="decoration-secondary hover:underline text-white opacity-75">PrivacyPolicy</Link>
        </div>
    </div>
    </div>
  );
}

export default Footer;
