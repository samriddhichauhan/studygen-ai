import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#e5e5e5]">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5 border-b border-[#2a2a2a]">
        <h1 className="text-xl font-semibold text-yellow-400">StudyGen</h1>
        <button
          onClick={() => navigate("/upload")}
          className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-300"
        >
          Upload
        </button>
      </nav>

      {/* Hero */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h2 className="text-4xl font-bold mb-4">
          Study smarter, not harder.
        </h2>

        <p className="text-gray-400 max-w-xl mb-8">
          Upload your notes and generate summaries, key points, and quizzes instantly.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/upload")}
            className="bg-yellow-400 text-black px-6 py-3 rounded-md font-medium hover:bg-yellow-300"
          >
            Upload PDF
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="border border-[#2a2a2a] px-6 py-3 rounded-md hover:bg-[#1a1a1a]"
          >
            Dashboard
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-4 gap-6 px-8 pb-16">
        {["Notes", "Summary", "Quiz", "Key Points"].map((item) => (
          <div key={item} className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">{item}</h3>
            <p className="text-gray-400 text-sm">
              AI-generated {item.toLowerCase()} from your PDF.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}