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
          <div className="custom-pricing-cards">
            <h2 style={{ textAlign: "center" }}>Choose Your Plan</h2>
            <div
              className="card-grid"
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "16px",
                flexWrap: "wrap",
                margin: "2rem 0",
              }}
            >
              {[
                {
                  name: "Free",
                  price: "$0",
                  desc: "Always free. Great for trying out ServiceCipher.",
                  key: "free",
                },
                {
                  name: "Basic",
                  price: "$66.66/mo",
                  desc: "Up to 200 reports/mo. Great for solo or single-location shops.",
                  key: "basic",
                },
                {
                  name: "Pro",
                  price: "$125/mo",
                  desc: "Up to 500 reports/mo. Ideal for busy shops or growing teams.",
                  key: "pro",
                },
              ].map((plan) => (
                <div
                  key={plan.key}
                  style={{
                    border: "1px solid #cefee1",
                    borderRadius: "10px",
                    padding: "20px",
                    margin: "20px",
                    maxWidth: "300px",
                    background: "#fff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    flex: "1 1 250px",
                    minWidth: "250px",
                  }}
                >
                  <h3>{plan.name}</h3>
                  <h2 style={{ margin: "10px 0" }}>{plan.price}</h2>
                  <p>{plan.desc}</p>
                  <a
                    href={`https://accounts.servicecipher.com/sign-up?plan=${
                      plan.name === "Free" ? "free" : plan.name === "Basic" ? "basic" : "professional"
                    }&redirect_url=https://app.servicecipher.com`}
                    style={{
                      display: "inline-block",
                      marginTop: "10px",
                      padding: "10px 20px",
                      backgroundColor: "#a1d4c5",
                      color: "#000000",
                      borderRadius: "6px",
                      textDecoration: "none",
                      fontWeight: "600",
                    }}
                  >
                    Choose Plan
                  </a>
                </div>
              ))}
            </div>
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