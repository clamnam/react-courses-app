import { useContext, createContext, useState } from "react";

const AuthContext = createContext(null);

export function useAuth() {
	// cusotom context to access current users auth data
	const value = useContext(AuthContext);
	return value;
}



export function AuthProvider(props) {
	// state variables to pass authentication data and alert data to children
	const [authenticated, setAuthenticated] = useState(false);
	const [alert, setAlert] = useState("");


	return (
		<AuthContext.Provider
			value={{
				alert,
				setAlert,
				authenticated,
				onAuthenticated: (auth, token) => {
					setAuthenticated(auth);
					if (auth && token) {
						localStorage.setItem("token", token);
					} else if (!auth) {
						localStorage.removeItem("token");
					}
				}
			}}

		>
            {props.children}
        </AuthContext.Provider>
	);
}
