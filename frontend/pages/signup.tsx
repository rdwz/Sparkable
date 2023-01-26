import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function Signup() {
  const [ email, setEmail ] = useState("");
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ message, setMessage ] = useState("");

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;

    const response = await fetch(`${baseUrl}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    });

    const result = await response.json();
    setMessage(result.message);

    if (response.ok) {
      router.push("/");
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Butterfy</title>
        <meta name="description" content="Generated by butterfy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1>Butterfy</h1>
        <div className="button">
          <Link href="/signin">
            <button>Login</button>
          </Link>
        </div>
      </header>
      <main>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Your email address"
          />
          <br />
          <br />
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Your username"
          />
          <br />
          <br />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            pattern=".{8,}"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Your password"
            title="Password must be at least 8 characters"
          />
          <br />
          <br />
          <button type="submit" disabled={!email || !username || !password}>
            Sign up
          </button>
          {message && <p id="message">{message}</p>}
        </form>
      </main>
    </div>
  );
}
