import React from "react";
import { Viewer, Worker, SpecialZoomLevel } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const PdfViewer = ({ url }) => {
  const handleOpenInNewTab = () => {
    window.open(url, "_blank");
  };

  return (
    <div className="h-[100%] xl:w-[94%] 2xl:w-[69%] mt-16 overflow-auto flex flex-col items-end">
      <div className="my-4">
        <button
          onClick={handleOpenInNewTab}
          className="px-4 py-2 ml-2 font-medium text-[#FFAAAA] rounded hover:text-[#d66767]"
        >
          Open PDF in New Tab
        </button>
      </div>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer fileUrl={url} />
      </Worker>
    </div>
  );
};

export default PdfViewer;
