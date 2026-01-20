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

      <p className="text-sm text-gray-600">
        {resume.email || "email@example.com"}
        {resume.phone && ` • ${resume.phone}`}
      </p>

      {resume.summary && (
        <>
          <hr className="my-4" />
          <p className="text-sm">{resume.summary}</p>
        </>
      )}

      {resume.sections.map((section, i) => (
        <div key={i} className="mt-6">
          <h2 className="text-lg font-semibold">
            {section.title}
          </h2>

          {section.items.map((item, j) => (
            <div key={j} className="mt-2 text-sm">
              {section.fields.map((field) => (
                <p key={field}>
                  <span className="font-medium">{field}:</span>{" "}
                  {item[field]}
                </p>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
