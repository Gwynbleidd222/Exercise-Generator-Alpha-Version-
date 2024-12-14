// import React, { useState } from 'react'
// import exercises from '../../exerciseData'
// import '../PlanGenerator/planGenerator.css'
// import { generateUniqueExercises } from '../Utils/exerciseUtils'
// import { v4 as uuidv4 } from 'uuid'
// import Loading from 'react-loading'

// function ThreeDayWeaknessPlan({ squatWeakness, benchWeakness, deadliftWeakness, selectedScheme, onClose }) {
// 	const [loading, setLoading] = useState(false)
// 	const usedExercises = new Set();

// 	const day1Exercises = generateUniqueExercises([
// 	  exercises.squatWeakness[squatWeakness],
// 	  ['Competition Squat'],
// 	  exercises.benchWeakness[benchWeakness],
// 	  ['Competition Bench Press'],
// 	  exercises.accessoryDeadlift,
// 	  exercises.accessoryBenchHorizontal,
// 	  exercises.backHorizontal,
// 	  exercises.core
// 	], usedExercises);
	
// 	const day2Exercises = generateUniqueExercises([
// 		exercises.deadliftWeakness[deadliftWeakness],
// 		['Competition Deadlift'],
// 		exercises.accessoryBenchVertical,
// 		exercises.backVertical,
// 		exercises.accessorySquat,
// 		exercises.accessoryDeadliftIsolation,
// 		exercises.core,
// 	], usedExercises);
	
// 	const day3ExercisesFixed = [
// 		exercises.squatWeakness[squatWeakness][0],
// 		'Competition Squat',
// 		exercises.benchWeakness[benchWeakness][0],
// 		'Competition Bench Press'
// 	  ];
// 	  day3ExercisesFixed.forEach(exercise => usedExercises.add(exercise));
  
// 	  const day3Exercises = [
// 		...day3ExercisesFixed,
// 		...generateUniqueExercises([
// 		  exercises.Triceps,
// 		  exercises.accessorySquatIsolation,
// 		  exercises.backHorizontal,
// 		  exercises.backIsolation,
// 		  exercises.core,
// 		], usedExercises)
// 	  ];

// 	  const saveWorkoutPlan = () => {
// 		  setLoading(true)
		  
// 		  const newWorkoutPlan = {
// 			id: uuidv4(),
// 			day1: day1Exercises,
// 			day2: day2Exercises,
// 			day3: day3Exercises,
			
// 			title: selectedScheme,
// 			filters: {
// 				squatWeakness,
// 				benchWeakness,
// 				deadliftWeakness,
// 			},
// 		};

// 		setTimeout(() => {
// 			setLoading(false);
// 			if(onClose) {
// 				onClose()
// 			}
// 		}, 1500);
		

// 		// localStorage.setItem('workoutPlan', JSON.stringify(workoutPlan))
// 	    const exsitingPlan = JSON.parse(localStorage.getItem('workoutPlans')) || [];
// 		const uptatedPlans = [...exsitingPlan, newWorkoutPlan]
// 		localStorage.setItem('workoutPlans', JSON.stringify(uptatedPlans))

// 		console.log('plan został zapisany')

		
// 	  }

  
// 	return (
// 		<div className='plan-generator'>
		
// 		<h2>Wygenerowany Plan Treningowy</h2>
// 			<div className='plan-generator-body'>
// 			<h3>Dzień 1</h3>
// 			<hr />
// 			<ol>
// 			  {day1Exercises.map((exercise, index) => (
// 				<li key={index}>{exercise}</li>
// 			  ))}
// 			</ol>
// 			<h3>Dzień 2</h3>
// 			<hr />
// 			<ol>
// 			  {day2Exercises.map((exercise, index) => (
// 				<li key={index}>{exercise}</li>
// 			  ))}
// 			</ol>
// 			<h3>Dzień 3</h3>
// 			<hr />
// 			<ol>
// 			  {day3Exercises.map((exercise, index) => (
// 				<li key={index}>{exercise}</li>
// 			  ))}
// 			</ol>
// 			<button onClick={saveWorkoutPlan} className="save-button" disabled={loading}>
// 				{loading ? (
// 					<Loading type='spin' color='DEB887' height={24} width={24} className='loading-spinner'/>
// 				) : (
// 					"Zapisz plan treningowy"
// 				)}
// 			</button>
// 		  </div>
// 	  </div>
	
// 	);
//   }
  
//   export default ThreeDayWeaknessPlan;


import React, { useState, useEffect, useCallback } from 'react';
import exercises from '../../exerciseData';
import '../PlanGenerator/planGenerator.css';
import { generateUniqueExercises } from '../Utils/exerciseUtils';
import { v4 as uuidv4 } from 'uuid';
import Loading from 'react-loading';

function ThreeDayWeaknessPlan({ squatWeakness, benchWeakness, deadliftWeakness, selectedScheme, onClose }) {
  const [loading, setLoading] = useState(false);
  const [day1Exercises, setDay1Exercises] = useState([]);
  const [day2Exercises, setDay2Exercises] = useState([]);
  const [day3Exercises, setDay3Exercises] = useState([]);

  useEffect(() => {
    const usedExercises = new Set();
    
    const day1 = generateUniqueExercises([
      exercises.squatWeakness[squatWeakness],
      ['Competition Squat'],
      exercises.benchWeakness[benchWeakness],
      ['Competition Bench Press'],
      exercises.accessoryDeadlift,
      exercises.accessoryBenchHorizontal,
      exercises.backHorizontal,
      exercises.core
    ], usedExercises);
    
    const day2 = generateUniqueExercises([
      exercises.deadliftWeakness[deadliftWeakness],
      ['Competition Deadlift'],
      exercises.accessoryBenchVertical,
      exercises.backVertical,
      exercises.accessorySquat,
      exercises.accessoryDeadliftIsolation,
      exercises.core,
    ], usedExercises);
    
    const day3Fixed = [
      exercises.squatWeakness[squatWeakness][0],
      'Competition Squat',
      exercises.benchWeakness[benchWeakness][0],
      'Competition Bench Press'
    ];
    day3Fixed.forEach(exercise => usedExercises.add(exercise));
  
    const day3 = [
      ...day3Fixed,
      ...generateUniqueExercises([
        exercises.Triceps,
        exercises.accessorySquatIsolation,
        exercises.backHorizontal,
        exercises.backIsolation,
        exercises.core,
      ], usedExercises)
    ];

    setDay1Exercises(day1);
    setDay2Exercises(day2);
    setDay3Exercises(day3);
  }, [squatWeakness, benchWeakness, deadliftWeakness]);

  const saveWorkoutPlan = useCallback(() => {
    setLoading(true);

    const newWorkoutPlan = {
      id: uuidv4(),
      day1: day1Exercises,
      day2: day2Exercises,
      day3: day3Exercises,
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

    console.log('Plan został zapisany');

    setTimeout(() => {
      setLoading(false);
      if (onClose) {
        onClose();
      }
    }, 1500); 
  }, [day1Exercises, day2Exercises, day3Exercises, selectedScheme, squatWeakness, benchWeakness, deadliftWeakness, onClose]);

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
        <button onClick={saveWorkoutPlan} className="save-button" disabled={loading}>
          {loading ? (
            <Loading type="bars" color="#DEB887" height={20} width={20} className="loading-spinner" /> 
          ) : (
            "Zapisz Plan Treningowy" 
          )}
        </button>
      </div>
    </div>
  );
}

export default React.memo(ThreeDayWeaknessPlan);