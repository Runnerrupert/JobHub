import { FormEvent, useState } from "react";
// import { ChangeEvent } as well when ready for them -- TODO
import { CREATE_ACCOUNT } from '../graphql/mutations';
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';

import Auth from '../utils/auth';
import '../styles/createAccount.css';

const CreateAccount = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const [createAccount, { loading, error }] = useMutation(CREATE_ACCOUNT);

    const navigate = useNavigate();
  // Checks if the user can be logged in based on information stored within the database
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const result = await createAccount({ variables: { input: { email, name, password }}});
            Auth.login(result.data.createAccount.token);
            navigate('/home');
        } catch (err) {
            console.error("Error creating account", err);
        }
    };
    
    return (
      <div className="create-account-container">
          <div className="create-account-card">
              <button className="back-button"><Link to="/">Back</Link></button>
              <form onSubmit={handleSubmit}>
                  <h2 className="create-account-title">Create Account</h2>
                  <div>
                      <label>Email:</label>
                      <input 
                          type="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          required
                      />
                  </div>
                  <div>
                      <label>Username:</label>
                      <input
                          type="text"
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          required
                      />
                  </div>
                  <div>
                      <label>Password:</label>
                      <input
                          type="password"
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          required
                      />
                  </div>
                  <button 
                      type="submit" 
                      disabled={loading}
                      className="submit-button">
                      {loading ? "Creating Account..." : "Submit"}
                  </button>
                  {error && <p>Error: {error.message}</p>}
              </form>
          </div>
      </div>
  );
};

export default CreateAccount;