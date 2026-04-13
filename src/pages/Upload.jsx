import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Upload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

 const handleUpload = async () => {
  if (!file) {
    alert("Please select a PDF first!");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    setLoading(true);

    const response = await fetch("http://127.0.0.1:8000/upload-pdf", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Server error: " + response.status);
    }

    const data = await response.json();

    console.log("DATA:", data);

    if (data.error) {
      throw new Error(data.error);
    }

    localStorage.setItem("filename", data.filename || "");
    localStorage.setItem("extracted_text", data.extracted_text || "");
    localStorage.setItem("summary", data.summary || "");

    navigate("/dashboard");

  } catch (error) {
    console.error("ERROR:", error);
    alert(error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-10 rounded-lg w-full max-w-md text-[#e5e5e5]">
        <h2 className="text-xl font-semibold mb-6 text-center">Upload PDF</h2>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full mb-6 text-sm text-gray-300"
        />

        {file && (
          <p className="text-sm text-gray-400 mb-4">{file.name}</p>
        )}

        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full bg-yellow-400 text-black py-2 rounded-md hover:bg-yellow-300 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Continue"}
        </button>
      </div>
    </div>
  );
}