import React from "react";
import UploadForm from "./UploadForm";
import "./App.css";
import "./PricingStyles.css";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignIn, UserButton, useUser } from "@clerk/clerk-react";

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
        {/* Choose Plan Buttons (Stripe Checkout) - Only for signed out users */}
        <SignedOut>
          <div className="plan-selection-container">
            <h2 className="plan-title">Select a Plan</h2>
            <div className="plan-buttons">
              {["free", "basic", "professional"].map((plan) => (
                <button
                  key={plan}
                  onClick={async () => {
                    try {
                      const response = await fetch("/api/create-checkout-session", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ plan }),
                      });
                      const data = await response.json();
                      if (data.url) window.location.href = data.url;
                    } catch (err) {
                      alert("Checkout failed.");
                    }
                  }}
                  className="plan-button"
                >
                  Choose {plan.charAt(0).toUpperCase() + plan.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </SignedOut>

        {/* Login Block */}
        <SignedOut>
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
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
                Sign In or Create Account
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