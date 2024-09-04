import { useState } from 'react';
import Button from '../Button/Button';
import GuideStep from '../GuideStep/GuideStep';
import GuideStepForm from '../GuideStep/GuideStepForm';
import Modal from '../UI/Modal';

export default function GuideStepsList({
	data,
	guideSetsList,
	setGuideSetsList,
}) {
	const [stepListMode, setStepListMode] = useState('folded');
	const [steps, setSteps] = useState(data || []);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentStepIndex, setCurrentStepIndex] = useState(null); // Для хранения индекса редактируемого шага
	const [formData, setFormData] = useState({
		title: '',
		description: '',
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
			elementId: '',
			imgChecked: false,
			imgWidth: 0,
			imgHeight: 0,
			imageUrl: '',
		});
		setCurrentStepIndex(null); // Сбрасываем текущий индекс
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
				{steps.map((set, setIndex) => (
					<li key={set.setHeader || `set-${setIndex}`}>
						<div>
							{set.setBody &&
								set.setBody.map((step, stepIndex) => (
									<GuideStep
										key={`${set.setHeader}-${stepIndex}`}
										data={step}
										mode='folded'
										handleEditStep={() => handleEditStep(setIndex, stepIndex)} // Привязываем обработчик редактирования к кнопке
									/>
								))}
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
