import React from "react";
import UploadForm from "./UploadForm";
import "./App.css";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignIn, UserButton, useUser } from "@clerk/clerk-react";

// Put your Clerk publishable key here or in index.js as you've already done
// const clerkPubKey = "pk_test_..."; // not needed if in index.js

function ApprovedUploadOnly({ children }) {
  return children;
}

function App() {
  const { user, isSignedIn } = useUser();

  const planDetails = {
    free: { label: "Free", price: "$0/mo", description: "Great for trying ServiceCipher." },
    basic: { label: "Basic", price: "$800/yr", description: "For shops with moderate volume." },
    professional: { label: "Professional", price: "$1500/yr", description: "For high-volume or multi-location shops." },
  };

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
            <h2 className="plan-title">If you are not signed up, please select your plan</h2>
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "30px",
              marginTop: "1rem",
              flexWrap: "wrap"
            }}>
              {["free", "basic", "professional"].map((plan) => (
                <div key={plan} style={{
                  textAlign: "center",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "20px",
                  width: "220px",
                  backgroundColor: "#ffffff",
                  boxShadow: "0px 2px 6px rgba(0,0,0,0.1)"
                }}>
                  <div style={{ marginBottom: "8px", fontWeight: "bold" }}>{planDetails[plan].label}</div>
                  <div style={{ marginBottom: "4px" }}>{planDetails[plan].price}</div>
                  <div style={{ marginBottom: "12px", fontSize: "14px", maxWidth: "160px" }}>{planDetails[plan].description}</div>
                  <button
                    className="plan-button"
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
                  >
                    Choose {planDetails[plan].label}
                  </button>
                </div>
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