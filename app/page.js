export default function Home() {
  return (
    <main style={{
      background: "black",
      color: "white",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      textAlign: "center",
      padding: "20px"
    }}>
      <h1 style={{ fontSize: "3rem", maxWidth: "900px" }}>
        Your business doesn’t need more tools.
        <br />
        It needs something that runs them.
      </h1>

      <p style={{ marginTop: "1rem", opacity: 0.7 }}>
        StudioFlows identifies what matters, completes the work,
        and executes across your systems.
      </p>

      <div style={{ marginTop: "2rem" }}>
        <input
          placeholder="Enter your email"
          style={{
            padding: "12px",
            width: "250px",
            marginRight: "10px",
            background: "#111",
            border: "1px solid #333",
            color: "white"
          }}
        />
        <button style={{
          padding: "12px 20px",
          background: "white",
          color: "black",
          fontWeight: "bold"
        }}>
          Request Access
        </button>
      </div>

      <p style={{ marginTop: "1rem", fontSize: "0.8rem", opacity: 0.5 }}>
        Invite-only. Early access.
      </p>
    </main>
  );
}
