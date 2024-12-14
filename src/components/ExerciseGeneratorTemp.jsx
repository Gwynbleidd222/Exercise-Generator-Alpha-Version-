import React, { useState, useContext } from 'react'
import SelectComponent from './SelectComponent/SelectComponent'
import Modal from './Modal/Modal'
import ThreeDayWeaknessPlan from './PlanGenerator/ThreeDayWeaknessPlan'
import ThreeDayPlanSBD from './PlanGenerator/ThreeDayPlanSBD'
import FourDayPlan from './PlanGenerator/FourDayPlan'
// import { WorkoutPlanContext } from './context/WorkoutPlan';

function ExerciseGeneratorTemp() {
	// const { savePlan } = useContext(WorkoutPlanContext);
	const [selectedScheme, setSelectedScheme] = useState('Select')
	const [squatWeakness, setSquatWeakness] = useState('Select')
	const [benchWeakness, setBenchWeakness] = useState('Select')
	const [deadliftWeakness, setDeadliftWeakness] = useState('Select')
	const [isModalOpen, setIsModalOpen] = useState(false)

	const [errors, setErrors] = useState({
		schemeError: false,
		squatError: false,
		benchError: false,
		deadliftError: false,
	})

	const handleGeneratePlan = () => {
		const fields = [
			{ value: selectedScheme, errorKey: 'schemeError' },
			{ value: squatWeakness, errorKey: 'squatError' },
			{ value: benchWeakness, errorKey: 'benchError' },
			{ value: deadliftWeakness, errorKey: 'deadliftError' },
		]

		let hasErrors = false
		const newErrors = {}

		fields.forEach(field => {
			if (field.value === 'Select') {
				newErrors[field.errorKey] = true
				hasErrors = true
			} else {
				newErrors[field.errorKey] = false
			}
		})

		setErrors(newErrors)

		if (hasErrors) return

		setIsModalOpen(true)
	}

	const renderPlan = () => {
		if (selectedScheme === 'Plan Trójbojowy 3 dni słabe ogniwa') {
			return (
				<ThreeDayWeaknessPlan
					squatWeakness={squatWeakness}
					benchWeakness={benchWeakness}
					deadliftWeakness={deadliftWeakness}
					selectedScheme={selectedScheme}
					onClose={() => setIsModalOpen(false)}
				/>
			)
		} else if (selectedScheme === 'Plan Trójbojowy 3 dni SBD') {
			return (
				<ThreeDayPlanSBD
					squatWeakness={squatWeakness}
					benchWeakness={benchWeakness}
					deadliftWeakness={deadliftWeakness}
					selectedScheme={selectedScheme}
					onClose={() => setIsModalOpen(false)}
				/>
			)
		} else if (selectedScheme === 'Plan Trójbojowy 4 dni') {
			return (
				<FourDayPlan
					squatWeakness={squatWeakness}
					benchWeakness={benchWeakness}
					deadliftWeakness={deadliftWeakness}
					selectedScheme={selectedScheme}
					onClose={() => setIsModalOpen(false)}
				/>
			)
		}
		return null
	}

	const currentPlan = renderPlan()

	// const handleSavePlan = () => {
	//   const planTitle = selectedScheme;
	//   const newPlan = {
	//     title: planTitle,
	//     planData: currentPlan,
	//     filters: {
	//       squatWeakness,
	//       benchWeakness,
	//       deadliftWeakness,
	//     },
	//   };
	//   savePlan(newPlan);
	//   console.log('plan zapisany', newPlan)
	//   setIsModalOpen(false);
	// };

	return (
		<div className='app-box'>
			<h1 className='app-title'>Powerlifting Plan Generator</h1>
			<div>
				<div className='select-group'>
					<SelectComponent
						label='Schemat treningowy'
						options={[
							'Select',
							'Plan Trójbojowy 3 dni słabe ogniwa',
							'Plan Trójbojowy 3 dni SBD',
							'Plan Trójbojowy 4 dni',
						]}
						value={selectedScheme}
						onChange={setSelectedScheme}
					/>
					{errors.schemeError && <p className='error-message'>Musisz zaznaczyć to pole</p>}
				</div>

				<div className='select-group'>
					<SelectComponent
						label='Słabość w przysiadzie'
						options={[
							'Select',
							'Sticking point na dole',
							'Sticking point na górze',
							'Przysiado-Dzień dobry(dupa pierwsze leci do góry)',
							'Skrajne schodzenie Kolan do Środka',
							'Butt Wink(brak spięcia core)',
						]}
						value={squatWeakness}
						onChange={setSquatWeakness}
					/>
					{errors.squatError && <p className='error-message'>Musisz zaznaczyć to pole</p>}
				</div>

				<div className='select-group'>
					<SelectComponent
						label='Słabość w wyciskaniu'
						options={[
							'Select',
							'Sticking point na dole',
							'Sticking point w połowie ruchu',
							'Lockout',
							'Uciekające łopatki',
						]}
						value={benchWeakness}
						onChange={setBenchWeakness}
					/>
					{errors.benchError && <p className='error-message'>Musisz zaznaczyć to pole</p>}
				</div>

				<div className='select-group'>
					<SelectComponent
						label='Słabość w martwym ciągu'
						options={[
							'Select',
							'Oderwanie sztangi (ciąg sumo)',
							'Oderwanie sztangi (ciąg klasyczny)',
							'Lockout (ciąg sumo)',
							'Lockout (ciąg klasyczny)',
							'Niekontrolowane garbienie góry pleców (ciąg sumo)',
							'Niekontrolowane garbienie góry pleców (ciąg klasyczny)',
						]}
						value={deadliftWeakness}
						onChange={setDeadliftWeakness}
					/>
					{errors.deadliftError && <p className='error-message'>Musisz zaznaczyć to pole</p>}
				</div>

				<button className='btn-generate' onClick={handleGeneratePlan}>
					Generuj Plan Treningowy
				</button>
				{isModalOpen && (
					<Modal onClose={() => setIsModalOpen(false)}>
						{currentPlan}
						{/* <button className='btn-generate' onClick={handleSavePlan}>Zapisz Plan Treningowy</button> */}
					</Modal>
				)}
			</div>
		</div>
	)
}

export default ExerciseGeneratorTemp
