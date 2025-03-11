// import { useState, useContext } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import AuthContext from "../../login/AuthContext";
// import "../../styles/details.css";

// const Login = () => {
//     const [credentials, setCredentials] = useState({ email: "", password: "" });
//     const { login } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setCredentials({ ...credentials, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await fetch("http://localhost:5000/api/auth/login", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(credentials),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 login(data.user, data.token);
//                 localStorage.setItem("token", data.token);
//                 navigate("/dashboard");
//             } else {
//                 alert(data.message || "Invalid credentials. Please try again.");
//             }
//         } catch (error) {
//             console.error("Login error:", error);
//             alert("Something went wrong. Please try again.");
//         }
//     };

//     return (
//         <div 
//             style={{
//                 backgroundImage: "url('/logini.jpeg')",
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 backgroundRepeat: "no-repeat",
//                 minHeight: "100vh",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//             }}
//         >
//             <div 
//                 style={{
//                     background: "rgba(255, 255, 255, 0.29)",
//                     padding: "20px",
//                     borderRadius: "10px",
//                     width: "400px",
//                     textAlign: "center",
//                 }}
//             >
//                 <img 
//                     src="/Animationlogin.gif" 
//                     alt="Login Animation" 
//                     style={{ width: "100px", marginBottom: "10px" }}
//                 />
//                 <div style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>Login</div>
//                 <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//                 <div>
//     <input name="email" type="email" required onChange={handleChange} placeholder="Email Address" className="auth-input" />
// </div>
// <div>
//     <input name="password" type="password" required onChange={handleChange} placeholder="Password" className="auth-input" />
// </div>
//                     <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
//                         <label>
//                             <input type="checkbox" /> Remember me
//                         </label>
//                         <a href="#">Forgot password?</a>
//                     </div>
//                     <button type="submit" style={{ padding: "10px", background: "#4CAF50", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
//                         Login
//                     </button>
//                     <p style={{ fontSize: "14px" }}>
//                         Not a member? <Link to="/register">Signup now</Link>
//                     </p>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../login/AuthContext";
import "../../styles/details.css";

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };


  const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (response.ok) {
                login(data.user, data.token);
                localStorage.setItem("token", data.token);
                navigate("/dashboard");
            } else {
                alert(data.message || "Invalid credentials. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Something went wrong. Please try again.");
        }
    };
    
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setError("");  

    //     try {
    //         const response = await fetch("http://localhost:5000/api/auth/login", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(credentials),
    //         });

    //         const data = await response.json();

    //         if (!response.ok) {
    //             throw new Error(data.message || "Login failed");
    //         }

        
    //         if (["farmer", "investor"].includes(data.role) && !data.isVerified) {
    //             setError("Your account is not verified. Please wait for admin approval.");
    //             return;
    //         }

           
    //         login(data.user, data.token);
    //         localStorage.setItem("token", data.token);

            
    //         if (data.role === "admin") {
    //             navigate("/admin-dashboard");
    //         } else if (data.role === "farmer") {
    //             navigate("/farmer-dashboard");
    //         } else if (data.role === "investor") {
    //             navigate("/investor-dashboard");
    //         } else {
    //             navigate("/dashboard");
    //         }
    //     } catch (error) {
    //         console.error("Login error:", error);
    //         setError(error.message);
    //     }
    // };

    return (
        <div 
            style={{
                backgroundImage: "url('/logini.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div 
                style={{
                    background: "rgba(255, 255, 255, 0.29)",
                    padding: "20px",
                    borderRadius: "10px",
                    width: "400px",
                    textAlign: "center",
                }}
            >
                <img 
                    src="/Animationlogin.gif" 
                    alt="Login Animation" 
                    style={{ width: "100px", marginBottom: "10px" }}
                />
                <div style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>Login</div>

                {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>} 

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div>
                        <input 
                            name="email" 
                            type="email" 
                            required 
                            onChange={handleChange} 
                            placeholder="Email Address" 
                            className="auth-input" 
                        />
                    </div>
                    <div>
                        <input 
                            name="password" 
                            type="password" 
                            required 
                            onChange={handleChange} 
                            placeholder="Password" 
                            className="auth-input" 
                        />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                        <a href="#">Forgot password?</a>
                    </div>
                    <button 
                        type="submit" 
                        style={{ padding: "10px", background: "#4CAF50", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
                    >
                        Login
                    </button>
                    <p style={{ fontSize: "14px" }}>
                        Not a member? <Link to="/register">Signup now</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
