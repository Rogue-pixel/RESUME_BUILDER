import { designs } from "../designs";


export default function Form({ resume, setResume }) {
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
          items: [],
        },
      ],
    });
  };
  const addPresetSection = (title) => {
    setResume({
      ...resume,
      sections: [
        ...resume.sections,
        { title, items: [] },
      ],
    });
  };
  console.log("Active design:", resume.design);

  const updateSectionTitle = (index, value) => {
    const updated = [...resume.sections];
    updated[index].title = value;
    setResume({ ...resume, sections: updated });
  };

  const addItem = (sectionIndex) => {
    const updated = [...resume.sections];
    updated[sectionIndex].items.push("");
    setResume({ ...resume, sections: updated });
  };

  const updateItem = (sectionIndex, itemIndex, value) => {
    const updated = [...resume.sections];
    updated[sectionIndex].items[itemIndex] = value;
    setResume({ ...resume, sections: updated });
  };

  const deleteItem = (sectionIndex, itemIndex) => {
    const updated = [...resume.sections];
    updated[sectionIndex].items = updated[sectionIndex].items.filter(
      (_, i) => i !== itemIndex
    );
    setResume({ ...resume, sections: updated });
  };

  const deleteSection = (index) => {
    setResume({
      ...resume,
      sections: resume.sections.filter((_, i) => i !== index),
    });
  };

  const moveSection = (from, to) => {
    if (to < 0 || to >= resume.sections.length) return;
    const updated = [...resume.sections];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setResume({ ...resume, sections: updated });
  };

  return (
    <div className="no-print bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">
          Resume Details
        </h2>

        <div className="flex gap-2">
          {/* Preview button */}
          <button
            onClick={() => {
              localStorage.setItem(
                "resume-data",
                JSON.stringify(resume)
              );
              window.open("/preview", "_blank");
            }}
            className="text-sm px-3 py-1.5 border rounded hover:bg-gray-100"
          >
            Preview
          </button>

          {/* Print button */}
          <button
            onClick={() => window.print()}
            className="text-sm px-3 py-1.5 bg-black text-white rounded hover:bg-gray-800"
          >
            Print
          </button>
        </div>
      </div>



      {/* Basic Info */}
      <div className="space-y-3 mb-6">
        <input
          name="name"
          placeholder="Full Name"
          value={resume.name}
          onChange={handleBasicChange}
          className="w-full border p-2 rounded"
        />
        <label className="text-xs font-semibold block mb-1">
          Profile Photo (optional)
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
          className="text-sm mb-4"
        />

        <input
          name="email"
          placeholder="Email"
          value={resume.email}
          onChange={handleBasicChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="location"
          placeholder="City, Country"
          value={resume.location}
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

      <div className="flex gap-3 mb-4 text-xs">
        <button onClick={() => addPresetSection("Experience")} className="hover:underline">
          + Experience
        </button>
        <button onClick={() => addPresetSection("Projects")} className="hover:underline">
          + Projects
        </button>
        <button onClick={() => addPresetSection("Education")} className="hover:underline">
          + Education
        </button>
        <button onClick={() => addPresetSection("Skills")} className="hover:underline">
          + Skills
        </button>
      </div>

      <div className="mb-4">
        <label className="text-xs font-semibold block mb-1">
          Design Preset
        </label>

        <select
          value={resume.design}
          onChange={(e) =>
            setResume({ ...resume, design: e.target.value })
          }
          className="border p-2 rounded text-sm w-full"
        >
          {Object.entries(designs).map(([key, design]) => (
            <option key={key} value={key}>
              {design.label}
            </option>
          ))}
        </select>


      </div>



      <hr className="my-6" />

      <button
        onClick={addSection}
        className="text-sm text-blue-600 hover:underline mb-4"
      >
        + Add Section
      </button>



      {resume.sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="border p-4 rounded mb-6">
          <div className="flex justify-between mb-2">
            <div className="flex gap-3 text-xs">
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
            <button
              onClick={() => deleteSection(sectionIndex)}
              className="text-xs text-red-500 hover:underline"
            >
              Delete Section
            </button>
          </div>

          <input
            placeholder="Section Title (e.g. Experience, Projects)"
            value={section.title}
            onChange={(e) =>
              updateSectionTitle(sectionIndex, e.target.value)
            }
            className="w-full border p-2 rounded mb-3"
          />

          <button
            onClick={() => addItem(sectionIndex)}
            className="text-sm text-blue-600 hover:underline"
          >
            + Add Bullet
          </button>

          {section.items.map((item, itemIndex) => (
            <div key={itemIndex} className="mt-3">
              <textarea
                placeholder="Bullet point (achievement / detail)"
                value={item}
                onChange={(e) =>
                  updateItem(sectionIndex, itemIndex, e.target.value)
                }
                rows="2"
                className="w-full border p-2 rounded"
              />
              <button
                onClick={() => deleteItem(sectionIndex, itemIndex)}
                className="text-xs text-red-500 hover:underline mt-1"
              >
                Remove bullet
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
