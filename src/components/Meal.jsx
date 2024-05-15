import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../axiosConfig";
import DishItem from "./DishItem";
import "./Meal.css"
function Meal({  }) {
    const {mealId} = useParams();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    const [dishes, setDishes] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalProtein, setTotalProtein] = useState(0);
    const [totalCarb, setTotalCarb] = useState(0);
    const [totalFat, setTotalFat] = useState(0);
    const handleAddDish = () =>{
        navigate(`/home/meal/${mealId}/addDish?type=${type}`);
    }
    useEffect(() => {
        const fetchDishes = async () => {
          try {
            const response = await api.get(`/dishes/${mealId}`);
            if (response.status === 200) {
              setDishes(response.data);
              console.log(response.data)
            } else if (response.status === 401) {
              navigate("/login");
            } else {
              console.error("Error", response);
            }
          } catch (error) {
            if (error.response.status === 401) {
              navigate("/login");
            }
            console.error("Error fetching dishes:", error);
          }
          
        };
        fetchDishes()
    }, []);
    const handleDeleteDish = (deletedDishId) => {
        setDishes((prevDishes) =>
            prevDishes.filter((dish) => dish._id !== deletedDishId)
        );
    }
    useEffect(() => {
        let caloriesSum = 0;
        let proteinSum = 0;
        let carbSum = 0;
        let fatSum = 0;
        dishes.forEach((dish) => {
          caloriesSum += dish.calories;
          proteinSum += dish.protein;
          carbSum += dish.carbs;
          fatSum += dish.fat;
        });
        setTotal(caloriesSum);
        setTotalProtein(proteinSum);
        setTotalCarb(carbSum);
        setTotalFat(fatSum);
      }, [dishes]);
    return(
        <div className="first">
            <div>
                <div>
                    {dishes.length > 0 && (
                        <>
                            <h1>Your dishes: </h1>
                            <ul>
                                {dishes.map((dish) => (
                                    
                                    <DishItem
                                        key={dish._id}
                                        dish={dish}
                                        onDelete={handleDeleteDish}
                                    />
                                    
                                ))}
                            </ul>
                            <p>Total calories: {total}</p>
                            <p>Total carbs: {totalCarb} g</p>
                            <p>Total protein: {totalProtein} g</p>
                            <p>Total fat: {totalFat} g</p>
                        </>
                    )}
                </div>
                <div>
                    <div>
                        <h2>Add dish:</h2>
                    </div>
                </div>
            </div>
            <button id="first" onClick={() => handleAddDish()}>
                ADD
            </button>
            <button id="second" onClick={() => navigate(-1)}>
                BACK
            </button>
        </div>
    )
}

export default Meal;