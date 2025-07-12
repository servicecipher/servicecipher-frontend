import React, { useState } from "react";

const UploadForm = ({ userEmail }) => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setStatus("idle");
    setDownloadUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          "x-user-email": userEmail, // Pass the email in the header
        },
      });
      const data = await res.json();
if (data.success) {
  setStatus("complete");

 setDownloadUrl(`https://servicecipher-backend-production.up.railway.app${data.url}`);
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