import React, { useState, useEffect } from "react";
import UploadForm from "./UploadForm";
import "./App.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import allowedEmails from "./allowed_emails.json";

function App() {
  const [userEmail, setUserEmail] = useState(
    () => window.localStorage.getItem("userEmail") || ""
  );

  // Save email on login; clear on logout
  useEffect(() => {
    if (userEmail) {
      window.localStorage.setItem("userEmail", userEmail);
    } else {
      window.localStorage.removeItem("userEmail");
    }
  }, [userEmail]);

  const handleLogout = () => setUserEmail("");
  const isApproved =
  userEmail &&
  allowedEmails.map(e => e.toLowerCase()).includes(userEmail.toLowerCase());

  return (
    <div className="app-root">
      {/* --- TOP RIGHT USER BLOCK --- */}
      {userEmail && (
        <div className="user-info">
          Signed in as <strong>{userEmail}</strong>
          <button onClick={handleLogout}>Log out</button>
        </div>
      )}

      <header>
        <img
          src="/servicecipher_horizontal_logo.png"
          alt="ServiceCipher logo"
          className="logo"
        />
        <h2>Customer facing invoice analysis</h2>
        <hr className="header-line" />
      </header>

      <main>
        {/* Login Block */}
        {!userEmail ? (
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const decoded = jwtDecode(credentialResponse.credential);
              setUserEmail(decoded.email);
            }}
            onError={() => {
              alert("Login Failed");
            }}
          />
        ) : null}

        {/* Only approved users can upload */}
        {isApproved ? (
          <UploadForm userEmail={userEmail} />
        ) : userEmail ? (
          <p style={{ color: "red", marginTop: 32 }}>
            Sorry, you are not approved to use the upload feature.
            <br />
            Please email{" "}
            <a
              href="mailto:support@servicecipher.com"
              style={{ color: "#6c5ce7", textDecoration: "underline" }}
            >
              support@servicecipher.com
            </a>{" "}
            to sign up!
          </p>
        ) : null}
      </main>
    </div>
  );
}

export default App;
