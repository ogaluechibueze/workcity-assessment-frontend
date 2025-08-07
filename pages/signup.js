import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Signup() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/signup", data);
      login(res.data.token);
      router.push("/clients");
    } catch (err) {
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="hero-container">
      <div className="hero-card">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("name")} placeholder="Full Name" required />
          <input {...register("email")} placeholder="Email" required />

          <div style={{ position: "relative" }}>
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              style={{ paddingRight: "40px" }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "14px",
                color: "#2563eb"
              }}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button type="submit" className="btn">Signup</button>
        </form>
      </div>
    </div>
  );
}
