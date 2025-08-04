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
          style={{ marginBottom: "2rem" }}
        />
       
      </header>

      <main className="main-content">
        {/* Choose Plan Buttons (Stripe Checkout) - Only for signed out users */}
        <SignedOut>
          <div className="plan-selection-container" style={{ textAlign: "center" }}>
            <h2 className="plan-title">If you are not signed up, please select your plan</h2>
            <div className="plan-selection-wrapper" style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
              {["free", "basic", "professional"].map((plan) => {
                const isPopular = plan === "basic";
                const { label, monthly, price, description } = planDetails[plan];

                return (
                  <div key={plan} className={`plan-card ${plan}`} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", gap: "1rem", position: "relative", width: "250px" }}>
                    {isPopular && (
                      <div className="plan-popular-badge" style={{ position: "absolute", top: "1rem", right: "1rem", backgroundColor: "#6b46c1", color: "white", padding: "0.25rem 0.75rem", borderRadius: "9999px", fontWeight: "bold", fontSize: "0.75rem" }}>
                        ★ Most Popular
                      </div>
                    )}
                    <div className="plan-icon" style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
                      {plan === "free" ? "🔓" : plan === "professional" ? "💼" : ""}
                    </div>
                    <div className="plan-name" style={{ fontWeight: "bold", fontSize: "1.25rem" }}>{label}</div>
                    <div className="plan-price" style={{ fontWeight: "700", fontSize: "1.5rem", color: "#6b46c1" }}>
                      <div className="monthly">
                        {monthly}<span className="unit" style={{ fontWeight: "400", fontSize: "1rem" }}>/mo</span>
                      </div>
                      <div className="yearly" style={{ fontWeight: "400", fontSize: "0.875rem", color: "#718096" }}>
                        {price}<span className="unit">/yr</span>
                      </div>
                    </div>
                    <div className="plan-description" style={{ color: "#718096", fontSize: "0.9rem", textAlign: "center" }}>{description}</div>
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
                      style={{ marginTop: "auto", padding: "0.75rem 1.5rem", backgroundColor: "#6b46c1", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "600" }}
                    >
                      Select Plan
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
              <button className="plan-button">
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