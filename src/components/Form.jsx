export default function Form({ resume, setResume }) {
  const deleteSection = (index) => {
    const updated = resume.sections.filter((_, i) => i !== index);
    setResume({ ...resume, sections: updated });
  };

  const deleteItem = (sectionIndex, itemIndex) => {
    const updated = [...resume.sections];
    updated[sectionIndex].items = updated[sectionIndex].items.filter(
      (_, i) => i !== itemIndex
    );
    setResume({ ...resume, sections: updated });
  };

  const moveSection = (from, to) => {
    if (to < 0 || to >= resume.sections.length) return;

    const updated = [...resume.sections];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);

    setResume({ ...resume, sections: updated });
  };

  const handleBasicChange = (e) => {
    const { name, value } = e.target;
    setResume({ ...resume, [name]: value });
  };

  const addSection = () => {
    setResume({
      ...resume,
      sections: [
        ...resume.sections,
        {
          title: "",
          fields: [],
          items: [],
        },
      ],
    });
  };

  const updateSection = (index, key, value) => {
    const updated = [...resume.sections];
    updated[index][key] = value;
    setResume({ ...resume, sections: updated });
  };

  const setFields = (index, value) => {
    const fields = value
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);

    const updated = [...resume.sections];
    updated[index].fields = fields;
    updated[index].items = [];
    setResume({ ...resume, sections: updated });
  };

  const addItem = (sectionIndex) => {
    const updated = [...resume.sections];
    const item = {};
    updated[sectionIndex].fields.forEach((f) => (item[f] = ""));
    updated[sectionIndex].items.push(item);
    setResume({ ...resume, sections: updated });
  };

  const updateItem = (sectionIndex, itemIndex, field, value) => {
    const updated = [...resume.sections];
    updated[sectionIndex].items[itemIndex][field] = value;
    setResume({ ...resume, sections: updated });
  };

  return (
  <div className="no-print bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Resume Details</h2>


      {/* Basic Info */}
      <div className="space-y-3 mb-6">
        <input
          name="name"
          placeholder="Full Name"
          value={resume.name}
          onChange={handleBasicChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="email"
          placeholder="Email"
          value={resume.email}
          onChange={handleBasicChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="phone"
          placeholder="Phone"
          value={resume.phone}
          onChange={handleBasicChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="summary"
          placeholder="Professional Summary"
          rows="3"
          value={resume.summary}
          onChange={handleBasicChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <hr className="my-6" />

      {/* Sections */}
      <button
        onClick={addSection}
        className="text-sm text-blue-600 hover:underline mb-4"
      >
        + Add Section
      </button>


      {resume.sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="border p-4 rounded mb-6">
          <button
            onClick={() => deleteSection(sectionIndex)}
            className="text-xs text-red-500 hover:underline"
          >
            Delete Section
          </button>
          <div className="flex gap-3 text-xs mb-2">
            <button
              onClick={() => moveSection(sectionIndex, sectionIndex - 1)}
              className="hover:underline"
            >
              ↑ Up
            </button>
            <button
              onClick={() => moveSection(sectionIndex, sectionIndex + 1)}
              className="hover:underline"
            >
              ↓ Down
            </button>
          </div>

          <input
            placeholder="Section Title (e.g. Education, Projects)"
            value={section.title}
            onChange={(e) =>
              updateSection(sectionIndex, "title", e.target.value)
            }
            className="w-full border p-2 rounded mb-2"
          />

          <input
            placeholder="Fields (comma separated)"
            onBlur={(e) => setFields(sectionIndex, e.target.value)}
            className="w-full border p-2 rounded mb-3"
          />

          <button
            onClick={() => addItem(sectionIndex)}
            className="text-sm text-blue-600 hover:underline"
            disabled={section.fields.length === 0}
          >
            + Add Entry
          </button>


          {section.items.map((item, itemIndex) => (
            <div key={itemIndex} className="mt-4 space-y-2">
              {section.fields.map((field) => (
                <input
                  key={field}
                  placeholder={field}
                  value={item[field]}
                  onChange={(e) =>
                    updateItem(
                      sectionIndex,
                      itemIndex,
                      field,
                      e.target.value
                    )
                  }
                  className="w-full border p-2 rounded"
                />

              ))}
              <button
                onClick={() => deleteItem(sectionIndex, itemIndex)}
                className="text-xs text-red-500 hover:underline"
              >
                Delete Entry
              </button>

            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
