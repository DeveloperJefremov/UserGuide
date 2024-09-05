import { useState } from 'react';
import Button from '../Button/Button';
import GuideStep from '../GuideStep/GuideStep';
import GuideStepForm from '../GuideStep/GuideStepForm';
import Modal from '../UI/Modal';

export default function GuideStepsList({
	setListMode,
	data,
	guideSetsList,
	setGuideSetsList,
}) {
	const [stepListMode, setStepListMode] = useState('folded');
	const [steps, setSteps] = useState(data || []);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [activeStepId, setActiveStepId] = useState(0);
	const [activeSteps, setActiveSteps] = useState([]);
	const [currentStepIndex, setCurrentStepIndex] = useState(null); // Для хранения индекса редактируемого шага
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

	// Создание нового шага
	const handleCreateStep = () => {
		setFormData(''); // Очищаем данные формы
		setStepListMode('create'); // Устанавливаем режим создания
		setIsModalOpen(true); // Открываем модальное окно
	};

	// Редактирование существующего шага
	const handleEditStep = (setIndex, stepIndex) => {
		const selectedStep = steps[setIndex].setBody[stepIndex]; // Получаем данные выбранного шага
		setFormData(selectedStep); // Заполняем форму данными редактируемого шага
		setCurrentStepIndex({ setIndex, stepIndex }); // Запоминаем индекс редактируемого шага
		setStepListMode('edit'); // Устанавливаем режим редактирования
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
		if (stepListMode === 'create') {
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
		} else if (stepListMode === 'edit') {
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
		if (
			activeStepId <
			steps[currentStepIndex?.setIndex]?.setBody.length - 1 // Проверяем, что есть куда идти дальше
		) {
			setActiveStepId(prev => prev + 1);
			setCurrentStepIndex(prev => ({
				...prev,
				stepIndex: prev?.stepIndex + 1, // Обновляем индекс текущего шага
			}));
		}
	};

	const handlePrevious = () => {
		if (activeStepId > 0) {
			// Проверяем, что не находимся на первом шаге
			setActiveStepId(prev => prev - 1);
			setCurrentStepIndex(prev => ({
				...prev,
				stepIndex: prev?.stepIndex - 1, // Обновляем индекс текущего шага
			}));
		}
	};

	const toggleStep = (setIndex, stepIndex) => {
		const stepId = `${setIndex}-${stepIndex}`; // Уникальный идентификатор шага
		setActiveSteps(prevActiveSteps => {
			if (prevActiveSteps.includes(stepId)) {
				// Убираем шаг из активных
				return prevActiveSteps.filter(id => id !== stepId);
			} else {
				// Добавляем шаг в активные
				return [...prevActiveSteps, stepId];
			}
		});
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
							stepListMode={stepListMode}
							formData={formData}
							onChange={handleFormChange}
							handleSaveStep={handleSaveStep}
							handleCancel={handleCancel}
						/>
					</Modal>
				)}
			</div>

			<ul>
				<h2>Guide Steps List:</h2>
				{steps.map((set, setIndex) => {
					const totalSteps = set.setBody ? set.setBody.length : 0; // Динамическое вычисление totalSteps
					// const totalSteps = set.setBody.length;
					return (
						<div key={set.setHeader || `set-${setIndex}`}>
							<div>
								{setListMode === 'execute'
									? // Если режим execute, отображаем только активный шаг
									  set.setBody
											.filter((_, stepIndex) => stepIndex === activeStepId)
											.map((step, stepIndex) => (
												<GuideStep
													handleNext={handleNext}
													handlePrevious={handlePrevious}
													setListMode={setListMode}
													totalSteps={totalSteps} // Передаем totalSteps в компонент GuideStep
													key={`${set.setHeader}-${stepIndex}`}
													data={step}
													mode='folded'
													handleEditStep={() =>
														handleEditStep(setIndex, stepIndex)
													} // Привязываем обработчик редактирования к кнопке
													handleDeleteStep={() =>
														handleDeleteStep(setIndex, stepIndex)
													} // Привязываем обработчик удаления к кнопке
												/>
											))
									: // В остальных случаях отображаем все шаги
									  set.setBody &&
									  set.setBody.map((step, stepIndex) => (
											<GuideStep
												handleNext={handleNext}
												handlePrevious={handlePrevious}
												setListMode={setListMode}
												totalSteps={totalSteps} // Передаем totalSteps в компонент GuideStep
												key={`${set.setHeader}-${stepIndex}`}
												data={step}
												mode='folded'
												handleEditStep={() =>
													handleEditStep(setIndex, stepIndex)
												} // Привязываем обработчик редактирования к кнопке
												handleDeleteStep={() =>
													handleDeleteStep(setIndex, stepIndex)
												} // Привязываем обработчик удаления к кнопке
											/>
									  ))}
							</div>
						</div>
					);
				})}
			</ul>
		</div>
	);
}
