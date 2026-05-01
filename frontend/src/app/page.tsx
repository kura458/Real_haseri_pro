"use client";

import { useState } from "react";
import Script from "next/script";
import { useLogin, useRegister, useAdminLogin, useAdminVerifyOtp } from "@/src/features/auth";

declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initCodeClient: (config: {
            client_id: string;
            scope: string;
            ux_mode: string;
            callback: (response: { code: string }) => void;
          }) => { requestCode: () => void };
        };
      };
    };
  }
}

export default function HomePage() {
  const { login, loading: loginLoading, error: loginError } = useLogin();
  const { register, loading: regLoading, error: regError } = useRegister();
  const { login: adminLogin, loading: adminLoading, error: adminError } = useAdminLogin();
  const { verifyOtp, loading: otpLoading, error: otpError } = useAdminVerifyOtp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("customer");
  const [adminId, setAdminId] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [result, setResult] = useState("");

  const handleGoogleLogin = () => {
    if (!window.google) return;

    const client = window.google.accounts.oauth2.initCodeClient({
      client_id: "186443492838-dpvo5injoqch2l4c2vf8o1s4km9f71k6.apps.googleusercontent.com",
      scope: "email profile openid",
      ux_mode: "popup",
      callback: async (response) => {
        try {
          const res = await fetch("http://localhost:8000/api/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code: response.code }),
            credentials: "include",
          });
          const data = await res.json();
          setResult(JSON.stringify(data, null, 2));
        } catch {
          setResult("Google login failed");
        }
      },
    });
    client.requestCode();
  };

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />

      <div style={{ padding: 20 }}>
        <h1>Haseri Test</h1>

        <h2>Register</h2>
        <input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="customer">Customer</option>
          <option value="provider">Provider</option>
        </select>
        <button disabled={regLoading} onClick={async () => {
          await register({ first_name: firstName, last_name: lastName, email, password, role: role as "customer" | "provider" });
          setResult("Registered!");
        }}>{regLoading ? "Loading..." : "Register"}</button>
        {regError && <p style={{ color: "red" }}>{regError}</p>}
        <hr />

        <h2>Login</h2>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button disabled={loginLoading} onClick={() => login({ email, password })}>{loginLoading ? "Loading..." : "Login"}</button>
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
        <hr />

        <h2>Google Login</h2>
        <button onClick={handleGoogleLogin}>Continue with Google</button>
        <hr />

        <h2>Admin Login</h2>
        <input placeholder="Admin Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button disabled={adminLoading} onClick={async () => {
          const res = await adminLogin({ email, password });
          if (res) {
            setAdminId(res.admin_id);
            setResult("OTP sent to email");
          }
        }}>{adminLoading ? "Loading..." : "Admin Login"}</button>
        {adminError && <p style={{ color: "red" }}>{adminError}</p>}
        <hr />

        <h2>Admin Verify OTP</h2>
        <input placeholder="Admin ID" value={adminId} onChange={(e) => setAdminId(e.target.value)} />
        <input placeholder="OTP Code" value={otpCode} onChange={(e) => setOtpCode(e.target.value)} />
        <button disabled={otpLoading} onClick={() => verifyOtp({ admin_id: adminId, code: otpCode })}>{otpLoading ? "Loading..." : "Verify OTP"}</button>
        {otpError && <p style={{ color: "red" }}>{otpError}</p>}
        <hr />

        <h3>Result:</h3>
        <pre>{result}</pre>
      </div>
    </>
  );
}