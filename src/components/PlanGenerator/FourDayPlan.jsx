// import React from 'react'
// import exercises from '../../exerciseData'
// import '../PlanGenerator/planGenerator.css'
// import { generateUniqueExercises } from '../Utils/exerciseUtils'
// import { v4 as uuidv4 } from 'uuid'

// function FourDayPlan({ squatWeakness, benchWeakness, deadliftWeakness, selectedScheme, onClose }) {
//   const usedExercises = new Set();

//   const day1Exercises = generateUniqueExercises([
//     ['Main Squat'],
//     exercises.deadliftWeakness[deadliftWeakness],
//     exercises.accessorySquat,
//     exercises.accessoryDeadliftIsolation,
//     exercises.prehabLower,
//     exercises.core,
//   ], usedExercises);

//   const day2Exercises = generateUniqueExercises([
//     ['Main Bench Press'],
//     exercises.accessoryBenchHorizontal,
//     exercises.backHorizontal,
//     exercises.backGlobal,
//     exercises.backIsolation,
//     exercises.prehabUpper,
//     exercises.prehabUpper,
//   ], usedExercises);

//   const day3Exercises = generateUniqueExercises([
//     ['Main Deadlift'],
//     exercises.squatWeakness[squatWeakness],
//     exercises.accessoryDeadlift,
//     exercises.accessorySquatIsolation,
//     exercises.core,
//   ], usedExercises);

//   const day4Exercises = generateUniqueExercises([
//     exercises.benchWeakness[benchWeakness],
//     exercises.accessoryBenchVertical,
//     exercises.backVertical,
//     exercises.Triceps,
//     exercises.prehabUpper,
//     exercises.Biceps,
//   ], usedExercises);

//   const saveWorkoutPlan = () => {
// 		const newWorkoutPlan = {
// 			id: uuidv4(),
// 			day1: day1Exercises,
// 			day2: day2Exercises,
// 			day3: day3Exercises,
//       ...(day4Exercises ? {day4: day4Exercises} : {}),
		
// 			title: selectedScheme,
// 			filters: {
// 			  squatWeakness,
// 			  benchWeakness,
// 			  deadliftWeakness,
// 			},
// 		  };
		
// 		// localStorage.setItem('workoutPlan', JSON.stringify(workoutPlan))
// 	    const exsitingPlan = JSON.parse(localStorage.getItem('workoutPlans')) || [];
// 		  const uptatedPlans = [...exsitingPlan, newWorkoutPlan]
// 		  localStorage.setItem('workoutPlans', JSON.stringify(uptatedPlans))

//       if(onClose) {
//         onClose()
//       }
// 	  }

//   return (
//     <div className='plan-generator'>
//       <h2>Wygenerowany Plan Treningowy</h2>
//       <div className='plan-generator-body'>
//         <h3>Dzień 1</h3>
//         <hr />
//         <ol>
//           {day1Exercises.map((exercise, index) => (
//             <li key={index}>{exercise}</li>
//           ))}
//         </ol>
//         <h3>Dzień 2</h3>
//         <hr />
//         <ol>
//           {day2Exercises.map((exercise, index) => (
//             <li key={index}>{exercise}</li>
//           ))}
//         </ol>
//         <h3>Dzień 3</h3>
//         <hr />
//         <ol>
//           {day3Exercises.map((exercise, index) => (
//             <li key={index}>{exercise}</li>
//           ))}
//         </ol>
//         <h3>Dzień 4</h3>
//         <hr />
//         <ol>
//           {day4Exercises.map((exercise, index) => (
//             <li key={index}>{exercise}</li>
//           ))}
//         </ol>
//         <button onClick={saveWorkoutPlan} className="save-button">Zapisz Plan Treningowy</button>
//       </div>
//     </div>
//   );
// }

// export default FourDayPlan;


import React, { useState, useEffect, useCallback } from 'react';
import exercises from '../../exerciseData';
import '../PlanGenerator/planGenerator.css';
import { generateUniqueExercises } from '../Utils/exerciseUtils';
import { v4 as uuidv4 } from 'uuid';
import Loading from 'react-loading';

