import { designs } from "../designs";

export default function ResumePreview({ resume }) {
  const theme = designs[resume.design] || designs.modernBlue;

  return (
    <div className="flex justify-center bg-gray-100 py-4 sm:py-8">
      <div
        className={`resume-page bg-white shadow ${theme.page} w-full md:w-[800px] print:w-full print:shadow-none`}
      >
        {/* ================= HEADER ================= */}
        <div className={`${theme.headerBg} ${theme.headerText} p-6`}>
          <div className="flex flex-row justify-between items-start gap-4">

            {/* Left: Photo + Name block */}
            {/* REMOVED 'truncate' and added 'break-words' */}
            <div className="flex items-start gap-3 flex-1">
              {resume.photo && (
                <img
                  src={resume.photo}
                  alt="Profile"
                  className="w-14 h-14 sm:w-20 sm:h-20 rounded-full object-cover border shrink-0"
                />
              )}

              <div className="flex-1 min-w-0">
                <h1 className={`${theme.name} text-lg sm:text-2xl font-bold break-words leading-tight`}>
                  {resume.name || "Your Name"}
                </h1>

                {resume.email && (
                  <p className="text-sm mt-1 break-words opacity-90">
                    {resume.email}
                  </p>
                )}

                {resume.location && (
                  <p className="text-sm break-words opacity-90">
                    {resume.location}
                  </p>
                )}
              </div>
            </div>

            {/* Right: Phone */}
            {resume.phone && (
              <div className="shrink-0 text-right">
                <p className="text-sm font-medium whitespace-nowrap">
                  {resume.phone}
                </p>
              </div>
            )}
          </div>
        </div>


        {/* ================= CONTENT ================= */}
        <div className="p-6">
          {/* Summary */}
          {resume.summary && (
            <p className={`${theme.summary} resume-section whitespace-pre-line`}>
              {resume.summary}
            </p>
          )}

          {/* Sections */}
          {resume.sections?.map((section, sIndex) => (
            <div
              key={sIndex}
              className="mt-6 resume-section"
            >
              {/* Section title */}
              <div className="mb-2">
                <h2 className={theme.sectionTitle}>
                  {section.title}
                </h2>
                <div className="h-px w-12 bg-current opacity-40"></div>
              </div>

              {/* Bullet points */}
              <ul className={theme.bullet}>
                {section.items.map(
                  (item, iIndex) =>
                    item.trim() && (
                      <li key={iIndex} className="break-words">{item}</li>
                    )
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}