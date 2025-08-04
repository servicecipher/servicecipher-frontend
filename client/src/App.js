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
                  borderRadius: "12px",
                  padding: "20px",
                  width: "240px",
                  backgroundColor: "#ffffff",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "12px"
                }}>
                  <div style={{ margin: "0", padding: "0", lineHeight: "1.4", fontWeight: "bold" }}>{planDetails[plan].label}</div>
                  <div style={{ margin: "0", padding: "0", lineHeight: "1.4" }}>{planDetails[plan].price}</div>
                  <div style={{ margin: "0", padding: "0", lineHeight: "1.4", fontSize: "14px", maxWidth: "160px" }}>{planDetails[plan].description}</div>
                  <button
                    className="plan-button"
                    style={{
                      backgroundColor: "#000000",
                      color: "#ffffff",
                      padding: "10px 16px",
                      borderRadius: "6px",
                      fontSize: "14px",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#cefee1";
                      e.target.style.color = "#000000";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#000000";
                      e.target.style.color = "#ffffff";
                    }}
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