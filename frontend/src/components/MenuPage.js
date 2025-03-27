import React, { useEffect, useState } from "react";
import AddMenuModal from "./AddMenuModal";
import { Plus } from "lucide-react";
import AddMenuItemModal from "./AddMenuItemModal";
import API from "../api";

function MenuPage() {
  const [isAddMenuModalOpen, setIsAddMenuModalOpen] = useState(false);
  const [isAddMenuItemModalOpen, setIsAddMenuItemModalOpen] = useState(false);
  const [menus, setMenus] = useState([]);
  const [menuLoading, setMenuLoading] = useState(true);
  const [menuItemLoading, setMenuItemLoading] = useState(true);
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    fetchMenus();
  }, []);
  useEffect(() => {
    if (selectedMenuId !== null) {
      setCurrentPage(1);
    }
  }, [selectedMenuId]);
  useEffect(() => {
    if (selectedMenuId !== null) {
      fetchMenuItems(selectedMenuId, currentPage);
    }
  }, [selectedMenuId, currentPage, isAddMenuItemModalOpen]);
  const fetchMenus = async () => {
    setMenuLoading(true);
    try {
      const response = await API.get("/menus");
      if (response.data?.success && Array.isArray(response.data.data)) {
        const fetchedMenus = response.data.data;
        console.log("Fetched menus:", fetchedMenus);
        setMenus(fetchedMenus);
        if (fetchedMenus.length > 0) {
          setSelectedMenuId(fetchedMenus[0]._id);
        }
      } else {
        setMenus([]);
      }
    } catch (error) {
      console.error("Error fetching menus:", error);
    }
    setMenuLoading(false);
  };

  const fetchMenuItems = async (menuId, page) => {
    setMenuItemLoading(true);
    try {
      const response = await API.get(`/menus/${menuId}/items`, {
        params: { page, limit: itemsPerPage },
      });
      if (response.data?.success && Array.isArray(response.data.data)) {
        setMenuItems(response.data.data);
        setTotalItems(response.data.totalItems);
      } else {
        setMenuItems([]);
        setTotalItems(0);
      }
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
    setMenuItemLoading(false);
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(totalItems / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div>
      <div
        style={{ backgroundImage: "url('/images/banner/Rectangle 107.png')" }}
        className="h-min-[79px] py-4 w-full bg-cover bg-center flex flex-wrap gap-1 justify-center items-center relative "
      >
        {menuLoading ? (
          <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        ) : menus.length === 0 ? (
          <div className="text-white text-center font-oswald text-lg md:text-xl">
            No menus found
          </div>
        ) : (
          menus.map((button, index) => (
            <button
              key={index}
              className={`font-oswald text-[12px] md:text-[16px] font-[600] w-[70px] h-[30px]  md:w-[114.25px] md:h-[49.98px] border-[0.32px] border-secondary text-white uppercase mx-2 tracking-[3%] ${
                selectedMenuId === button._id
                  ? "bg-secondary"
                  : "bg-black opacity-80"
              }`}
              onClick={() => setSelectedMenuId(button._id)}
            >
              {button.name}
            </button>
          ))
        )}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsAddMenuModalOpen(true)}
            className="font-oswald text-[12px] md:text-[16px] font-[600] w-full h-[30px] px-2 md:w-[114.25px] md:h-[49.98px] border-[0.32px] border-secondary text-white uppercase mx-2 tracking-[3%] bg-black opacity-80"
          >
            <div className="flex gap-2 items-center">
              <Plus size={16} /> Add Menu
            </div>
          </button>
        </div>
        <AddMenuModal
          className="z-30"
          isOpen={isAddMenuModalOpen}
          onClose={() => setIsAddMenuModalOpen(false)}
          onMenuAdded={fetchMenus}
        />
      </div>
      <div
        style={{ backgroundImage: "url('/images/banner/Rectangle 116.png')" }}
        className="h-[535px] md:h-[672px] w-full bg-cover bg-center flex justify-center items-center relative"
      >
        <div
          style={{ backgroundImage: "url('/images/frames/Frame.png')" }}
          className="hidden md:block md:absolute w-[299px] top-8 h-[641px] bg-left left-0 bg-no-repeat"
        ></div>
        <div
          style={{ backgroundImage: "url('/images/frames/Frame-2.png')" }}
          className="hidden md:block md:absolute w-[288px] top-8 h-[610px] right-0 bg-no-repeat bg-right"
        ></div>
        <div className="w-[361px] h-[446px] md:w-[1140px] md:h-[416px] border-[1px] border-white relative">
          <div className="absolute w-[74px] h-[81px] md:-top-36 md:-left-[60px] md:w-[190px] md:h-[281px]">
            <img
              src="/images/decoration/image 39  1.png"
              alt="juice"
              className="w-full h-full"
            />
          </div>
          <div className="absolute w-[74px] h-[81px] bottom-0 right-0 md:-bottom-10 md:-right-1 md:w-[192px] md:h-[207px]">
            <img
              src="/images/decoration/cocktail1 1.png"
              alt="cocktail"
              className="w-full h-full"
            />
          </div>
          <div className="flex justify-center items-center md:mt-4 md:mb-16  gap-4">
            <div className="border-[1.5px] w-[50px] md:border-[3px] md:w-[68px] ml-4 mt-3 md:mt-6 rounded-md border-[#857878]"></div>
            <div className="text-[30px] md:text-[50px] flex-wrap text-center md:text-nowrap md:flex-nowrap w-[140px] md:w-[428px] uppercase font-oswald font-[600] text-white md:tracking-[0.03em] leading-[35px] md:leading-none flex justify-center pt-4 gap-2 relative">
              <span className="relative">
                <span className="absolute top-[2px] -left-[4px] text-[#800020] font-bold opacity-80">
                  BRUNCH COCKTAILS
                </span>
                <span className="relative">BRUNCH COCKTAILS</span>
              </span>
            </div>
            <div className="border-[1.5px] w-[50px] md:border-[3px] md:w-[68px] mt-6 rounded-md border-[#857878]"></div>{" "}
            <div className="flex justify-end  md:p-4">
              <button
                onClick={() => setIsAddMenuItemModalOpen(true)}
                className="font-oswald text-[10px] md:text-[16px]  md:font-[600] w-full h-[44px] md:px-2 md:w-[114.25px] md:h-[49.98px] border-[0.32px] border-secondary text-white uppercase mx-2 tracking-[3%] bg-black opacity-80"
              >
                <div className="flex gap-2 items-center">
                  <Plus size={16} /> Add Menu Item
                </div>
              </button>
            </div>
            <AddMenuItemModal
              className="z-30"
              isOpen={isAddMenuItemModalOpen}
              onClose={() => setIsAddMenuItemModalOpen(false)}
              menuId={selectedMenuId}
              onMenuItemAdded={fetchMenuItems}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-4 md:mt-8">
            {menuItemLoading ? (
              <div className="md:w-16 md:h-16 w-8 h-8 p-4 mb-4 m-auto border-4 border-t-transparent border-white rounded-full animate-spin"></div>
            ) : menuItems.length === 0 ? (
              <div className="text-white text-center font-oswald text-lg md:text-xl">
                No menus items found
              </div>
            ) : (
              menuItems.map((item, index) => (
                <div
                  key={index}
                  className="text-white text-start mb-4 mx-10  md:mx-20"
                >
                  <div className="flex justify-between items-center w-full text-[16px] md:text-[26px] tracking-[3%] uppercase font-[400] font-oswald relative">
                    <span className="whitespace-nowrap">{item.name}</span>
                    <span className="flex-grow mt-5 border-[3px] border-b border-dotted border-white"></span>
                    <span className="text-white whitespace-nowrap">
                      ${item.price}
                    </span>
                  </div>
                  <p className="text-sm md:text-base text-white opacity-75 font-kelly font-[400] line-clamp-2">
                    {item.description}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="absolute md:bottom-[60px] md:right-60  flex justify-center items-center w-full md:w-40 mt-1 -ml-4 gap-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-2 py-1 md:px-4 md:py-2  text-white border font-kelly ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-secondary"
              }`}
            >
              Previous
            </button>

            <button
              onClick={nextPage}
              disabled={currentPage >= Math.ceil(totalItems / itemsPerPage)}
              className={`px-2 py-1 md:px-4 md:py-2  text-white border font-kelly ${
                currentPage >= Math.ceil(totalItems / itemsPerPage)
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-secondary"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuPage;
