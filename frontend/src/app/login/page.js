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
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const existingToken = getToken();
    if (existingToken) {
      router.push("/dashboard");
    }
  }, [router]);

  async function handleRequestOtp(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await requestOtp(name, mobileNumber, email);
      setStep("otp");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleVerifyOtp(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const data = await verifyOtp(email, code);
      setToken(data.access_token);
      localStorage.setItem("access_token", data.access_token);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  }

  const inputClasses =
    "w-full border border-line bg-paper-raised px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 outline-none transition-colors focus:border-blueprint";

  if (token) {
    return (
      <main className="blueprint-grid flex min-h-[calc(100vh-4rem)] items-center justify-center px-5">
        <div className="w-full max-w-sm border border-line bg-paper-raised p-8 text-center">
          <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center border border-blueprint text-blueprint">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
              <path d="M4 12l5 5L20 6" />
            </svg>
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-xl font-semibold text-ink">
            You&rsquo;re in
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            Welcome, {name || "back"}. Taking you to your dashboard…
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="blueprint-grid flex min-h-[calc(100vh-4rem)] items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <p className="mb-2 text-center font-[family-name:var(--font-mono)] text-xs tracking-wide text-blueprint">
          [ ACCOUNT ]
        </p>
        <h1 className="mb-8 text-center font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-ink">
          {step === "form" ? "Sign in to Elventex" : "Check your email"}
        </h1>

        <div className="border border-line bg-paper-raised p-7">
          {step === "form" && (
            <>
              <form onSubmit={handleRequestOtp} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-ink-soft">
                    Name
                  </label>
                  <input
                    className={inputClasses}
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-ink-soft">
                    Mobile number
                  </label>
                  <input
                    className={inputClasses}
                    placeholder="10-digit mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-ink-soft">
                    Email
                  </label>
                  <input
                    className={inputClasses}
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full border border-ink bg-ink py-2.5 text-sm font-medium text-paper transition-colors hover:bg-blueprint hover:border-blueprint disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Sending code…" : "Send verification code"}
                </button>
              </form>

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-line" />
                <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-wide text-ink-soft">
                  OR
                </span>
                <div className="h-px flex-1 bg-line" />
              </div>

              <a
                href="http://localhost:8000/auth/google/login"
                className="flex w-full items-center justify-center gap-2.5 border border-line bg-paper py-2.5 text-sm font-medium text-ink transition-colors hover:border-blueprint hover:text-blueprint"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4">
                  <path
                    fill="#4285F4"
                    d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.87c2.27-2.09 3.58-5.17 3.58-8.82Z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.87-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.1A12 12 0 0 0 12 24Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28v-3.1H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.38l4-3.1Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.27 6.62l4 3.1C6.22 6.86 8.87 4.75 12 4.75Z"
                  />
                </svg>
                Continue with Google
              </a>
            </>
          )}

          {step === "otp" && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <p className="text-sm text-ink-soft">
                We sent a 6-digit code to{" "}
                <span className="font-medium text-ink">{email}</span>.
              </p>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-ink-soft">
                  Verification code
                </label>
                <input
                  className={`${inputClasses} text-center font-[family-name:var(--font-mono)] text-lg tracking-[0.5em]`}
                  placeholder="000000"
                  inputMode="numeric"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full border border-ink bg-ink py-2.5 text-sm font-medium text-paper transition-colors hover:bg-blueprint hover:border-blueprint disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Verifying…" : "Verify & continue"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep("form");
                  setCode("");
                  setError("");
                }}
                className="w-full text-center text-xs text-ink-soft transition-colors hover:text-blueprint"
              >
                ← Use a different email
              </button>
            </form>
          )}

          {error && (
            <p className="mt-4 border border-signal/40 bg-signal/10 px-3 py-2 text-xs text-ink">
              {error}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}