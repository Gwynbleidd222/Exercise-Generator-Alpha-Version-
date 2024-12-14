import React from "react"
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from "./components/Home";
import SavedWorkoutPlan from "./components/SavedWorkoutPlan"
import ExerciseGeneratorTemp from "./components/ExerciseGeneratorTemp";
import { WorkoutPlanProvider } from './components/context/WorkoutPlan';


function App() {
    return (
      <WorkoutPlanProvider>
        <Router>
        <div className="App">
          <nav className="navbar">
            <ul className="navbar-list">
              <li className="navbar-item">
                <Link to="/"><i className="fa-solid fa-house"></i></Link>
              </li>
              <li className="navbar-item">
                <Link to="/plan-generator"><i className="fa-solid fa-clipboard"></i></Link>
              </li>
              <li className="navbar-item">
                <Link to="/saved-plan"><i className="fa-solid fa-dumbbell"></i></Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plan-generator" element={<ExerciseGeneratorTemp />} />
            <Route path="/saved-plan" element={<SavedWorkoutPlan />} />
          </Routes>
        </div>
      </Router>
      </WorkoutPlanProvider>
    );
  }
  
  export default App;

