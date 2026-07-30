"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { requestOtp, verifyOtp } from "@/lib/api";
import { getToken } from "@/lib/auth";

export default function Login() {
  const router = useRouter();
  const [step, setStep] = useState("form"); // "form" | "otp"
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const existingToken = getToken();
    if (existingToken) {
      router.push("/dashboard");
    }
  }, [router]);

  async function handleRequestOtp(e) {
    e.preventDefault();
    setError("");
    try {
      await requestOtp(name, mobileNumber, email);
      setStep("otp");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleVerifyOtp(e) {
    e.preventDefault();
    setError("");
    try {
      const data = await verifyOtp(email, code);
      setToken(data.access_token);
      localStorage.setItem("access_token", data.access_token);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  if (token) {
    return (
      <main>
        <h1>Logged in!</h1>
        <p>Welcome, {name}. Redirecting to your dashboard...</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Login</h1>

      {step === "form" && (
        <>
          <form onSubmit={handleRequestOtp}>
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <br />
            <input
              placeholder="Mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
            <br />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <button type="submit">Send OTP</button>
          </form>

          <p>— or —</p>
          <a href="http://localhost:8000/auth/google/login">
            Sign in with Google
          </a>
        </>
      )}

      {step === "otp" && (
        <form onSubmit={handleVerifyOtp}>
          <p>Enter the code sent to {email}</p>
          <input
            placeholder="6-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <br />
          <button type="submit">Verify</button>
        </form>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </main>
  );
}