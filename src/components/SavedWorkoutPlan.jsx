import React, { useContext, useState, useEffect } from 'react';
import Modal from './Modal/Modal';

function SavedWorkoutPlan() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loadedPlan, setLoadedPlan] = useState([]);

  
  useEffect(()=> {
    const savedPlans = JSON.parse(localStorage.getItem('workoutPlans')) || [];
    setLoadedPlan(savedPlans)
  }, [])
  
  const handleShowPlan = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };
  
  const handleDeletePlan = (planId) => {
    const uptatedPlans = loadedPlan.filter(plan => plan.id !== planId)
    localStorage.setItem('workoutPlans', JSON.stringify(uptatedPlans))
    setLoadedPlan(uptatedPlans)
    setIsModalOpen(false)
  }
  
  const renderDayExercises = (dayExercises, dayNumber) => (
    <>
      <h3>Dzień {dayNumber}</h3>
      <hr />
      <ol>
        {dayExercises.map((exercise, index) => (
          <li key={index}>{exercise}</li>
        ))}
      </ol>
    </>
  )
  
  return (
    <div className="saved-plans-container">
			<h1 className="saved-plans-title">Wygenerowane Plany Treningowe</h1>
			{loadedPlan.length === 0 ? (
        <p className="no-plans-message">Aktualnie nie masz zapisanych planów treningowych.</p>
			) : (
        <div className="plans-list-container">
					{loadedPlan.map((plan, index) => (
            <div key={index} className="plan-box">
							<h4>{plan.title}</h4>
							<p className='text-box'><i className='fa-solid fa-filter'></i> Zastosowane filtry</p>
							<div className='container-scheme'>
								<p className='p1'>{plan.filters.squatWeakness}</p>
								<p className='p2'>{plan.filters.benchWeakness}</p>
								<p className='p3'>{plan.filters.deadliftWeakness}</p>
							</div>
							<button className="saved-workout-button" onClick={() => handleShowPlan(plan)}>
								Pokaż Plan
							</button>
						</div>
					))}
				</div>
			)}
			{isModalOpen && selectedPlan && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="modal-plan-content">
            {renderDayExercises(selectedPlan.day1, 1)}
            {renderDayExercises(selectedPlan.day2, 2)}
            {renderDayExercises(selectedPlan.day3, 3)}
            {selectedPlan.day4 && renderDayExercises(selectedPlan.day4, 4)} {/* Renderuj 4 dzień, jeśli istnieje */}
          </div>
          <button className='saved-workout-button' onClick={() => handleDeletePlan(selectedPlan.id)}>Usuń Plan</button>
        </Modal>
      )}
		</div>
	);
}

export default SavedWorkoutPlan;

// Wczytaj plan z localStorage podczas inicjalizacji komponentu
// useEffect(() => {
//   const savedPlan = localStorage.getItem('workoutPlan') || [];
//   if (savedPlan) {
//     setLoadedPlan(JSON.parse(savedPlan));
//   }
// }, []);


// import React, { useContext, useState } from 'react';
// import { WorkoutPlanContext } from './context/WorkoutPlan';
// import Modal from './Modal/Modal';

// function SavedWorkoutPlan() {
  //   const { savedPlans } = useContext(WorkoutPlanContext);
//   console.log('test', savedPlans)
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedPlan, setSelectedPlan] = useState(null);

//   const handleShowPlan = (plan) => {
//     setSelectedPlan(plan);
//     setIsModalOpen(true);
//   };

  

//   return (
//     <div className="saved-plans-container">
//       <h1 className="saved-plans-title">Wygenerowane Plany Treningowe</h1>
//       {savedPlans.length === 0 ? (
//         <p className="no-plans-message">Aktualnie nie masz zapisanych planów treningowych.</p>
//       ) : (
//         <div className="plans-list-container">
//           {savedPlans.map((plan, index) => (
//             <div key={index} className="plan-box">
//               <h4>{plan.title}</h4>
//               <p className='text-box'><i className='fa-solid fa-filter'></i> Zastosowane filtry</p>
//               <div className='container-scheme'>
//                     <p className='p1'>{plan.filters.squatWeakness}</p>
//                     <p className='p2'>{plan.filters.benchWeakness}</p>
//                     <p className='p3'>{plan.filters.deadliftWeakness}</p>
//               </div>
//               <button className="show-plan-button" onClick={() => handleShowPlan(plan)}>
//                 Pokaż Plan
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//       {isModalOpen && (
//         <Modal onClose={() => setIsModalOpen(false)}>
//           <div className="modal-plan-content">
//             {selectedPlan.planData}
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// }

// export default SavedWorkoutPlan;