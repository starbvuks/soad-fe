// Carousel.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const url = process.env.NEXTAUTH_URL;
    const token = process.env.NEXT_PUBLIC_TOKEN;

    const fetchGalleryData = async () => {
      const res = await axios.get(
        "https://soad.alephinnovation.live/api/galleries?populate=*",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setGallery(res.data.data)
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

  console.log(gallery)

  return (
    <div className="relative mx-auto overflow-hidden rounded-lg w-full h-96 bg-white shadow-md">
      <div className="relative w-full h-full">
        {gallery.map((item, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full bg-white transition-transform duration-300 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 flex items-start justify-between text-black rounded-lg ">
              <div className="max-w-lg flex flex-col m-20 rounded-lg ">
                <h2 className="text-3xl font-semibold">{item.attributes.heading}</h2>
                <p className="mt-2">{item.attributes.content}</p>
                <div className="absolute bottom-8 right-0 flex items-center justify-between z-50 mx-10 gap-5">
                  {/* Left and Right arrows */}
                  <button
                    onClick={prevSlide}
                    className=" left-0 z-20 w-6 h-6 bg-white bg-opacity-75 rounded-full flex items-center justify-center text-gray-800 hover:bg-opacity-50 focus:outline-none focus:bg-opacity-50"
                  >
                    &larr;
                  </button>
                  <button
                    onClick={nextSlide}
                    className=" right-0 z-20 w-6 h-6 bg-white bg-opacity-75 rounded-full flex items-center justify-center text-gray-800 hover:bg-opacity-50 focus:outline-none focus:bg-opacity-50"
                  >
                    &rarr;
                  </button>
                </div>
              </div>
              <img src={item.attributes.image.data[0].attributes.url} className="h-full min-w-[60%] object-cover rounded-sm bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
