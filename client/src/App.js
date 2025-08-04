import React from "react";
import UploadForm from "./UploadForm";
import "./App.css";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignIn, UserButton, useUser, PricingTable } from "@clerk/clerk-react";

// Put your Clerk publishable key here or in index.js as you've already done
// const clerkPubKey = "pk_test_..."; // not needed if in index.js

function ApprovedUploadOnly({ children }) {
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
          src="/horizontal_logo_tag.png"
          alt="ServiceCipher logo"
          className="logo"
        />
       
      </header>

      <main>
        {/* Login Block */}
        <SignedOut>
          <div style={{ maxWidth: "800px", margin: "auto", padding: "2rem 1rem" }}>
            <h2 style={{ textAlign: "center" }}>Choose Your Plan</h2>
            <PricingTable />
          </div>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <SignInButton mode="modal">
              <button
                style={{
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  padding: "12px 24px",
                  borderRadius: "6px",
                  fontSize: "16px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Sign In
              </button>
            </SignInButton>
          </div>
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