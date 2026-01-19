import { useState } from "react";
import Form from "./components/Form";
import ResumePreview from "./components/ResumePreview";

function App() {
  const [resume, setResume] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <Form resume={resume} setResume={setResume} />
        <ResumePreview resume={resume} />
      </div>
    </div>
  );
}

export default App;
