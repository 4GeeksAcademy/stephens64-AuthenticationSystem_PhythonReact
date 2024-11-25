const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

		},
		actions: {

			signUp: async (email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							email: email.toLowerCase(),
							password: password
						})
					});
					const data = await resp.json();
					console.log(data);
					return data
				} catch (error) {
					console.log("Signup error", error);
					throw error;
				}
			},
			login: async (email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/token", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							email: email.toLowerCase(),
							password: password
						})
					});
					if (!resp.ok) {
						console.log("login failed with status:", resp.status)
						return false;
					}

					const data = await resp.json();
					sessionStorage.setItem("token", data.token);
					sessionStorage.setItem("user_id", data.user_id);
					return true;
				} catch (error) {
					console.log("error at login", error);
					return false;
				}
			},
			goPrivate: async () => {
				const token = sessionStorage.getItem("token");
				if (!token) {
					console.error("authentication token not found")
					return false
				}
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/private", {
						method: "GET",
						headers: { 
							"Content-Type": "application/json" , 
							"Authorization": `Bearer ${token}`
						},
					});
					const data = await resp.json();
					if (!resp.ok) {
						return false;
					} else {
						console.log(data)
						return true
					}
				} catch (error) {
					console.log(error)
					return false
				}
			}
		}
	};
};

export default getState;