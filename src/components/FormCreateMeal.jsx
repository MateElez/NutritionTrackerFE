import { useState } from "react";
import api from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import { Meals } from "../constants";
import "./FormCreateMeal.css"
function FormCreateMeal() {
    const navigate = useNavigate();
    const [mealName, setMealName] = useState("");
    const [selectedMeal, setSelectedMeal] = useState("Breakfast");
    const handleMealNameChange = (e) => {
        const inputValue = e.target.value;
        setMealName(inputValue);
    }
    const handleMealChange = (e) => {
        const inputValue = e.target.value;
        setSelectedMeal(inputValue);
    }
    const back = () => {
        navigate("/home");
    }
    const test = async () =>{
        if (mealName.length<3) {
            alert("Name is too short!");
            return;
        }
        try {
            await api.post("/meals", {
                name: mealName,
                type: selectedMeal
            })
            back();
        } catch (error) {
            console.error("Error! ", error);
        }
    }
    return(
        <div className="box">
            <h2 id="title">Create a new meal!</h2>
            <div>
                <label className="label">Meal name:</label>
                <input
                    type="text"
                    value={mealName}
                    onChange={handleMealNameChange}
                    className="entrance"
                />
            </div>

            <div id="choice">
                <label className="label">Select a meal:</label>
                <select
                    onChange={handleMealChange}
                    value={selectedMeal}
                    className="select"
                >
                    <option value={Meals.BREAKFAST}>Breakfast</option>
                    <option value={Meals.LUNCH}>Lunch</option>
                    <option value={Meals.DINNER}>Dinner</option>
                    <option value={Meals.SNACK}>Snack</option>
                </select>
            </div>
            <button type="button" className="button" onClick={test}>
                Create
            </button>
            <button type="button" className="button" onClick={back}>
                Back
            </button>
        </div>
    )
}

export default FormCreateMeal;