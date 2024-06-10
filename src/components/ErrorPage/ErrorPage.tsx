import React from "react"

export function ErrorPage() {
  return (
    <div className="error-page">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100dvh",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h1>Link error</h1>
        <p>Page not found.</p>
      </div>
    </div>
  )
}
