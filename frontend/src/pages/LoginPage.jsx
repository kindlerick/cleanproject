import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";



import "../styles/admin.css";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/api/auth/me", {
            credentials: "include"
        })
            .then((response) => {
                if (response.ok) {
                    setIsLoggedIn(true);
                    navigate("/admin");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    async function handleSubmit(event) {
        
        event.preventDefault();

        setError("");

        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    username,
                    password
                })
            });

            const data = await response.json();

            if (response.ok) {
                setIsLoggedIn(true);
                navigate("/admin");
            } else {
                setError(data.message);
            }

        } catch (error) {
            console.error(error) 
            setError("Unable to connect to the server");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main>
            <h1>Login</h1>

            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                </button>
            </form>

            {isLoggedIn && <p>Logged in successfully.</p>}
        </main>
    );
}

export default LoginPage;