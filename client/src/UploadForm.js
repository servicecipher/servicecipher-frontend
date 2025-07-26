import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { supabase } from './supabaseClient'

async function logReport(userId, email, type = 'standard', url = '') {
  const { data, error } = await supabase.from('report_logs').insert([
    {
      user_id: userId,
      user_email: email,
      report_type: type,
      report_url: url
    }
  ]);

  if (error) {
    console.error('❌ Error logging report:', error.message);
  } else {
    console.log('✅ Report logged:', data);
  }
}

const UploadForm = ({ userEmail }) => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [downloadUrl, setDownloadUrl] = useState("");
  const { user } = useUser();
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setStatus("idle");
    setDownloadUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const industry = user?.publicMetadata?.industry || "Auto";

    if (industry.toLowerCase() === "medical") {
      alert("🩺 Medical user detected — custom report flow goes here.");
      // TODO: Replace this with medical-specific upload logic
      return;
    }

    if (!file) return;
    setStatus("processing");
    setDownloadUrl("");
    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const res = await fetch("https://servicecipher-backend-production.up.railway.app/api/upload", {
        method: "POST",
        body: formData,
        headers: {
          "x-user-email": userEmail,
          "x-user-language": selectedLanguage,
          "x-user-industry": industry
        },
      });
      const data = await res.json();
      if (data.success) {
        setStatus("complete");
        setDownloadUrl(`https://servicecipher-backend-production.up.railway.app${data.url}`);
        const fullUrl = `https://servicecipher-backend-production.up.railway.app${data.url}`;
        await logReport(user.id, user.primaryEmailAddress.emailAddress, selectedLanguage, fullUrl);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="upload-outer-wrapper">
      <div className="upload-container">
        <form onSubmit={handleSubmit} className="upload-form">
          <label htmlFor="file-upload" className="file-label">
            <span className="cloud-icon">☁️</span>
            <span className="file-title">Upload Your Invoice</span>
            <input
              id="file-upload"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <span className="file-choose">
              {file ? file.name : "Click here to select your PDF file"}
            </span>
          </label>
          <label htmlFor="language-select" style={{ marginBottom: "12px", display: "block" }}>
            Select Report Language:
            <select
              id="language-select"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              style={{ marginLeft: "8px", padding: "4px 8px", borderRadius: "4px", border: "1px solid #ccc" }}
            >
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="german">German</option>
              <option value="danish">Danish</option>
            </select>
          </label>
          <button
            type="submit"
            className="generate-btn"
            disabled={status === "processing"}
          >
            {status === "processing" ? "PROCESSING..." : "GENERATE REPORT"}
          </button>
        </form>
      </div>

      {/* Status messages */}
      {status === "processing" && (
        <div className="status processing">
          <span>Processing Document... Generating your report.</span>
        </div>
      )}
      {status === "complete" && (
  <div className="status complete">
    <span style={{ textAlign: "center", width: "100%" }}>
      Analysis Complete!<br />
      Your customer facing report is ready for download.
    </span>
    <a href={downloadUrl} className="download-btn" download>
      Download Report
    </a>
    <button
      style={{
        marginTop: "20px",
        padding: "8px 20px",
        borderRadius: "7px",
        border: "none",
        background: "#3963cc",
        color: "#fff",
        fontWeight: "bold",
        fontSize: "1rem",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(32,40,90,0.08)"
      }}
      onClick={() => window.location.reload()}
    >
      Upload Another Invoice
    </button>
  </div>
)}
      {status === "error" && (
        <div className="status error">
          <span>Something went wrong. Please try again.</span>
        </div>
      )}
    </div>
  );
};

export default UploadForm;