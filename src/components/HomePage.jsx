import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../axiosConfig";
import MealItem from "./MealItem";
import "./Homepage.css"
function HomePage() {
    const navigate = useNavigate();
    const [meals, setMeals] = useState([]);
    useEffect(() => {
        const fetchMeals = async () => {
          try {
            const response = await api.get("/meals");
            if (response.status === 200) {
              setMeals(response.data);
            } else if (response.status === 401) {
              navigate("/login");
            } else {
              console.error("Error", response);
            }
          } catch (error) {
            if (error.response.status === 401) {
              navigate("/login");
            }
            console.error("Error fetching meals:", error);
          }
        };
        fetchMeals();
    }, []);
    const handleDeleteMeal = (deletedMealId) => {
        setMeals((prevMeals) =>
            prevMeals.filter((meal) => meal._id !== deletedMealId)
        );
    }
    return (
        <div className="homePage">
            <div>
                <h1>Welcome to</h1>
                <h1>NutritionTracker</h1>
            </div>
            <div id="content1">
                <div id="content2">
                    {meals.length > 0 && (
                        <>
                            <h2 id="meal">Your meals: </h2>
                            <ul className="list">
                                {meals.map((meal) => (
                                    <MealItem
                                        key={meal._id}
                                        meal={meal}
                                        onDelete={handleDeleteMeal}
                                    />
                                ))}
                            </ul>
                        </>
                    )}
                </div>
                <div id="content3">
                    <p>Track your meals!!<br/>
                        And add new ones!
                    </p>
                    <Link to={"/create"}>
                        <button id="button">ADD</button>
                    </Link>
                    <p>Click on the button to add new meal!</p>
                </div>
            </div>
        </div>
    )
}

export default HomePage;