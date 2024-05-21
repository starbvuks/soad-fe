import React from "react";
import { Viewer, Worker, SpecialZoomLevel } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css";

const PdfViewer = ({ url }) => {
  const handleOpenInNewTab = () => {
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col items-start mt-16 h-full">
      <div className="">
        <button
          onClick={handleOpenInNewTab}
          className="py-2 font-medium text-[#FFAAAA] rounded hover:text-[#d66767]"
        >
          Open PDF in New Tab
        </button>
      </div>
      <div className="flex-1 w-full overflow-hidden">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <div className="w-4/5 xl:w-[50%] h-full">
            <Viewer
              fileUrl={url}
              defaultScale={SpecialZoomLevel.PageFit}
            />
          </div>
        </Worker>
      </div>
    </div>
  );
};

export default PdfViewer;
