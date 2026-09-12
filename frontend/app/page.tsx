"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF first.");
      return;
    }

    setUploading(true);
    setError("");
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/upload/pdf",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Upload failed.");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white p-6 md:flex">
          <div className="mb-10">
            <h1 className="text-2xl font-bold tracking-tight">
              LearnPilot<span className="text-blue-600"> AI</span>
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Your adaptive learning companion
            </p>
          </div>

          <nav className="space-y-2">
            <button className="w-full rounded-xl bg-blue-50 px-4 py-3 text-left font-medium text-blue-700">
              🏠 Dashboard
            </button>

            <button className="w-full rounded-xl px-4 py-3 text-left font-medium text-slate-600 hover:bg-slate-50">
              📚 My Courses
            </button>

            <button className="w-full rounded-xl px-4 py-3 text-left font-medium text-slate-600 hover:bg-slate-50">
              📄 Upload Material
            </button>

            <button className="w-full rounded-xl px-4 py-3 text-left font-medium text-slate-600 hover:bg-slate-50">
              📊 My Progress
            </button>

            <button className="w-full rounded-xl px-4 py-3 text-left font-medium text-slate-600 hover:bg-slate-50">
              🤖 AI Tutor
            </button>
          </nav>

          <div className="mt-auto rounded-2xl bg-slate-900 p-5 text-white">
            <p className="text-sm font-semibold">Keep learning 🚀</p>
            <p className="mt-2 text-xs leading-5 text-slate-300">
              Your progress gets smarter as you learn.
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex-1 p-6 md:p-10">

          {/* Header */}
          <header className="mb-8">
            <p className="text-sm font-medium text-blue-600">
              AI-POWERED LEARNING
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              Welcome back 👋
            </h2>

            <p className="mt-2 text-slate-500">
              Turn your learning material into a personalized course.
            </p>
          </header>

          {/* Upload Card */}
          <div className="mb-8 rounded-3xl bg-blue-600 p-8 text-white shadow-lg">
            <div className="max-w-2xl">
              <p className="mb-2 text-sm font-medium text-blue-100">
                START LEARNING
              </p>

              <h3 className="text-2xl font-bold md:text-3xl">
                Have a textbook or PDF?
              </h3>

              <p className="mt-3 leading-7 text-blue-100">
                Upload your study material and let LearnPilot transform it
                into structured lessons, assessments and a personalized
                learning experience.
              </p>

              {/* File input */}
              <div className="mt-6">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    setFile(e.target.files?.[0] || null);
                    setError("");
                    setResult(null);
                  }}
                  className="block w-full max-w-md rounded-xl bg-white p-3 text-sm text-slate-700"
                />

                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="mt-4 rounded-xl bg-white px-6 py-3 font-semibold text-blue-600 shadow-sm transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {uploading ? "Uploading..." : "📄 Upload PDF"}
                </button>
              </div>

              {/* Error */}
              {error && (
                <div className="mt-4 rounded-xl bg-red-500/20 p-4 text-sm">
                  ❌ {error}
                </div>
              )}

              {/* Success */}
              {result && (
                <div className="mt-5 rounded-2xl bg-white p-5 text-slate-800">
                  <p className="font-semibold text-green-600">
                    ✓ PDF uploaded successfully!
                  </p>

                  <p className="mt-2 text-sm">
                    <strong>File:</strong> {result.filename}
                  </p>

                  <p className="mt-1 text-sm">
                    <strong>Characters extracted:</strong>{" "}
                    {result.characters_extracted}
                  </p>

                  <div className="mt-4 max-h-40 overflow-auto rounded-xl bg-slate-100 p-4 text-xs leading-5">
                    {result.preview}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Courses</p>
              <p className="mt-2 text-3xl font-bold">0</p>
              <p className="mt-1 text-xs text-slate-400">
                AI-generated courses
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Learning Progress</p>
              <p className="mt-2 text-3xl font-bold">0%</p>
              <p className="mt-1 text-xs text-slate-400">
                Keep building your streak
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Assessments</p>
              <p className="mt-2 text-3xl font-bold">0</p>
              <p className="mt-1 text-xs text-slate-400">
                Quizzes completed
              </p>
            </div>
          </div>

          {/* My Courses */}
          <div>
            <h3 className="mb-4 text-xl font-bold">My Courses</h3>

            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                📚
              </div>

              <h4 className="font-semibold">
                No courses yet
              </h4>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                Upload your first PDF and LearnPilot will turn it into a
                structured learning course.
              </p>
            </div>
          </div>

        </section>
      </div>
    </main>
  );
}
