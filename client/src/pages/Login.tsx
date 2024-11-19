import { useState, FormEvent, ChangeEvent } from "react";
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGIN_MANAGER } from '../utils/mutations';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, { loading, error }] = useMutation(LOGIN_MANAGER);
    const navigate = useNavigate();
  // Checks if the user can be logged in based on information stored within the database

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
        const result = await login({ variables: { email, password }, });
        if (result.data?.login?.token) {
          Auth.login(result.data.login.token);
          navigate("/home")
        } else {
          throw new Error("Login Failed: no token received");
        }
    } catch (err) {
        console.log("Login Failed", err);
    }
  };
    
  return (
    <div>
      <button><Link to='/'>Back</Link></button>
        <div>
            <form onSubmit={handleSubmit}>
              <h2>Login</h2>
              <div>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    required
                />
              </div>
              <div>
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    required
                />
              </div>
              <button type='submit' disabled={loading}> {loading ? "Logging in..." : "Submit"} </button>
              {error && <p className="error">Error: {error.message}</p>}
            </form>
        </div>
    </div>
  );
};

export default Login;