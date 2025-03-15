import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { FaChevronLeft } from "react-icons/fa";

import Navbar from "../../components/Navbar";
import Loading from "../loading";

const GalleryPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageHeader, setSelectedImageHeader] = useState(null);
  const [selectedImageContent, setSelectedImageContent] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_TOKEN;

    const fetchGalleryData = async () => {
      const res = await axios.get(
        "https://admin.soad.co.in/api/galleries?populate=*&pagination[start]=0&pagination[limit]=50&sort[createdAt]=desc",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setImages(res.data.data);
      console.log(res.data.data[0].attributes.header);
    };

    fetchGalleryData().then(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 0);
    });
  }, []);

  const openModal = (image) => {
    setSelectedImage(image.attributes.images.data[0].attributes.url);
    setSelectedImageHeader(image.attributes.header);
    setSelectedImageContent(image.attributes.content);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Navbar />
          <div className="w-full font-Outfit py-24 lg:py-32 px-6 lg:px-24 h-screen">
            <div className="flex items-center">
              <button
                className="mr-2 lg:mr-4 mb-2 lg:mb-0 text-4xl transition lg:text-3xl hover:text-red-400"
                onClick={() => router.back()}
              >
                <FaChevronLeft />
              </button>
              <span className="text-3xl lg:text-5xl font-bold">Gallery</span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-12 mt-3 lg:mt-12">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="h-44 lg:h-64 shadow-lg cursor-pointer hover:scale-105 transition-all delay-50"
                  onClick={() => openModal(image)}
                >
                  <img
                    src={image.attributes.images.data[0].attributes.url}
                    alt={`Gallery Image ${index + 1}`}
                    className="object-cover border-1 border-slate-400 lg:border-0 lg:object-contain overflow-hidden h-full w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 tracking-tight">
          <div className="relative h-2/3 lg:h-4/5 mx-12 lg:mx-32 lg:max-h-3xl bg-[#FAFAFA] shadow-xl rounded-xl text-black ">
            <button
              className="absolute top-2 right-4 bg-black lg:bg-white rounded-full px-2 lg:px-0 text-white lg:text-slate-500 hover:text-slate-800 text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <div className="flex flex-col lg:flex-row justify-start">
              <img
                src={selectedImage}
                alt="Selected Image"
                className="object-contain lg:object-cover rounded-t-md rounded-b-none lg:rounded-l-md lg:rounded-tr-none lg:w-2/3 lg:h-[80vh]"
              />
              <div className="overflow-y-auto flex flex-col lg:py-16 px-8 lg:w-1/2">
                <span className="text-lg lg:text-3xl z-100 font-semibold mt-6 lg:mt-0">
                  {selectedImageHeader}
                </span>
                <span className="text-sm lg:text-lg mt-2 font-normal">
                  {selectedImageContent}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
