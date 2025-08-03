import React from "react";
import UploadForm from "./UploadForm";
import "./App.css";
import { ClerkProvider, SignedIn, SignedOut, SignIn, UserButton, useUser, PricingTable } from "@clerk/clerk-react";

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
          <section className="pricing-section">
            <h2>Choose Your Plan</h2>
            <PricingTable
              appearance={{
                variables: {
                  colorPrimary: "#a1d4c5",
                  colorText: "#000000",
                  fontFamily: "Inter, sans-serif",
                  borderRadius: "8px",
                },
                elements: {
                  pricingCard: {
                    backgroundColor: "#ffffff",
                    border: "1px solid #cefee1",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  },
                  headerTitle: {
                    fontSize: "1.2rem",
                    fontWeight: "600",
                  },
                  priceAmount: {
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#000000",
                  },
                  subscribeButton: {
                    backgroundColor: "#a1d4c5",
                    color: "#000000",
                    borderRadius: "6px",
                  },
                },
              }}
            />
          </section>
          <SignIn
            appearance={{
              variables: {
                colorPrimary: "#a1d4c5",
                colorText: "#000000",
                fontFamily: "Inter, sans-serif",
              },
              elements: {
                card: {
                  boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                  borderRadius: "8px",
                },
                logoBox: {
                  display: "none",
                },
                formButtonPrimary: {
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  borderRadius: "6px",
                },
              },
            }}
          />
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