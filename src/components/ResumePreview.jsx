export default function ResumePreview({ resume }) {
  return (
    <div className="bg-white p-8 rounded-lg shadow text-gray-900">
      <h1 className="text-2xl font-bold">{resume.name || "Your Name"}</h1>
      <p className="text-sm text-gray-600">
        {resume.email || "email@example.com"} •{" "}
        {resume.phone || "123-456-7890"}
      </p>

      <hr className="my-4" />

      <h2 className="text-lg font-semibold mb-1">Summary</h2>
      <p className="text-sm leading-relaxed text-gray-800">
        {resume.summary || "Your professional summary will appear here."}
      </p>
    </div>
  );
}
