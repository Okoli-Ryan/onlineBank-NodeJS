import React, { useState } from "react";

export default function Verification() {
  const [value, setValue] = useState(0);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "11rem",
      }}>
      <h2 style={{ textAlign: "center", color: "white" }}>
        Enter the verification pin sent to your email
      </h2>
      <input
        type="text"
        maxLength={6}
        autoFocus
        minLength={6}
        onChange={(e) => setValue(e.target.value)}
        style={{
          maxWidth: "10rem",
          padding: "8px 40px",
          margin: "0 auto 1rem auto",
          textAlign: "center",
        }}
      />
      <button className="button" style={{ fontWeight: "500" }}>
        Submit
      </button>
    </div>
  );
}
