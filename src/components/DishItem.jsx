import React from "react";
import api from "../axiosConfig";
import "./Meal.css"
import { useParams } from "react-router-dom";


const DishItem = ({ dish, onDelete }) => {

  const mealid = useParams()
    const handleDelete = async () => {
       try {
        console.log(mealid, dish._id)
         const response = await api.delete(`/dishes/${mealid.mealId}/${dish._id}`);
         if (response.status === 200) {
           onDelete(dish._id);
         } else {
           console.error("Error deleting dish:", response);
         }
       } catch (error) {
         console.error("Error deleting dish", error);
       }
    };
    function addSpaceBeforeUpperCase(str) {
      return str.replace(/([a-z])([A-Z])/g, '$1 $2');
    }
    const formattedDishName = addSpaceBeforeUpperCase(dish.name);
    return (
      <div id="something">
        
        <h2 id="head">{formattedDishName}: Calories: {dish.calories}, Carbs: {dish.carbs} g, Protein: {dish.protein} g, Fat: {dish.fat} g</h2>
        <button id="third" onClick={handleDelete}>Delete</button>
      </div>
    );
  };
  
  export default DishItem;