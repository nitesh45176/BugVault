"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditdecisionForm({ decision }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    await fetch(`/api/decisions/${decision.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.get("title"),
        context: formData.get("context"),
        solution: formData.get("solution"),
      }),
    });

    router.push(`/dashboard/projects/${decision.projectId}/new-decision/${decision.id}`);
  };

  const labelStyle = {
    display: "block",
    color: "#9ca3af",
    fontSize: "0.72rem",
    fontWeight: "600" as const,
    marginBottom: "6px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    backgroundColor: "#0d1117",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "8px",
    color: "#ffffff",
    fontSize: "0.875rem",
    outline: "none",
    boxSizing: "border-box" as const,
    resize: "vertical" as const,
  };

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto" }}>

      {/* Back */}
      <button
        type="button"
        onClick={() => router.push(`/dashboard/projects/${decision.projectId}/decisions/${decision.id}`)}
        style={{ color: "#60a5fa", fontSize: "0.875rem", background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: "24px", display: "inline-flex", alignItems: "center", gap: "4px" }}
      >
        ← Back to Decision
      </button>

      {/* Card */}
      <div style={{ backgroundColor: "#111827", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "32px" }}>

        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: "700", color: "#ffffff", margin: "0 0 6px 0" }}>
            ✏️ Edit decision
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.875rem", margin: 0 }}>
            Update the details for <span style={{ color: "#93c5fd" }}>{decision.title}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* Title */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>decision Title *</label>
            <input
              name="title"
              defaultValue={decision.title}
              style={inputStyle}
              required
            />
          </div>

          {/* Error Message */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>Error Message</label>
            <textarea
              name="errorMessage"
              defaultValue={decision.errorMessage}
              style={{ ...inputStyle, minHeight: "90px", fontFamily: "monospace", fontSize: "0.8rem", color: "#f87171" }}
            />
          </div>

          {/* Context + Root Cause */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={labelStyle}>Context</label>
              <textarea
                name="context"
                defaultValue={decision.context}
                style={{ ...inputStyle, minHeight: "100px" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={labelStyle}>Root Cause</label>
              <textarea
                name="rootCause"
                defaultValue={decision.rootCause}
                style={{ ...inputStyle, minHeight: "100px" }}
              />
            </div>
          </div>

          {/* Solution */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ ...labelStyle, color: "#22c55e" }}>✅ Solution</label>
            <textarea
              name="solution"
              defaultValue={decision.solution}
              style={{ ...inputStyle, minHeight: "90px", borderColor: "rgba(34,197,94,0.2)" }}
            />
          </div>

          {/* Divider */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />

          {/* Actions */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={() => router.push(`/dashboard/projects/${decision.projectId}/decisions/${decision.id}`)}
              style={{
                padding: "10px 20px",
                backgroundColor: "transparent",
                color: "#9ca3af",
                fontSize: "0.875rem",
                fontWeight: "500",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.1)",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "10px 28px",
                backgroundColor: loading ? "#1d4ed8" : "#2563eb",
                color: "#ffffff",
                fontWeight: "600",
                fontSize: "0.875rem",
                borderRadius: "8px",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {loading ? (
                <>
                  <span style={{ display: "inline-block", width: "14px", height: "14px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                  Updating...
                </>
              ) : "Update decision"}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}