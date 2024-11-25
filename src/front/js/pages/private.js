import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Private = () => {
    const {actions} = useContext(Context)
    const [isAuthenticated, setIsAuthenticated] = useState("Pending")

    useEffect(()=> {
        let authenticate = async () => {
            try {
                const result = await actions.goPrivate();
                setIsAuthenticated(result ? "Yes" : "No")
            }
            catch (error) {
                console.error("Error occurred during authentication", error)
                setIsAuthenticated("No")
            }
        };

        authenticate();
    }, [actions])

    switch(isAuthenticated) {
        case "Pending":
            return (
                <div className="container text-center mt-5">
                    <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                </div>
            )
        case "Yes":
            return (
                <div className="container text-center mt-5">
                    <h1>
                    <i className="fa-solid fa-user-secret"></i>
                    Super Secret Page
                    <i className="fa-solid fa-user-secret"></i>
                    </h1>
                    <p>Only you can see this page</p>

                </div>
            )
        case "No":
            return (
                <div className="container text-center mt-5">
                    <h1>
                    <i className="fa-solid fa-user-slash fa-shake"></i>
                    Where you going?
                    <i className="fa-solid fa-user-slash fa-shake"></i>
                    </h1>
                    <p>Please login to access private page</p>
                    <Link to="/login"><p>Login</p></Link>
                </div>
            )
    }
}