import { designs } from "../designs";

export default function ResumePreview({ resume }) {
  const theme = designs[resume.design] || designs.modernBlue;

  return (
    <div className="flex justify-center bg-gray-100 py-8">
      <div
        className={`resume-page bg-white shadow-lg ${theme.page}`}
        style={{ width: "850px" }}
      >
        {/* ================= HEADER (KEEP TOGETHER IN PRINT) ================= */}
        <div
          className={`${theme.headerBg} ${theme.headerText} p-6 resume-section`}
        >
          <div className="flex justify-between items-start">
            {/* Left: Photo + Name block */}
            <div className="flex items-start gap-4">
              {/* Photo (optional) */}
              {resume.photo && (
                <img
                  src={resume.photo}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border"
                />
              )}

              {/* Name + email + location */}
              <div>
                <h1 className={theme.name}>
                  {resume.name || "Your Name"}
                </h1>

                <p className="text-sm opacity-90 mt-1">
                  {resume.email || "email@example.com"}
                </p>

                {resume.location && (
                  <p className="text-sm opacity-80">
                    {resume.location}
                  </p>
                )}
              </div>
            </div>

            {/* Right: Phone only */}
            {resume.phone && (
              <p className="text-sm whitespace-nowrap mt-1">
                {resume.phone}
              </p>
            )}
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="p-8">
          {resume.summary && (
            <p className={`${theme.summary} resume-section`}>
              {resume.summary}
            </p>
          )}

          {resume.sections.map((section, i) => (
            <div
              key={i}
              className="mt-6 resume-section"
            >
              {/* Section header + separator */}
              <div className="mb-2">
                <h2 className={theme.sectionTitle}>
                  {section.title}
                </h2>
                <div className="h-px w-12 bg-current opacity-40"></div>
              </div>

              {/* Section bullets */}
              <ul className={theme.bullet}>
                {section.items.map(
                  (item, j) =>
                    item.trim() && <li key={j}>{item}</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
