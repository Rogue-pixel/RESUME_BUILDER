export default function AppHeader({
  mobileView,
  setMobileView,
  onPreview,
  onDownloadPDF,
}) {
  return (
    <header className="sticky top-0 z-20 bg-white border-b no-print">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Resume Builder</h1>

        <div className="flex items-center gap-2">
          {/* Mobile toggle */}
          <div className="md:hidden flex border rounded overflow-hidden">
            <button
              onClick={() => setMobileView("edit")}
              className={`px-3 py-1 text-sm ${mobileView === "edit"
                ? "bg-black text-white"
                : "bg-white"
                }`}
            >
              Edit
            </button>
            <button
              onClick={() => setMobileView("preview")}
              className={`px-3 py-1 text-sm ${mobileView === "preview"
                ? "bg-black text-white"
                : "bg-white"
                }`}
            >
              Preview
            </button>
          </div>

          {/* Desktop buttons */}
          <button
            onClick={onPreview}
            className="hidden md:inline text-sm px-3 py-1.5 border rounded"
          >
            Preview
          </button>

          <button
            onClick={onDownloadPDF}
            className="text-xs sm:text-sm px-3 sm:px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 font-medium shadow-sm active:scale-95 whitespace-nowrap"
          >
            Download
          </button>
        </div>
      </div>
    </header>
  );
}
