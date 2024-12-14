export const generateUniqueExercises = (exerciseCategories, usedExercises) => {
  const selectedExercises = [];

  exerciseCategories.forEach(category => {
    if (category && category.length) {
      let uniqueExerciseFound = false;
      let attempts = 0;

      console.log(`Processing category with ${category.length} exercises`);

      while (!uniqueExerciseFound && attempts < 100) {
        const randomExercise = category[Math.floor(Math.random() * category.length)];
        attempts++;

        console.log(`Attempt ${attempts}: Trying exercise ${randomExercise}`);

        if (!usedExercises.has(randomExercise)) {
          selectedExercises.push(randomExercise);
          usedExercises.add(randomExercise);
          uniqueExerciseFound = true;
          console.log(`Exercise ${randomExercise} selected`);
        }
      }

      if (!uniqueExerciseFound) {
        console.warn(`Could not find a unique exercise in category: ${category}`);
      }
    }
  });
  console.log(`Selected exercises: ${selectedExercises}`);
  return selectedExercises;
};