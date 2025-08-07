"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      {/* Brand Logo changes based on login state */}
      {user ? (
        <Link href="/" style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          DASHBOARD
        </Link>
      ) : (
        <Link href="/" style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          WORKCITY
        </Link>
      )}

      {/* Desktop Links */}
      <div className="desktop-links" style={{ display: "flex", gap: "15px" }}>
        {!user ? (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
          </>
        ) : (
          <>
            <Link href="/clients">Clients</Link>
            <Link href="/projects">Projects</Link>
            <button
              onClick={handleLogout}
              className="btn btn-red"
              style={{ padding: "5px 10px", fontSize: "0.9rem" }}
            >
              Logout
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-btn"
        style={{ display: "none" }}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {!user ? (
            <>
              <Link href="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link href="/signup" onClick={() => setMenuOpen(false)}>Signup</Link>
            </>
          ) : (
            <>
              <Link href="/clients" onClick={() => setMenuOpen(false)}>Clients</Link>
              <Link href="/projects" onClick={() => setMenuOpen(false)}>Projects</Link>
              <button
                onClick={handleLogout}
                className="btn btn-red"
                style={{ width: "100%" }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
