import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import html2pdf from "html2pdf.js";

import Form from "./components/Form";
import ResumePreview from "./components/ResumePreview";
import AppHeader from "./components/AppHeader";
import Preview from "./Preview";

const DEFAULT_RESUME = {
  name: "",
  email: "",
  phone: "",
  location: "",
  photo: "",
  summary: "",
  sections: [],
  design: "modernBlue",
};

export default function App() {
  const [mobileView, setMobileView] = useState("edit");

  const [resume, setResume] = useState(() => {
    const saved = localStorage.getItem("resume-data");
    return saved
      ? { ...DEFAULT_RESUME, ...JSON.parse(saved) }
      : DEFAULT_RESUME;
  });

  useEffect(() => {
    localStorage.setItem("resume-data", JSON.stringify(resume));
  }, [resume]);

  /* =========================================
     FIXED PDF GENERATOR ("Ghost Mode")
     ========================================= */
  const downloadPDF = () => {
    const element = document.querySelector(".resume-page");
    if (!element) return;

    // 1. Create a container for the clean "Desktop" version
    const container = document.createElement("div");
    
    container.style.position = "fixed";
    container.style.top = "-9999px";
    container.style.left = "-9999px";
    container.style.zIndex = "-1";
    
    // FIX: Set width to 760px (Less than A4's 794px width) to prevent cutting
    container.style.width = "760px"; 
    
    // 2. Clone the resume
    const clone = element.cloneNode(true);
    clone.style.width = "100%"; // Fill the 760px container
    clone.style.height = "auto";
    clone.classList.remove("shadow-xl", "m-4", "my-8", "shadow"); // Clean styles
    
    container.appendChild(clone);
    document.body.appendChild(container);

    // 3. Generate PDF
    const opt = {
      margin: 0, 
      filename: `${resume.name.replace(/\s+/g, '_')}_Resume.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        logging: false 
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf()
      .set(opt)
      .from(clone)
      .save()
      .then(() => {
        document.body.removeChild(container);
      });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <AppHeader
              mobileView={mobileView}
              setMobileView={setMobileView}
              onPreview={() => window.open("/preview", "_blank")}
              onDownloadPDF={downloadPDF}
            />

            <main className="max-w-6xl mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {(mobileView === "edit" || window.innerWidth >= 768) && (
                <Form resume={resume} setResume={setResume} />
              )}

              {(mobileView === "preview" || window.innerWidth >= 768) && (
                <div className="md:sticky md:top-20 md:self-start md:h-[calc(100vh-6rem)] md:overflow-y-auto">
                  <ResumePreview resume={resume} />
                </div>
              )}
            </main>
          </>
        }
      />

      <Route path="/preview" element={<Preview />} />
    </Routes>
  );
}