import { Viewer, Worker, SpecialZoomLevel } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const PdfViewer = ({ url }) => {
  return (
    <div className="h-[100%] xl:w-[94%] 2xl:w-[69%] mt-16 overflow-auto flex flex-col items-start">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer fileUrl={url} />
      </Worker>
    </div>
  );
};

export default PdfViewer;
