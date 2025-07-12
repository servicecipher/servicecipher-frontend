import React from "react";
import UploadForm from "./UploadForm";
import "./App.css";
import allowedEmails from "./allowed_emails.json";
import { SignedIn, SignedOut, SignIn, useUser } from "@clerk/clerk-react";

function App() {
  // Clerk hook gives us user info
  const { user } = useUser();

  // Grab the email if signed in, otherwise empty string
  const userEmail =
    user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress || "";

  // Case-insensitive check
  const isApproved =
    userEmail &&
    allowedEmails.map(e => e.toLowerCase()).includes(userEmail.toLowerCase());

  return (
    <div className="app-root">
      {/* --- USER BLOCK --- */}
      {userEmail && (
        <div className="user-info">
          Signed in as <strong>{userEmail}</strong>
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
        {/* Not logged in = show sign-in */}
        <SignedOut>
          <SignIn />
        </SignedOut>

        {/* Logged in and approved = show upload */}
        <SignedIn>
          {isApproved ? (
            <UploadForm userEmail={userEmail} />
          ) : (
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
          )}
        </SignedIn>
      </main>
    </div>
  );
}

export default App;