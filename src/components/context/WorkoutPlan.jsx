import React, { createContext, useState } from 'react';

const WorkoutPlanContext = createContext();

const WorkoutPlanProvider = ({ children }) => {
  const [savedPlans, setSavedPlans] = useState([]);
  
  const savePlan = (plan) => {
    setSavedPlans([...savedPlans, plan]);
  };

  return (
    <WorkoutPlanContext.Provider value={{ savedPlans, savePlan }}>
      {children}
    </WorkoutPlanContext.Provider>
  );
};

export { WorkoutPlanContext, WorkoutPlanProvider };