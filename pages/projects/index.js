import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    api.get("/projects").then(res => setProjects(res.data));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await api.delete(`/projects/${id}`);
      setProjects(projects.filter(p => p._id !== id));
    } catch (err) {
      alert("Error deleting project");
    }
  };

  return (
    <div className="hero-container" style={{ alignItems: "flex-start", paddingTop: "40px" }}>
      <div className="hero-card" style={{ maxWidth: "900px", width: "100%" }}>
        <h1>Projects Dashboard</h1>
        {user && (
          <Link href="/projects/new" className="btn" style={{ marginBottom: "15px", display: "inline-block" }}>
            Add Project
          </Link>
        )}
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Client</th>
              {user && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {projects.map(p => (
              <tr key={p._id}>
                <td>{p.title}</td>
                <td>{p.status}</td>
                <td>{p.client?.name}</td>
                {user && (
                  <td>
                    <Link href={`/projects/${p._id}`} className="btn btn-green" style={{ marginRight: "5px" }}>
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p._id)}
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
