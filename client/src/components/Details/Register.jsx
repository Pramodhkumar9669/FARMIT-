import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import '../../styles/details.css'
const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ 
        firstName: "", 
        lastName: "", 
        email: "", 
        password: "", 
        role: "farmer" 
    });

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/register", formData);
            alert("Registration successful! Please login.");
            console.log("Response:", response.data);
            navigate("/login");  
        } catch (error) {
            console.error("Registration Error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Registration failed. Please try again.");
        }
    };

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
                <div style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "30px" }}>Register</div>
                <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div className="input-container">
    <input type="text" required onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} placeholder="First Name" />
</div>
<div className="input-container">
    <input type="text" required onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} placeholder="Last Name" />
</div>
<div className="input-container">
    <input type="email" required onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Email Address" />
</div>
<div className="input-container">
    <input type="password" required onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="Password" />
</div>

                    <div>
                        <select onChange={(e) => setFormData({ ...formData, role: e.target.value })} style={{ width: "100%", padding: "10px", borderRadius: "5px" }}>
                            <option value="farmer">Farmer</option>
                            <option value="investor">Investor</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" style={{ padding: "10px", background: "#4CAF50", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                        Register
                    </button>
                    <p style={{ fontSize: "14px" }}>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
