import React from "react";
import UploadForm from "./UploadForm";
import "./App.css";
import allowedEmails from "./allowed_emails.json";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";

function ApprovedUploadOnly({ children }) {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || "";

  const isApproved = allowedEmails
    .map((e) => e.toLowerCase())
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

  return children;
}

function UploadPage() {
  const { user, isSignedIn } = useUser();

  return (
    <div className="app-root">
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
        <SignedOut>
          <SignIn />
        </SignedOut>

        <SignedIn>
          <ApprovedUploadOnly>
            <UploadForm userEmail={user?.primaryEmailAddress?.emailAddress} />
          </ApprovedUploadOnly>
        </SignedIn>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/clarity" element={<LandingPage />} />
        <Route path="*" element={<UploadPage />} />
      </Routes>
    </Router>
  );
}

export default App;