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
          className="p-2 bg-slate-100 border-slate-300 border-2 rounded-lg mb-3 font-medium text-slate-500 rounded transition hover:text-slate-700 hover:border-slate-600"
        >
          Open PDF in New Tab
        </button>
      </div>
      <div className="w-full">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <div className="w-[90%] h-full">
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
