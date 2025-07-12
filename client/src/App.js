import React from "react";
import UploadForm from "./UploadForm";
import "./App.css";
import allowedEmails from "./allowed_emails.json";
import { ClerkProvider, SignedIn, SignedOut, SignIn, UserButton, useUser } from "@clerk/clerk-react";

// Put your Clerk publishable key here or in index.js as you've already done
// const clerkPubKey = "pk_test_..."; // not needed if in index.js

function ApprovedUploadOnly({ children }) {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || "";

  const isApproved = allowedEmails
    .map(e => e.toLowerCase())
    .includes(email.toLowerCase());

  if (!isApproved) {
    return (
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
    );
  }
  // Render child components if approved
  return children;
}

function App() {
  const { user, isSignedIn } = useUser();

  return (
    <div className="app-root">
      {/* --- TOP RIGHT USER BLOCK --- */}
      <SignedIn>
        <div className="user-info">
          Signed in as <strong>{user?.primaryEmailAddress?.emailAddress}</strong>
          <UserButton afterSignOutUrl="/" />
        </div>
      </SignedIn>

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
        <SignedOut>
          <SignIn />
        </SignedOut>

        {/* Only approved users can upload */}
        <SignedIn>
          <ApprovedUploadOnly>
            <UploadForm userEmail={user?.primaryEmailAddress?.emailAddress} />
          </ApprovedUploadOnly>
        </SignedIn>
      </main>
    </div>
  );
}

export default App;