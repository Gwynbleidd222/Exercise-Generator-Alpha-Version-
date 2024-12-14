import React, { useState, useEffect, useCallback } from 'react';
import exercises from '../../exerciseData';
import '../PlanGenerator/planGenerator.css';
import { generateUniqueExercises } from '../Utils/exerciseUtils';
import { v4 as uuidv4 } from 'uuid';
import Loading from 'react-loading'; // Import animacji ładowania

function ThreeDayPlanSBD({ squatWeakness, benchWeakness, deadliftWeakness, selectedScheme, onClose }) {
  const [loading, setLoading] = useState(false); // Stan ładowania
  const [day1Exercises, setDay1Exercises] = useState([]);
  const [day2Exercises, setDay2Exercises] = useState([]);
  const [day3Exercises, setDay3Exercises] = useState([]);

  useEffect(() => {
    const usedExercises = new Set();

    const day1 = generateUniqueExercises([
      ['Competition Squat'],
      ['Competition Bench Press'],
      ['Competition Deadlift'],
      exercises.accessoryBenchHorizontal,
      exercises.backIsolation,
      exercises.Triceps,
      exercises.Biceps,
      exercises.core,
    ], usedExercises);

    const day2 = generateUniqueExercises([
      exercises.accessorySquat,
      exercises.benchWeakness[benchWeakness],
      exercises.accessoryDeadlift,
      exercises.prehabLower,
      exercises.prehabUpper,
      exercises.prehabLower,
      exercises.prehabUpper,
      exercises.core,
    ], usedExercises);

    const day3Fixed = [
      exercises.squatWeakness[squatWeakness][0],
      exercises.benchWeakness[benchWeakness][0],
    ];
    
    day3Fixed.forEach(exercise => usedExercises.add(exercise));

    const day3 = [
      ...day3Fixed,
      ...generateUniqueExercises([
        exercises.deadliftWeakness[deadliftWeakness],
        exercises.backVertical,
        exercises.backIsolation,
        exercises.Triceps,
        exercises.core,
      ], usedExercises)
    ];

    setDay1Exercises(day1);
    setDay2Exercises(day2);
    setDay3Exercises(day3);
  }, [squatWeakness, benchWeakness, deadliftWeakness]); // Wywołuje się tylko raz na montowanie komponentu

  const saveWorkoutPlan = useCallback(() => {
    setLoading(true); // Ustawia ładowanie na true podczas zapisywania planu

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
      setLoading(false); // Ustawia ładowanie na false po 1,5 sekundy
      if (onClose) {
        onClose();
      }
    }, 1500); // Czas trwania animacji w milisekundach
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
        {/* Przycisk z animacją ładowania */}
        <button onClick={saveWorkoutPlan} className="save-button" disabled={loading}>
          {loading ? (
            <Loading type="bars" color="#DEB887" height={24} width={24} className="loading-spinner" /> // Dodajemy animację ładowania
          ) : (
            "Zapisz Plan Treningowy" // Tekst przycisku, gdy nie ma ładowania
          )}
        </button>
      </div>
    </div>
  );
}

export default React.memo(ThreeDayPlanSBD); // Użycie React.memo, aby uniknąć ponownego renderowania
