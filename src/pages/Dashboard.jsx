import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();

  const filename = localStorage.getItem("filename");
  const extractedText = localStorage.getItem("extracted_text");
  const summary = localStorage.getItem("summary");
  const error = localStorage.getItem("error");

  // ✅ NEW STATES
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ ASK FUNCTION
  const askQuestion = async () => {
    if (!question) return;

    try {
      setLoading(true);

      const response = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          context: extractedText,
          question: question,
        }),
      });

      const data = await response.json();
      setAnswer(data.answer);

    } catch (error) {
      console.error(error);
      alert("Error fetching answer");
    } finally {
      setLoading(false);
    }
  };

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

        {/* Summary */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-lg mb-6">
          <h2 className="text-lg font-semibold mb-4">Summary</h2>

          {summary ? (
            <p className="text-gray-300 whitespace-pre-wrap">{summary}</p>
          ) : (
            <p className="text-gray-400">No summary available.</p>
          )}
        </div>

        {/* Extracted Text */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-lg mb-6">
          <h2 className="text-lg font-semibold mb-4">Extracted Text</h2>

          {extractedText ? (
            <div className="bg-[#111] border border-[#2a2a2a] p-4 rounded-md max-h-[300px] overflow-y-auto text-sm text-gray-300 whitespace-pre-wrap">
              {extractedText}
            </div>
          ) : (
            <p className="text-gray-400">
              No readable text found in this PDF.
            </p>
          )}
        </div>

        {/* 🤖 AI CHAT */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Ask from PDF 🤖</h2>

          <input
            type="text"
            placeholder="Ask something..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-2 mb-3 bg-[#2a2a2a] rounded text-white"
          />

          <button
            onClick={askQuestion}
            className="bg-blue-500 px-4 py-2 rounded"
          >
            {loading ? "Thinking..." : "Ask"}
          </button>

          {answer && (
            <div className="mt-4 bg-[#111] p-4 rounded border border-[#2a2a2a]">
              <p className="text-gray-300 whitespace-pre-wrap">{answer}</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}