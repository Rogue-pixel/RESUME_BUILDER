import ResumePreview from "./components/ResumePreview";

export default function Preview() {
  const resume = JSON.parse(localStorage.getItem("resume-data") || "{}");

  return (
    <div className="min-h-screen bg-gray-100">
      <ResumePreview resume={resume} />
    </div>
  );
}
