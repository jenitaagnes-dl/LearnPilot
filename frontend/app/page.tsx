"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [course, setCourse] = useState<any>(null);
  const [error, setError] = useState("");

  const handleGenerateCourse = async () => {
    if (!file) {
      setError("Please select a PDF first.");
      return;
    }

    setUploading(true);
    setGenerating(false);
    setError("");
    setCourse(null);

    try {
      // Step 1: Upload PDF
      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await fetch(
        "http://127.0.0.1:8000/api/upload/pdf",
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok || !uploadData.success) {
        throw new Error(uploadData.message || "PDF upload failed.");
      }

      // Step 2: Generate AI course
      setUploading(false);
      setGenerating(true);

      const courseResponse = await fetch(
        "http://127.0.0.1:8000/api/course/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: uploadData.preview,
          }),
        }
      );

      const courseData = await courseResponse.json();

      if (!courseResponse.ok || !courseData.success) {
        throw new Error("AI course generation failed.");
      }

      setCourse(courseData.course);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setUploading(false);
      setGenerating(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        background: "#f8fafc",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "auto" }}>
        <h1 style={{ fontSize: "42px", marginBottom: "8px" }}>
          🚀 LearnPilot AI
        </h1>

        <p style={{ fontSize: "18px", color: "#64748b" }}>
          Turn your learning material into an AI-powered course.
        </p>

        <div
          style={{
            marginTop: "35px",
            padding: "30px",
            background: "white",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
          }}
        >
          <h2>📄 Upload Learning Material</h2>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => {
              setFile(e.target.files?.[0] || null);
              setError("");
              setCourse(null);
            }}
            style={{ marginTop: "20px" }}
          />

          {file && (
            <p style={{ marginTop: "15px", color: "#475569" }}>
              Selected: <strong>{file.name}</strong>
            </p>
          )}

          <button
            onClick={handleGenerateCourse}
            disabled={uploading || generating}
            style={{
              marginTop: "20px",
              padding: "14px 24px",
              borderRadius: "10px",
              border: "none",
              background: "#111827",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            {uploading
              ? "Uploading PDF..."
              : generating
              ? "🧠 AI is building your course..."
              : "✨ Generate AI Course"}
          </button>

          {error && (
            <p style={{ marginTop: "20px", color: "red" }}>
              ❌ {error}
            </p>
          )}
        </div>

        {course && (
          <div style={{ marginTop: "35px" }}>
            <h2>📚 {course.course_title}</h2>

            <p style={{ color: "#64748b", marginBottom: "25px" }}>
              {course.description}
            </p>

            {course.modules?.map((module: any, index: number) => (
              <div
                key={index}
                style={{
                  background: "white",
                  padding: "25px",
                  marginBottom: "18px",
                  borderRadius: "14px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <h3>
                  Module {index + 1}: {module.title}
                </h3>

                {module.lessons?.map((lesson: any, lessonIndex: number) => (
                  <div
                    key={lessonIndex}
                    style={{
                      marginTop: "18px",
                      padding: "15px",
                      background: "#f8fafc",
                      borderRadius: "10px",
                    }}
                  >
                    <strong>
                      Lesson {lessonIndex + 1}: {lesson.title}
                    </strong>

                    <ul>
                      {lesson.learning_objectives?.map(
                        (objective: string, objectiveIndex: number) => (
                          <li key={objectiveIndex}>{objective}</li>
                        )
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}