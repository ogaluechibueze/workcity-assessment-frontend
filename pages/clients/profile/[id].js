import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/lib/axios";

export default function ClientProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [client, setClient] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (id) {
      api.get(`/clients/${id}`).then(res => setClient(res.data));
      api.get(`/projects/client/${id}`).then(res => setProjects(res.data));
    }
  }, [id]);

  if (!client) return <p className="p-6">Loading...</p>;

  return (
    <div className="hero-container" style={{ alignItems: "flex-start", paddingTop: "40px" }}>
      <div className="hero-card" style={{ maxWidth: "900px", width: "100%" }}>
      <h1 className="text-2xl font-bold">{client.name}</h1>
      <p>Email: {client.email}</p>
      <p>Phone: {client.phone}</p>

      <h2 style={{ marginTop: "20px" }}>Projects</h2>
      <ul className="space-y-2 mt-2">
        {projects.map(p => (
          <li key={p._id} className="border p-2">
            <p className="font-semibold">{p.title}</p>
            <p>Status: {p.status}</p>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}
