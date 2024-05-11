import React, { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../../components/Navbar";
import Loading from "../loading";

const GalleryPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageHeader, setSelectedImageHeader] = useState(null);
  const [selectedImageContent, setSelectedImageContent] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
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
    console.log(image);
    console.log(selectedImage);
    console.log(selectedImageHeader);
    console.log(selectedImageContent);
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
          <div className="w-full font-Monstserrat xl:py-32 xl:px-24 h-screen">
            <span className="text-5xl font-bold ">Gallery</span>
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
          <div className="relative h-4/5 w-2/3 max-h-3xl bg-[#FAFAFA] shadow-xl rounded-xl text-black">
            <button
              className="absolute top-2 right-4 text-slate-500 text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <div className="flex justify-between">
              <img
                src={selectedImage}
                alt="Selected Image"
                className="object-contain w-full h-[80vh] p-6"
              />
              <div className="flex flex-col py-16 pr-3">
                <span className="text-3xl z-100 font-semibold">{selectedImageHeader}</span>
                <span className="text-lg mt-2 font-normal">{selectedImageContent}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
