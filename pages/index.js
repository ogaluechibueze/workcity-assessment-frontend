import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="hero-container">
      <div className="hero-card">
        <h1>Welcome to Workcity Dashboard</h1>
        <p style={{ margin: "15px 0", color: "#555" }}>
          Manage your clients and projects efficiently with our full-stack application.
        </p>

        {!user ? (
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <Link href="/login" className="btn btn-green">Login</Link>
            <Link href="/signup" className="btn">Signup</Link>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <Link href="/clients" className="btn">Clients Dashboard</Link>
            <Link href="/projects" className="btn" style={{ background: "#9333ea" }}>
              Projects Dashboard
            </Link>
            <button onClick={logout} className="btn btn-red">Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}
