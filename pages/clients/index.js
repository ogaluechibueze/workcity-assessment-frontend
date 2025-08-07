import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    api.get("/clients").then(res => setClients(res.data));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this client?")) return;
    try {
      await api.delete(`/clients/${id}`);
      setClients(clients.filter(c => c._id !== id));
    } catch (err) {
      alert("Error deleting client");
    }
  };

  return (
    <div className="hero-container" style={{ alignItems: "flex-start", paddingTop: "40px" }}>
      <div className="hero-card" style={{ maxWidth: "900px", width: "100%" }}>
        <h1>Clients Dashboard</h1>
        {user && (
          <Link href="/clients/new" className="btn" style={{ marginBottom: "15px", display: "inline-block" }}>
            Add Client
          </Link>
        )}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              {user && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {clients.map(c => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                {user && (
                  <td>
                    <Link href={`/clients/${c._id}`} className="btn btn-green" style={{ marginRight: "5px" }}>
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="btn btn-red"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
