import React from "react";
import { Link } from "react-router-dom";
import api from "../axiosConfig";
import "./FormCreateMeal.css"
const MealItem = ({ meal, onDelete }) => {
    const handleDelete = async () => {
      try {
        const response = await api.delete(`/meals/${meal._id}`);
        if (response.status === 200) {
          onDelete(meal._id);
        } else {
          console.error("Error deleting meal:", response);
        }
      } catch (error) {
        console.error("Error deleting meal", error);
      }
    };
    return (
      <div>
        <Link  to={`meal/${meal._id}?type=${meal.type}`} >
          <h2 id="LinkStyle">{meal.name}</h2>
          
        </Link>
        <p>Type: {meal.type}</p>
        <button id = "button" onClick={handleDelete}>Delete</button>
      </div>
    );
  };
  
  export default MealItem;