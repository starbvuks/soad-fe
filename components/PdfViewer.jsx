import React, { useState } from "react";
import { Viewer, Worker, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { Spinner } from "@nextui-org/react";

const PdfViewer = ({ url }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleOpenInNewTab = () => {
    window.open(url, "_blank");
  };

  const handleDocumentLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-start mt-16 h-full">
      <div className="">
        <button
          onClick={handleOpenInNewTab}
          className="p-2 bg-slate-100 border-slate-300 border-2 text-xs lg:text-base rounded-lg mb-3 font-medium text-slate-500 rounded transition hover:text-slate-700 hover:border-slate-600"
        >
          Open PDF in New Tab
        </button>
      </div>
      <div className="w-full relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
            <Spinner color="primary" size="lg" className="z-100 pt-6" />
          </div>
        )}
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <div className="lg:w-[90%] h-full">
            <Viewer
              fileUrl={url}
              defaultScale={SpecialZoomLevel.PageFit}
              onDocumentLoad={handleDocumentLoad}
            />
          </div>
        </Worker>
      </div>
    </div>
  );
};

export default PdfViewer;