function FourDayPlan({ squatWeakness, benchWeakness, deadliftWeakness, selectedScheme, onClose }) {
  const [loading, setLoading] = useState(false);
  const [day1Exercises, setDay1Exercises] = useState([]);
  const [day2Exercises, setDay2Exercises] = useState([]);
  const [day3Exercises, setDay3Exercises] = useState([]);
  const [day4Exercises, setDay4Exercises] = useState([]);

  useEffect(() => {
    const usedExercises = new Set();

    const day1 = generateUniqueExercises([
      ['Main Squat'],
      exercises.deadliftWeakness[deadliftWeakness],
      exercises.accessorySquat,
      exercises.accessoryDeadliftIsolation,
      exercises.prehabLower,
      exercises.core,
    ], usedExercises);

    const day2 = generateUniqueExercises([
      ['Main Bench Press'],
      exercises.accessoryBenchHorizontal,
      exercises.backHorizontal,
      exercises.backGlobal,
      exercises.backIsolation,
      exercises.prehabUpper,
      exercises.prehabUpper,
    ], usedExercises);

    const day3 = generateUniqueExercises([
      ['Main Deadlift'],
      exercises.squatWeakness[squatWeakness],
      exercises.accessoryDeadlift,
      exercises.accessorySquatIsolation,
      exercises.core,
    ], usedExercises);

    const day4 = generateUniqueExercises([
      exercises.benchWeakness[benchWeakness],
      exercises.accessoryBenchVertical,
      exercises.backVertical,
      exercises.Triceps,
      exercises.prehabUpper,
      exercises.Biceps,
    ], usedExercises);

    setDay1Exercises(day1);
    setDay2Exercises(day2);
    setDay3Exercises(day3);
    setDay4Exercises(day4);
  }, [squatWeakness, benchWeakness, deadliftWeakness]);

  const saveWorkoutPlan = useCallback(() => {
    setLoading(true);

    const newWorkoutPlan = {
      id: uuidv4(),
      day1: day1Exercises,
      day2: day2Exercises,
      day3: day3Exercises,
      day4: day4Exercises,
      title: selectedScheme,
      filters: {
        squatWeakness,
        benchWeakness,
        deadliftWeakness,
      },
    };

    const existingPlan = JSON.parse(localStorage.getItem('workoutPlans')) || [];
    const updatedPlans = [...existingPlan, newWorkoutPlan];
    localStorage.setItem('workoutPlans', JSON.stringify(updatedPlans));

    console.log('plan został zapisany')

    setTimeout(() => {
      setLoading(false);
      if (onClose) {
        onClose();
      }
    }, 1500);
  }, [day1Exercises, day2Exercises, day3Exercises, day4Exercises, selectedScheme, squatWeakness, benchWeakness, deadliftWeakness, onClose]);

  return (
    <div className='plan-generator'>
      <h2>Wygenerowany Plan Treningowy</h2>
      <div className='plan-generator-body'>
        <h3>Dzień 1</h3>
        <hr />
        <ol>
          {day1Exercises.map((exercise, index) => (
            <li key={index}>{exercise}</li>
          ))}
        </ol>
        <h3>Dzień 2</h3>
        <hr />
        <ol>
          {day2Exercises.map((exercise, index) => (
            <li key={index}>{exercise}</li>
          ))}
        </ol>
        <h3>Dzień 3</h3>
        <hr />
        <ol>
          {day3Exercises.map((exercise, index) => (
            <li key={index}>{exercise}</li>
          ))}
        </ol>
        <h3>Dzień 4</h3>
        <hr />
        <ol>
          {day4Exercises.map((exercise, index) => (
            <li key={index}>{exercise}</li>
          ))}
        </ol>
        <button onClick={saveWorkoutPlan} className="save-button" disabled={loading}>
          {loading ? (
            <Loading type="bars" color="#DEB887" height={30} width={30} className="loading-spinner" />
          ) : (
            "Zapisz Plan Treningowy"
          )}
        </button>
      </div>
    </div>
  );
}

export default React.memo(FourDayPlan);