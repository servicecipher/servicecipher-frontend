import React, { useState } from "react";

const UploadForm = () => {
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
      const res = await fetch("http://localhost:3001/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("complete");
        setDownloadUrl(`http://localhost:3001${data.url}`);
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
              {file ? file.name : "Drag & drop or click to select your PDF file"}
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