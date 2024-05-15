import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Meals, Dishes } from "../constants";
import api from "../axiosConfig";
import "./FormAddDish.css"
function AddDish() {
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get("type");
    const navigate = useNavigate();
    const { mealId } = useParams();
    
    const handleDishChange = (e) => {
        const inputValue = e.target.value;
        const dishData = Dishes[inputValue.toUpperCase()];
        setSelectedDish(dishData);
    }
    
    const test = async () =>{
        try {
            await api.post("/dishes", {
                mealId,
                name: selectedDish.name,
                calories: selectedDish.calories,
                carbs: selectedDish.carbs,
                protein: selectedDish.protein,
                fat: selectedDish.fat
            })
            back();
        } catch (error) {
            console.error("Error! ", error);
        }
        
    }
    const back = () => {
        navigate(-1);
    }
    const availableDish = (() => {
        switch(type) {
            case Meals.BREAKFAST:
                return [
                    Dishes.PANCAKES.name,
                    Dishes.OATMEAL.name,
                    Dishes.SANDWICH.name,
                    Dishes.YOGURTH.name,
                    Dishes.SMOOTHIE.name
                ];
            case Meals.LUNCH:
                return [
                    Dishes.CHICKENRICE.name,
                    Dishes.TUNASALAD.name,
                    Dishes.VEGETABLECURRY.name,
                    Dishes.PASTAVEGETABLES.name,
                    Dishes.GRILLEDCHICKENSALAD.name
                ];
            case Meals.DINNER:
                return [
                    Dishes.SALMONPOTATOES.name,
                    Dishes.TOFUVEGETABLES.name,
                    Dishes.CHICKENVEGETABLES.name,
                    Dishes.GRILLEDFISH.name,
                    Dishes.PASTAPESTO.name
                ];
            case Meals.SNACK:
                return [
                    Dishes.FRUITSALAD.name,
                    Dishes.YOGURTHALMONDS.name,
                    Dishes.HUMMUSVEGETABLES.name,
                    Dishes.NUTSFRUITS.name,
                    Dishes.CRACKERSCHEESE.name
                ];
            default:
                return [];
        }
    })();
    const [selectedDish, setSelectedDish] = useState(Dishes[availableDish[0].toUpperCase()]);//dodat da mi je prvi prvi ponudeni
    return(
        <div id="container">
            <h2>Add Dish:</h2>
            <div>
                <label className="label">Select a dish:</label>
                <div>
                    <select className="select" onChange={handleDishChange} value={selectedDish.name || ""}> 
                        {availableDish.map((e)=>(
                            <option key = {e} value={e}>
                                {e}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <button className="button" onClick={test}>Add</button>
            <button className="button" onClick={()=>{navigate(-1)}}>Back</button>
            <button className="button" onClick={() => navigate("/home")}>Homepage</button>
        </div>
    )    
}

export default AddDish;