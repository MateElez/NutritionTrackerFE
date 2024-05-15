import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import FormRegistration from './components/FormRegistration'
import FormSignIn from './components/FormSignIn'
import HomePage from './components/HomePage'
import FormCreateMeal from './components/FormCreateMeal'
import Meal from './components/Meal'
import AddDish from './components/FormAddDish'
function App() {

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/home"/>}/>
          <Route path='/register' element={<FormRegistration/>}/>
          <Route path='/login' element={<FormSignIn/>}/>
          <Route path='/home/*' element={<HomePage/>}/>
          <Route path='/create' element={<FormCreateMeal/>}/>
          <Route
            path="home/meal/:mealId/*"
            element={<Meal />}
          />
          <Route
            path="home/meal/:mealId/addDish/*"
            element={<AddDish />}
          />
        </Routes>
      </div>
    </BrowserRouter>
    
  )
}

export default App
