import { designs } from "../designs";

export default function Form({ resume, setResume }) {
  const handleBasicChange = (e) => {
    setResume({ ...resume, [e.target.name]: e.target.value });
  };

  /* =======================
     SECTION HELPERS
     ======================= */
  const moveSectionUp = (index) => {
    if (index === 0) return;
    const sections = [...resume.sections];
    [sections[index - 1], sections[index]] = [
      sections[index],
      sections[index - 1],
    ];
    setResume({ ...resume, sections });
  };

  const moveSectionDown = (index) => {
    if (index === resume.sections.length - 1) return;
    const sections = [...resume.sections];
    [sections[index], sections[index + 1]] = [
      sections[index + 1],
      sections[index],
    ];
    setResume({ ...resume, sections });
  };

  const addSection = (title) => {
    setResume({
      ...resume,
      sections: [...resume.sections, { title, items: [""] }],
    });
  };

  const updateSectionTitle = (index, value) => {
    const sections = [...resume.sections];
    sections[index].title = value;
    setResume({ ...resume, sections });
  };

  const updateItem = (sectionIndex, itemIndex, value) => {
    const sections = [...resume.sections];
    sections[sectionIndex].items[itemIndex] = value;
    setResume({ ...resume, sections });
  };

  const addItem = (sectionIndex) => {
    const sections = [...resume.sections];
    sections[sectionIndex].items.push("");
    setResume({ ...resume, sections });
  };

  const removeItem = (sectionIndex, itemIndex) => {
    const sections = [...resume.sections];
    sections[sectionIndex].items.splice(itemIndex, 1);
    setResume({ ...resume, sections });
  };

  const removeSection = (index) => {
    const sections = [...resume.sections];
    sections.splice(index, 1);
    setResume({ ...resume, sections });
  };

  /* =======================
     UI
     ======================= */

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow no-print space-y-4">
      {/* Basic info */}
      <input
        name="name"
        placeholder="Full Name"
        value={resume.name}
        onChange={handleBasicChange}
        className="w-full border p-3 rounded bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition"
      />
      
      {/* Photo Upload */}
      <div className="flex items-center gap-4 p-3 border border-dashed rounded bg-gray-50">
        <div className="flex-1">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
            Profile Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => {
                setResume({ ...resume, photo: reader.result });
              };
              reader.readAsDataURL(file);
            }}
            className="w-full text-sm text-gray-600"
          />
        </div>
        {resume.photo && (
          <button
            onClick={() => setResume({ ...resume, photo: "" })}
            className="text-xs text-red-600 font-medium bg-white px-2 py-1 border rounded shadow-sm"
          >
            Remove
          </button>
        )}
      </div>

      <input
        name="email"
        placeholder="Email"
        value={resume.email}
        onChange={handleBasicChange}
        className="w-full border p-3 rounded"
      />

      <input
        name="location"
        placeholder="City, Country"
        value={resume.location}
        onChange={handleBasicChange}
        className="w-full border p-3 rounded"
      />

      <input
        name="phone"
        placeholder="Phone Number"
        value={resume.phone}
        onChange={handleBasicChange}
        className="w-full border p-3 rounded"
      />

      

      <textarea
        name="summary"
        placeholder="Professional Summary"
        value={resume.summary}
        onChange={handleBasicChange}
        rows={4}
        className="w-full border p-3 rounded"
      />

      {/* =======================
          DESIGN PICKER
         ======================= */}
      <div>
        <p className="text-sm font-semibold mb-2">Resume Design</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {Object.entries(designs).map(([key, design]) => {
            const isActive = resume.design === key;
            return (
              <button
                key={key}
                onClick={() => setResume({ ...resume, design: key })}
                className={`border rounded p-3 text-left transition
                  ${isActive ? "ring-2 ring-black bg-gray-50" : "hover:bg-gray-50"}
                `}
              >
                <div className={`h-2 rounded mb-2 ${design.headerBg}`} />
                <p className="text-sm font-medium">{design.label}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* =======================
          ADD SECTION BUTTONS
         ======================= */}
      <div className="flex flex-wrap gap-2 pt-2 border-t mt-4">
        {["Experience", "Projects", "Education", "Skills"].map((title) => (
          <button
            key={title}
            onClick={() => addSection(title)}
            className="text-sm px-3 py-1.5 border border-gray-300 rounded-full hover:bg-black hover:text-white transition"
          >
            + {title}
          </button>
        ))}
      </div>

      {/* =======================
          SECTIONS LIST
         ======================= */}
      <div className="space-y-4">
        {resume.sections.map((section, sIndex) => (
          <div key={sIndex} className="border border-gray-300 rounded p-3 sm:p-4 bg-gray-50/50">
            
            {/* Section Header */}
            <div className="flex items-center gap-2 mb-3">
              {/* FIX: w-24 forces the input to be small on mobile so buttons fit. 
                  sm:flex-1 lets it grow on desktop.
              */}
              <input
                value={section.title}
                onChange={(e) => updateSectionTitle(sIndex, e.target.value)}
                className="w-24 sm:flex-1 border border-gray-300 p-2 rounded font-bold text-gray-800 focus:w-full transition-all duration-300"
              />

              {/* Controls - Kept exactly as they were, but they will fit now */}
              <div className="flex items-center bg-white border border-gray-300 rounded overflow-hidden shrink-0">
                <button
                  onClick={() => moveSectionUp(sIndex)}
                  disabled={sIndex === 0}
                  className="px-2 py-2 hover:bg-gray-100 disabled:opacity-30 border-r border-gray-200"
                  title="Move up"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveSectionDown(sIndex)}
                  disabled={sIndex === resume.sections.length - 1}
                  className="px-2 py-2 hover:bg-gray-100 disabled:opacity-30 border-r border-gray-200"
                  title="Move down"
                >
                  ↓
                </button>
                <button
                  onClick={() => removeSection(sIndex)}
                  className="px-2 py-2 text-red-600 hover:bg-red-50 text-xs font-medium"
                  title="Remove Section"
                >
                  Remove
                </button>
              </div>
            </div>

            {/* Bullet items */}
            <div className="space-y-2">
              {section.items.map((item, iIndex) => (
                <div key={iIndex} className="flex items-start gap-2">
                  <span className="pt-2 text-gray-400">•</span>
                  <textarea
                    value={item}
                    onChange={(e) => updateItem(sIndex, iIndex, e.target.value)}
                    rows={2}
                    className="flex-1 border p-2 rounded text-sm"
                  />
                  <button
                    onClick={() => removeItem(sIndex, iIndex)}
                    className="text-red-500 hover:text-red-600 pt-2 px-1"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Add bullet */}
            <button
              onClick={() => addItem(sIndex)}
              className="mt-2 text-sm text-blue-600 font-medium hover:underline"
            >
              + Add Item
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}