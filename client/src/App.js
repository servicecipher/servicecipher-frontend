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

      <main className="main-content">
        {/* Choose Plan Buttons (Stripe Checkout) - Only for signed out users */}
        <SignedOut>
          <div className="plan-selection-container">
            <h2 className="plan-title">If you are not signed up, please select your plan</h2>
            <div className="plan-selection-wrapper">
              {["free", "basic", "professional"].map((plan) => {
                let planClass = "plan-card ";
                if (plan === "free") planClass += "plan-free";
                else if (plan === "basic") planClass += "plan-basic";
                else if (plan === "professional") planClass += "plan-professional";

                return (
                  <div key={plan} className={planClass}>
                    <div className="plan-icon" style={plan === "basic" ? { color: "#b8860b", fontWeight: "bold" } : {}}>
                      {plan === "free" ? "🔓" : plan === "basic" ? "★ Most Popular" : plan === "professional" ? "💼" : ""}
                    </div>
                    <div className="plan-name">{planDetails[plan].label}</div>
                    <div className="plan-pricing">
                      <div className="plan-monthly">
                        {planDetails[plan].monthly}<span className="plan-monthly-suffix">/mo</span>
                      </div>
                      <div className="plan-yearly">
                        {planDetails[plan].price}/yr
                      </div>
                    </div>
                    <div className="plan-description">{planDetails[plan].description}</div>
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