import ResumePreview from "./components/ResumePreview";

export default function Preview() {
  const saved = localStorage.getItem("resume-data");
  const resume = saved ? JSON.parse(saved) : null;

  if (!resume) {
    return <p className="p-6">No resume data found.</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center py-8">
      <ResumePreview resume={resume} />
    </div>
  );
}
