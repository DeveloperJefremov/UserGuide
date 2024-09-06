import { useEffect, useState } from 'react'
import Button from '../Button/Button'
import GuideStep from '../GuideStep/GuideStep'
import GuideStepForm from '../GuideStep/GuideStepForm'
import Modal from '../UI/Modal'

export default function GuideStepsList({
	mode,
	onModeChange,
	steps,
	onStepsUpdate,
	// stepsData,
	// guideSetsList,
	// setGuideSetsList,
}) {
	// const [stepListMode, setStepListMode] = useState('folded');
	// const [steps, setSteps] = useState(stepsData || []);
	const [isModalOpen, setIsModalOpen] = useState(false);
	// const [activeStepId, setActiveStepId] = useState(0);
	// const [activeSteps, setActiveSteps] = useState([]);
	const [currentStepIndex, setCurrentStepIndex] = useState(0); // Для хранения индекса редактируемого шага
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		pageUrl: '',
		elementId: '',
		imgChecked: false,
		imgWidth: 0,
		imgHeight: 0,
		imageUrl: '',
	});

	useEffect(() => {
		console.log('stepsData', steps);
	}, [steps]);
	// Создание нового шага
	const handleCreateStep = () => {
		setFormData(''); // Очищаем данные формы
		onModeChange('create'); // Устанавливаем режим создания
		setIsModalOpen(true); // Открываем модальное окно
	};

	// Редактирование существующего шага
	const handleEditStep = (setIndex, stepIndex) => {
		const selectedStep = steps[setIndex].setBody[stepIndex]; // Получаем данные выбранного шага
		setFormData(selectedStep); // Заполняем форму данными редактируемого шага
		setCurrentStepIndex({ setIndex, stepIndex }); // Запоминаем индекс редактируемого шага
		onModeChange('edit'); // Устанавливаем режим редактирования
		setIsModalOpen(true); // Открываем модальное окно
	};

	const handleDeleteStep = (setIndex, stepIndex) => {
		const updatedSteps = steps.map((set, sIndex) => {
			if (sIndex === setIndex) {
				return {
					...set,
					setBody: set.setBody.filter((_, stIndex) => stIndex !== stepIndex),
				};
			}
			return set;
		});

		setSteps(updatedSteps); // Обновляем состояние шагов
	};

	// Сохранение нового шага или редактирование существующего
	const handleSaveStep = () => {
		if (mode === 'create') {
			// Создаем новый шаг
			const newStep = { ...formData, mode: 'folded' };
			let updatedSteps;

			if (steps.length === 0) {
				updatedSteps = [
					{
						setHeader: 'New Set',
						setBody: [newStep],
					},
				];
			} else {
				updatedSteps = steps.map((set, index) => {
					if (index === steps.length - 1) {
						return {
							...set,
							setBody: [...(set.setBody || []), newStep],
						};
					}
					return set;
				});
			}

			// Обновляем шаги
			setSteps(updatedSteps);
		} else if (mode === 'edit') {
			// Сохраняем изменения редактируемого шага
			const updatedSteps = steps.map((set, setIndex) => {
				if (setIndex === currentStepIndex.setIndex) {
					const updatedSetBody = set.setBody.map((step, stepIndex) => {
						if (stepIndex === currentStepIndex.stepIndex) {
							return { ...formData }; // Обновляем данные шага
						}
						return step;
					});
					return { ...set, setBody: updatedSetBody };
				}
				return set;
			});

			setSteps(updatedSteps); // Обновляем шаги
		}

		// Закрываем модальное окно и сбрасываем форму
		setIsModalOpen(false);
		setFormData({
			title: '',
			description: '',
			pageUrl: '',
			elementId: '',
			imgChecked: false,
			imgWidth: 0,
			imgHeight: 0,
			imageUrl: '',
		});
		setCurrentStepIndex(null); // Сбрасываем текущий индекс шага
	};

	const handleFormChange = newFormData => {
		setFormData(newFormData); // Обновляем данные формы
	};

	const handleCancel = () => {
		setIsModalOpen(false); // Закрываем окно
		setFormData({
			title: '',
			description: '',
			pageUrl: '',
			elementId: '',
			imgChecked: false,
			imgWidth: 0,
			imgHeight: 0,
			imageUrl: '',
		});
		setCurrentStepIndex(null); // Сбрасываем текущий индекс
	};

	const handleNext = () => {
		setCurrentStepIndex(prev => prev + 1);
		// const totalSteps = steps[currentStepIndex?.setIndex]?.setBody.length - 1;
		// debugger;
		// if (activeStepId < totalSteps) {
		// 	setActiveStepId(prev => prev + 1);
		// setCurrentStepIndex(prev => ({
		// 	...prev,
		// 	stepIndex: prev?.stepIndex + 1, // Обновляем индекс текущего шага
		// })
		// );
		// }
	};

	const handlePrevious = () => {
		setCurrentStepIndex(prev => prev - 1);
		// if (activeStepId > 0) {
		// Проверяем, что не находимся на первом шаге
		// 	setActiveStepId(prev => prev - 1);
		// 	setCurrentStepIndex(prev => ({
		// 		...prev,
		// 		stepIndex: prev?.stepIndex - 1, // Обновляем индекс текущего шага
		// 	}));
		// }
	};

	return (
		<div>
			<div>
				<h2>Create New Lesson</h2>
				<Button size='large' variant='lightGrey' onClick={handleCreateStep}>
					Add: Lesson
				</Button>

				{isModalOpen && (
					<Modal onClick={handleCancel}>
						<GuideStepForm
							mode={mode}
							formData={formData}
							onChange={handleFormChange}
							handleSaveStep={handleSaveStep}
							handleCancel={handleCancel}
						/>
					</Modal>
				)}
			</div>

			<h2>Guide Steps List:</h2>
			<ul>
				{steps.map((step, stepIndex) => {
					// const totalSteps = steps.length;

					// return (
					// 	<div key={`step-${stepIndex}`}>
					// 		{mode === 'execute'
					// 			? // Если режим execute, отображаем только активный шаг
					// 			  step.setBody
					// 					.filter((_, idx) => idx === activeStepId)
					// 					.map((filteredStep, idx) => (
					// 						<GuideStep
					// 							handleNext={handleNext}
					// 							handlePrevious={handlePrevious}
					// 							setListMode='execute' // Специальный мод для execute
					// 							totalSteps={totalSteps}
					// 							key={`step-${idx}`}
					// 							data={filteredStep}
					// 							mode='execute' // Специальный режим для execute
					// 							handleEditStep={() => handleEditStep(stepIndex, idx)}
					// 							handleDeleteStep={() =>
					// 								handleDeleteStep(stepIndex, idx)
					// 							}
					// 						/>
					// 					))
					// 			: // Вывод всех шагов, независимо от режима execute
					// 			  step.setBody &&
					// 			  step.setBody.map((stepItem, idx) => (
					// 					<GuideStep
					// 						handleNext={handleNext}
					// 						handlePrevious={handlePrevious}
					// 						setListMode={mode === 'execute' ? 'folded' : mode} // Если execute, меняем режим на folded
					// 						totalSteps={totalSteps}
					// 						key={`step-${stepIndex}-${idx}`}
					// 						data={stepItem}
					// 						mode='folded' // Режим folded для списка шагов
					// 						handleEditStep={() => handleEditStep(stepIndex, idx)}
					// 						handleDeleteStep={() => handleDeleteStep(stepIndex, idx)}
					// 					/>
					// 			  ))}
					// 	</div>
					// );
					return (
						<GuideStep
							// handleNext={handleNext}
							// handlePrevious={handlePrevious}
							// totalSteps={steps.length}
							onChange={(newStep) => }
							key={`step-${stepIndex}`}
							step={step}
							// mode={mode}
							handleEditStep={() => handleEditStep(stepIndex)}
							handleDeleteStep={() => handleDeleteStep(stepIndex)}
						/>
					);
				})}
			</ul>
			{mode === 'execute' && (
				<Modal>
					<h3>{steps[currentStepIndex].title}</h3>
					{steps[currentStepIndex].imageUrl && (
						<img
							src={steps[currentStepIndex].imageUrl}
							alt={steps[currentStepIndex].title}
							width={steps[currentStepIndex].imgWidth}
							height={steps[currentStepIndex].imgHeight}
						/>
					)}
					<p>TotalSteps {`${currentStepIndex + 1} of ${steps.length}`}</p>
					<Button
						onClick={handlePrevious}
						disabled={steps[currentStepIndex].stepIndex === 0}
					>
						Previous
					</Button>
					<Button variant='lightGrey'>Close</Button>
					<Button
						onClick={handleNext}
						disabled={steps[currentStepIndex].stepIndex === steps.length - 1}
					>
						Next
					</Button>
				</Modal>
			)}
		</div>
	);
}
