import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";

export const Signup = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
       event.preventDefault();
       const resp = await actions.signUp(email, password);
       if (resp) {
        console.log("Signup successful");
        alert("Signup Successful, able to login")
        navigate("/login")
       } else {
        setError(resp.msg || "Signup failed")
        alert(resp.msg || "Signup failed, Please try again")
       }
    }

    return (
        <div className="container text-center mt-5">
            <h1>Sign Up</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required>
                    </input>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    value={password}
                    id="password"
                    required></input>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div className="mt-3 text-center">
                <p>
                    Already have an account? {" "}
                    <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};