import React from "react";
import UploadForm from "./UploadForm";
import "./App.css";

function App() {
  return (
    <div className="app-root">
      <header>
  <img src="/servicecipher_horizontal_logo.png" alt="ServiceCipher logo" className="logo" />
  <h2>Customer facing invoice analysis</h2>
  <hr className="header-line" />
</header>
      <main>
        <UploadForm />
      </main>
    </div>
  );
}

export default App;