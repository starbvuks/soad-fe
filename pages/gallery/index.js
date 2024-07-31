import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

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
        "https://soad.alephinnovation.live/api/galleries?populate=*&pagination[start]=0&pagination[limit]=50&sort[createdAt]=desc",
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
          <div className="w-full font-Monstserrat lg:py-32 lg:px-24 h-screen">
            <div className="flex items-center">
              <button className="mr-4 text-2xl" onClick={() => router.back()}>
                &larr;
              </button>
              <span className="text-5xl font-bold">Gallery</span>
            </div>
            <div className="grid grid-cols-4 gap-12 mt-12">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="h-64 shadow-lg cursor-pointer hover:scale-105 transition-all delay-50"
                  onClick={() => openModal(image)}
                >
                  <img
                    src={image.attributes.images.data[0].attributes.url}
                    alt={`Gallery Image ${index + 1}`}
                    className="object-contain overflow-hidden h-full w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 font-WorkSans tracking-tight">
          <div className="relative h-4/5 mx-32 max-h-3xl bg-[#FAFAFA] shadow-xl rounded-xl text-black ">
            <button
              className="absolute top-2 right-4 text-slate-500 hover:text-slate-800 text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <div className="flex justify-start">
              <img
                src={selectedImage}
                alt="Selected Image"
                className="object-cover rounded-md w-2/3 h-[80vh]"
              />
              <div className="flex flex-col py-16 px-8 w-1/2">
                <span className="text-3xl z-100 font-semibold">
                  {selectedImageHeader}
                </span>
                <span className="text-lg mt-2 font-normal">
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
