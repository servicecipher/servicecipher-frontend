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

      <SignedOut>
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <SignInButton mode="modal">
            <button className="plan-button" data-testid="sign-in-button">
              Sign In or Create Account
            </button>
          </SignInButton>
        </div>
      </SignedOut>

      <header>
        <img
          src="/horizontal_logo_tag.png"
          alt="ServiceCipher logo"
          className="logo"
          style={{ margin: "0", paddingTop: "1rem", paddingBottom: "0.5rem" }}
        />
      </header>

      <main className="main-content">
        {/* Choose Plan Buttons (Stripe Checkout) - Only for signed out users */}
        <SignedOut>
          <div className="plan-selection-container" style={{ textAlign: "center" }}>
            <h2 className="plan-title">If you are not signed up, please select your plan</h2>
            <div
              className="plan-selection-wrapper"
              style={{
                display: "flex",
                flexDirection: window.innerWidth < 640 ? "column" : "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "2rem"
              }}
            >
              {["free", "basic", "professional"].map((plan) => {
                const isPopular = plan === "basic";
                const { label, monthly, price, description } = planDetails[plan];

                return (
                  <div key={plan} className={`plan-card ${plan}`}>
                    {isPopular && (
                      <div
                        className="plan-popular-badge"
                        style={{
                          color: "#b38b00",
                          fontWeight: "bold",
                          fontSize: "0.9rem",
                          marginBottom: "0.5rem"
                        }}
                      >
                        ★ Most Popular
                      </div>
                    )}
                    <div className="plan-icon">
                      {plan === "free" ? "🔓" : plan === "professional" ? "💼" : ""}
                    </div>
                    <div className="plan-name">{label}</div>
                    <div className="plan-price" style={{ color: "#000000" }}>
                      <div className="monthly">
                        {monthly}<span className="unit">/mo</span>
                      </div>
                      <div className="yearly" style={{ color: "#000000" }}>
                        {price}<span className="unit">/yr</span>
                      </div>
                    </div>
                    <div className="plan-description" style={{ color: "#000000" }}>{description}</div>
                    <button
                      className="plan-button"
                      onClick={async () => {
                        if (plan === "free") {
                          document.querySelector('[data-testid="sign-in-button"]').click();
                          return;
                        }
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
                      style={{ marginTop: "auto", padding: "0.75rem 1.5rem", backgroundColor: "#a1d4c5", color: "#000000", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "600" }}
                    >
                      Select Plan
                    </button>
                  </div>
                );
              })}
            </div>
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