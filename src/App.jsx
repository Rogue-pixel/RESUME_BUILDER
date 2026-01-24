import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import ResumePreview from "./components/ResumePreview";
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
  const [resume, setResume] = useState(() => {
    const saved = localStorage.getItem("resume-data");
    if (!saved) return DEFAULT_RESUME;

    const parsed = JSON.parse(saved);

    // 🔥 normalize design (THIS FIXES YOUR BUG)
    return {
      ...DEFAULT_RESUME,
      ...parsed,
      design: ["modernBlue", "charcoal"].includes(parsed.design)
        ? parsed.design
        : "modernBlue",
    };
  });

  useEffect(() => {
    localStorage.setItem("resume-data", JSON.stringify(resume));
  }, [resume]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form resume={resume} setResume={setResume} />

              <div className="sticky top-6 self-start h-[calc(100vh-3rem)] overflow-y-auto">
                <ResumePreview resume={resume} />
              </div>

            </div>
          </div>
        }
      />
      <Route path="/preview" element={<Preview />} />
    </Routes>
  );
}
