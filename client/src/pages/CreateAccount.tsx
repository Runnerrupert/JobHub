import { FormEvent } from "react";
// import { useState, ChangeEvent } as well when ready for them -- TODO
// import Auth from '../utils/auth';
// import { CREATE_ACCOUNT } from '../utils/mutations';
import { Link } from "react-router-dom";

const CreateAccount = () => {

  // Checks if the user can be logged in based on information stored within the database
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  };
    
  return (
    <div>
      <button ><Link to='/'>Back</Link></button>
        <div>
            <form onSubmit={handleSubmit}>
              <h2>Create Account</h2>
              <div>
                <label>Email</label>
                <input></input>
              </div>
              <div>
                <label>Username</label>
                <input></input>
              </div>
              <div>
                <label>Password</label>
                <input></input>
              </div>
              <button type='submit'>Submit</button>
            </form>
        </div>
    </div>
  );
};


export default CreateAccount;