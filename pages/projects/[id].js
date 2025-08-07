import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function ProjectForm() {
  const router = useRouter();
  const { id } = router.query;
  const isNew = id === "new";

  const { register, handleSubmit, setValue, reset } = useForm();
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Fetch clients for dropdown
    api.get("/clients").then(res => setClients(res.data));

    if (!isNew && id) {
      api.get(`/projects/${id}`)
        .then(res => {
          // Pre-fill form
          reset({
            title: res.data.title,
            description: res.data.description,
            status: res.data.status,
            deadline: res.data.deadline ? res.data.deadline.split("T")[0] : "",
            client: res.data.client?._id
          });
        })
        .catch(err => {
          alert("Error loading project details");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id, isNew, reset]);

  const onSubmit = async (data) => {
    try {
      if (isNew) {
        await api.post("/projects", data);
      } else {
        await api.put(`/projects/${id}`, data);
      }
      router.push("/projects");
    } catch (err) {
      alert(err.response?.data?.message || "Error saving project");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="hero-container">
      <div className="hero-card">
        <h1>{isNew ? "Add Project" : "Edit Project"}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("title")} placeholder="Title" required />
          <textarea {...register("description")} placeholder="Description" />
          <select {...register("status")} required>
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <input type="date" {...register("deadline")} />
          <select {...register("client")} required>
            <option value="">Select Client</option>
            {clients.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
          <button type="submit" className="btn">
            {isNew ? "Create Project" : "Update Project"}
          </button>
        </form>
      </div>
    </div>
  );
}
