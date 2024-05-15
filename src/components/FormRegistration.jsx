import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../axiosConfig";
import "./Register.css"
function FormRegistration() {
    const navigate = useNavigate();
    const [registrationData, setRegistrationData] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [isUsernameValid, changeIsUsernameValid] = useState(true);
    const [isEmailValid, changeIsEmailValid] = useState(true);
    const [isPasswordValid, changeIsPasswordValid] = useState(true);
    const handleRegistration = async (event) => {
        event.preventDefault();
        validateInputs();
        if (isUsernameValid && isEmailValid && isPasswordValid) {
            registerUser(registrationData);
        }
    }
    const validateInputs = () => {
        const {username, email, password} = registrationData;

        username.length < 4
            ? changeIsUsernameValid(false)
            : changeIsUsernameValid(true);

        !email.includes("@") || email.length < 5
            ? changeIsEmailValid(false)
            : changeIsEmailValid(true);

        password.length < 8
            ? changeIsPasswordValid(false)
            : changeIsPasswordValid(true);

    }
    function inputChange(event) {
        const {name, value} = event.target;
        setRegistrationData({...registrationData, [name]: value})
    }
    const registerUser = async (userData) => {
        try {
            const response = await api.post("/users/register", userData);
            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                navigate("/home");
            }
            else {
                
                console.error("Error during registration!", response.data);
            }
        } catch (error) {
            console.error("Error during registration!", error);
        }
    }
    return (
        <>
            <form onSubmit={handleRegistration} id = "form_registration">
                <div>
                    <div id="header">
                        <h1 id="welcome" style={{ color: "white" }}>
                            Welcome to
                        </h1>
                        <h1>NutritionTracker</h1>
                    </div>
                </div>
                <div>
                    <label id="label1">
                        Username:
                        <input
                        type="text"
                        name="username"
                        value={registrationData.username}
                        onChange={inputChange}
                        required
                        id="input_reg1"
                        />
                    </label>
                    <div style={{ color: "red" }}>
                        {!isUsernameValid && "Username can not be shorter than 4 units!"}
                    </div>
                    <label id="label2">
                        Email:
                        <input
                        type="email"
                        name="email"
                        value={registrationData.email}
                        onChange={inputChange}
                        required
                        id="input_reg2"
                        />
                    </label>
                    <div style={{ color: "red" }}>
                        {!isEmailValid && "This is not a valid email address"}
                    </div>
                    <label id="label3">
                        Password:
                        <input
                        type="password"
                        name="password"
                        value={registrationData.password}
                        onChange={inputChange}
                        required
                        id="input_reg3"
                        />
                    </label>
                    <div style={{ color: "red" }}>
                        {!isPasswordValid && "Password can not be shorter than 8 units!"}
                    </div>
                </div>
                <button type="submit" className="button">
                    Register!
                </button>
            </form>
            <p>
                You already have a account?<Link to={"/login"}> Sign in.</Link>
            </p>
        </>
    )
}

export default FormRegistration;