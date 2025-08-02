import React from "react";
import UploadForm from "./UploadForm";
import "./App.css";
import { ClerkProvider, SignedIn, SignedOut, SignIn, UserButton, useUser } from "@clerk/clerk-react";

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
          <SignIn />
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