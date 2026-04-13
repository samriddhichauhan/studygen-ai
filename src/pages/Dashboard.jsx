import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const filename = localStorage.getItem("filename");
  const extractedText = localStorage.getItem("extracted_text");
  const error = localStorage.getItem("error");

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#e5e5e5] px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Top */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Dashboard</h1>

          <button
            onClick={() => navigate("/upload")}
            className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-300"
          >
            Upload New
          </button>
        </div>

        {/* File Info */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-lg mb-6">
          <h2 className="text-lg font-semibold mb-2">Uploaded File</h2>
          <p className="text-gray-400">{filename || "No file uploaded yet."}</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-900/30 border border-red-700 p-4 rounded-lg mb-6">
            <p className="text-red-300">Error: {error}</p>
          </div>
        )}

        {/* Extracted Text */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Extracted Text</h2>

          {extractedText ? (
            <div className="bg-[#111] border border-[#2a2a2a] p-4 rounded-md max-h-[400px] overflow-y-auto text-sm text-gray-300 whitespace-pre-wrap">
              {extractedText}
            </div>
          ) : (
            <p className="text-gray-400">
              No readable text found in this PDF.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}