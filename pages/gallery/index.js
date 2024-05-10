import React, { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../../components/Navbar";
import Loading from "../loading";

const GalleryPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
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
      };

    
      fetchGalleryData().then(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 0);
      });
  }, []);

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
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
            <div className="grid grid-cols-4 gap-9 mt-12">
              {images.map((imageUrl, index) => (
                <div key={index} className="h-72 shadow-md cursor-pointer hover:scale-105 transition-all delay-50" onClick={() => openModal(imageUrl.attributes.images.data[0].attributes.url)}>
                  <img
                    src={imageUrl.attributes.images.data[0].attributes.url}
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative w-4/5 h-4/5 max-w-3xl max-h-3xl">
            <button className="absolute top-4 right-4 text-white text-2xl" onClick={closeModal}>
              &times;
            </button>
            <img src={selectedImage} alt="Selected Image" className="object-contain w-full h-full " />
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
