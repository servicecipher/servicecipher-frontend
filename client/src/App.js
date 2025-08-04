import React from "react";
import UploadForm from "./UploadForm";
import "./App.css";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignIn, UserButton, useUser } from "@clerk/clerk-react";

// TODO: Clean up plan styles into App.css for better reuse and maintainability

// Put your Clerk publishable key here or in index.js as you've already done
// const clerkPubKey = "pk_test_..."; // not needed if in index.js

function ApprovedUploadOnly({ children }) {
  return children;
}

function App() {
  const { user, isSignedIn } = useUser();

  const planDetails = {
    free: { label: "Free", monthly: "$0", price: "$0", description: "Great for trying ServiceCipher." },
    basic: { label: "Basic", monthly: "$67", price: "$800", description: "For shops with moderate volume." },
    professional: { label: "Professional", monthly: "$125", price: "$1500", description: "For high-volume or multi-location shops." },
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

      <main style={{ marginTop: "0.5rem" }}>
        {/* Choose Plan Buttons (Stripe Checkout) - Only for signed out users */}
        <SignedOut>
          <div className="plan-selection-container">
            <h2 className="plan-title" style={{ fontSize: "18px", color: "#666", textAlign: "center" }}>If you are not signed up, please select your plan</h2>
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "30px",
              marginTop: "1rem",
              flexWrap: "wrap"
            }}>
              {["free", "basic", "professional"].map((plan) => {
                let backgroundColor = "#ffffff";
                if (plan === "free") backgroundColor = "#cefee1"; // mint
                if (plan === "basic") backgroundColor = "#fff8dc"; // light gold
                if (plan === "professional") backgroundColor = "#a1d4c5"; // light teal

                return (
                  <div key={plan} style={{
                    textAlign: "center",
                    border: "1px solid #ccc",
                    borderRadius: "12px",
                    padding: "20px",
                    width: "240px",
                    backgroundColor,
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.08)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "12px"
                  }}>
                    <div style={{
                      color: plan === "basic" ? "#b8860b" : "transparent",
                      fontWeight: "bold",
                      fontSize: "13px",
                      height: "16px"
                    }}>
                      {plan === "free" ? "🔓" : plan === "basic" ? "★ Most Popular" : plan === "professional" ? "💼" : ""}
                    </div>
                    <div style={{ margin: "0", padding: "0", lineHeight: "1.4", fontWeight: "bold" }}>{planDetails[plan].label}</div>
                    <div style={{ fontSize: "20px", fontWeight: "800", fontFamily: "sans-serif", lineHeight: "1.2" }}>
                      {planDetails[plan].monthly}<span style={{ fontSize: "14px", fontWeight: "600" }}>/mo</span>
                    </div>
                    <div style={{ fontSize: "16px", fontWeight: "600", fontFamily: "sans-serif", color: "#333" }}>
                      {planDetails[plan].price}
                    </div>
                    <div style={{ margin: "0", padding: "0", lineHeight: "1.4", fontSize: "14px" }}>{planDetails[plan].description}</div>
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
                        transition: "all 0.3s ease",
                        height: "40px"
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
                );
              })}
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