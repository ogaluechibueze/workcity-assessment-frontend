import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function ClientForm() {
  const router = useRouter();
  const { id } = router.query;
  const isNew = id === "new";

  const { register, handleSubmit, setValue, reset } = useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isNew && id) {
      api.get(`/clients/${id}`)
        .then(res => {
          reset(res.data); // Pre-fill form
        })
        .catch(err => {
          alert("Error loading client details");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id, isNew, reset]);

  const onSubmit = async (data) => {
    try {
      if (isNew) {
        await api.post("/clients", data);
      } else {
        await api.put(`/clients/${id}`, data);
      }
      router.push("/clients");
    } catch (err) {
      alert(err.response?.data?.message || "Error saving client");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="hero-container">
      <div className="hero-card">
        <h1>{isNew ? "Add Client" : "Edit Client"}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("name")} placeholder="Name" required />
          <input {...register("email")} placeholder="Email" />
          <input {...register("phone")} placeholder="Phone" />
          <button type="submit" className="btn">
            {isNew ? "Create Client" : "Update Client"}
          </button>
        </form>
      </div>
    </div>
  );
}
