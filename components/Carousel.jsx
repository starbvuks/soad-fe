// Carousel.js
import React, { useState, useEffect } from "react";
import { Spinner } from "@nextui-org/react";
import axios from "axios";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const url = process.env.NEXTAUTH_URL;
    const token = process.env.NEXT_PUBLIC_TOKEN;

    const fetchGalleryData = async () => {
      const res = await axios.get(
        "https://soad.alephinnovation.live/api/carousels?populate=*",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setGallery(res.data.data);
      setIsLoading(false);
    };

    fetchGalleryData();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === gallery.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? gallery.length - 1 : prevSlide - 1
    );
  };

  console.log(gallery);

  return (
    <div className="relative mx-auto overflow-hidden rounded-lg w-full h-28 lg:h-72 bg-white shadow-md">
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-full">
          <Spinner color="warning" size="lg" className="z-100" />
        </div>
      ) : (
        <div className=" w-full flex justify-center relative h-full">
          {gallery.map((item, index) => (
            <div
              key={index}
              className={`absolute lg:top-0 w-full h-full bg-white transition-transform duration-300 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="w-full justify-center text-black rounded-lg">
                <div className="absolute bottom-2 lg:bottom-6 right-0 flex items-center justify-between mx-5 gap-3">
                  {/* Left and Right arrows */}
                  <button
                    onClick={prevSlide}
                    className=" left-0 z-20 pb-1 lg:pb-0 flex items-center justify-center text-gray-300 transition hover:scale-110 lg:hover:text-red-200 focus:outline-none focus:bg-opacity-50"
                  >
                    <FaChevronCircleLeft className="w-4 h-4 lg:w-6 lg:h-6" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className=" right-0 z-20 pb-1 lg:pb-0 flex items-center justify-center text-gray-300 transition hover:scale-110 lg:hover:text-red-200 focus:outline-none focus:bg-opacity-50"
                  >
                    <FaChevronCircleRight className="w-4 h-4 lg:w-6 lg:h-6" />
                  </button>
                </div>

                <div className="flex w-[100%] justify-between h-28 lg:h-72">
                  <div className="w-[25%] relative">
                    <img
                      src={item.attributes.images.data[0].attributes.url}
                      className="h-full w-full rounded-none lg:rounded-sm bg-slate-100 object-cover"
                    />
                    <span className="absolute text-white text-lg text-center m-auto bottom-2 left-0 right-0 opacity-60 hidden lg:block">
                      {item.attributes.title1}
                    </span>
                  </div>
                  <div className="w-[25%] relative">
                    <img
                      src={item.attributes.images.data[1].attributes.url}
                      className="h-full w-full rounded-none lg:rounded-sm bg-slate-100 object-cover"
                    />
                    <span className="absolute  text-white text-lg text-center m-auto bottom-2 left-0 right-0 opacity-60 hidden lg:block">
                      {item.attributes.title2}
                    </span>
                  </div>
                  <div className="w-[25%] relative">
                    <img
                      src={item.attributes.images.data[2].attributes.url}
                      className="h-full w-full rounded-none lg:rounded-sm bg-slate-100 object-cover"
                    />
                    <span className="absolute text-white text-lg text-center m-auto bottom-2 left-0 right-0 opacity-60 hidden lg:block">
                      {item.attributes.title3}
                    </span>
                  </div>
                  <div className="w-[25%] relative">
                    <img
                      src={item.attributes.images.data[3].attributes.url}
                      className="h-full w-full rounded-none lg:rounded-sm bg-slate-100 object-cover"
                    />
                    <span className="absolute text-white text-lg text-center m-auto bottom-2 left-0 right-0 opacity-60 hidden lg:block">
                      {item.attributes.title4}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
