import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useState } from "react";

export const Home = () => {
	const { store, actions } = useContext(Context);
    const {email, setEmail} = useState("");
	const {password, setPassword} = useState("");

	const login = () => {
		fetch('https://fantastic-telegram-7vrwpp74rqg43pqwv-3001.app.github.dev/token', {
			method: "POST",
			headers: {"Content-Type": "application/json" },
			body: JSON.stringify({email, password})
		})
		.then(resp => resp.json())
        .then(data => {
			console.log(data);
			localStorage.setItem ("jwt-token", data.token)
	})
        .catch(err => console.log(err))
	}

	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!!</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
		</div>
	);
};