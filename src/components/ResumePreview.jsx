export default function ResumePreview({ resume }) {
  return (
    <div className="resume-page bg-white p-8 rounded-lg shadow text-gray-900">
      <button
        onClick={() => window.print()}
        className="no-print mb-4 text-sm text-blue-600 hover:underline"
      >
        Print / Save as PDF
      </button>

      <h1 className="text-2xl font-bold">
        {resume.name || "Your Name"}
      </h1>

      <p className="text-sm text-gray-600 mb-3">
        {resume.email || "email@example.com"}
        {resume.phone && ` • ${resume.phone}`}
      </p>

      {resume.summary && (
        <p className="text-sm mb-4">{resume.summary}</p>
      )}

      {resume.sections.map((section, i) => (
        <div key={i} className="mt-6">
          <h2 className="text-lg font-semibold mb-2">
            {section.title}
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {section.items.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
