import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import GuideStep from '../GuideStep/GuideStep';
import GuideStepForm from '../GuideStep/GuideStepForm';
import Modal from '../UI/Modal';
import styles from './GuideStepsList.module.css';

export default function GuideStepsList({
	mode,
	onModeChange,
	steps: initialSteps,
	guideSetId,
	activeGuideSetId,
	isGuideModalOpen,
}) {
	const [steps, setSteps] = useState(initialSteps || []);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentStepIndex, setCurrentStepIndex] = useState(0); // Для хранения индекса редактируемого шага
	const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 }); // Позиция модального окна

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
		console.log('index - ', currentStepIndex);
	}, [currentStepIndex]);

	// Создание нового шага
	const handleCreateStep = () => {
		setFormData({
			title: '',
			description: '',
			pageUrl: '',
			elementId: '',
			imgChecked: false,
			imgWidth: 0,
			imgHeight: 0,
			imageUrl: '',
		}); // Очищаем данные формы
		onModeChange('create'); // Устанавливаем режим создания
		setIsModalOpen(true); // Открываем модальное окно
	};

	// Сохранение нового шага
	const handleSaveStep = () => {
		if (mode === 'create') {
			// Создаем новый шаг с уникальным ID
			const newStep = {
				...formData,
				id: String(steps.length + 1), // Генерируем новый ID
				order: steps.length + 1, // Устанавливаем порядок
			};

			// Обновляем состояние шагов
			setSteps([...steps, newStep]);

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
		} else if (mode === 'edit') {
			const updatedSteps = steps.map((step, index) =>
				index === currentStepIndex ? { ...step, ...formData } : step
			);
			setSteps(updatedSteps);

			setIsModalOpen(false);
			setCurrentStepIndex(0);
		}
	};

	// Удаление шага
	const handleDeleteStep = stepIndex => {
		const updatedSteps = steps.filter((_, index) => index !== stepIndex);
		setSteps(updatedSteps); // Обновляем шаги в состоянии

		// Обновляем currentStepIndex, чтобы не выйти за пределы массива
		if (currentStepIndex >= updatedSteps.length) {
			setCurrentStepIndex(updatedSteps.length - 1);
		}
	};

	const handleFormChange = newFormData => {
		setFormData(newFormData); // Обновляем данные формы
	};

	const handleEditStep = stepIndex => {
		const selectedStep = steps[stepIndex]; // Получаем данные выбранного шага
		setFormData(selectedStep); // Заполняем форму данными редактируемого шага
		setCurrentStepIndex(stepIndex); // Запоминаем индекс редактируемого шага
		onModeChange('edit'); // Устанавливаем режим редактирования
		setIsModalOpen(true); // Открываем модальное окно
	};

	// Сохранение нового шага или редактирование существующего

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
		setCurrentStepIndex(0); // Сбрасываем текущий индекс
		onModeChange('display');
	};

	// Переход на следующий шаг
	const handleNext = () => {
		if (currentStepIndex < steps.length - 1) {
			setCurrentStepIndex(prev => prev + 1);
		}
	};

	// Переход на предыдущий шаг
	const handlePrevious = () => {
		if (currentStepIndex > 0) {
			setCurrentStepIndex(prev => prev - 1);
		}
	};

	// Функция для выделения элемента
	const highlightElement = elementId => {
		const element = document.getElementById(elementId); // Найти элемент по ID
		if (element) {
			element.classList.add(styles.highlight); // Добавить класс для выделения из модуля
			const rect = element.getBoundingClientRect(); // Получаем координаты элемента
			setModalPosition({
				top: rect.top + window.scrollY,
				left: rect.left + window.scrollX + rect.width + 10, // Модальное окно справа от элемента
			});
		}
	};

	// Функция для снятия выделения с элемента
	const removeHighlightElement = elementId => {
		const element = document.getElementById(elementId); // Найти элемент по ID
		if (element) {
			element.classList.remove(styles.highlight); // Убрать класс выделения
		}
	};

	useEffect(() => {
		// Когда шаг меняется и если у шага есть elementId и набор активен, выделяем элемент
		if (
			mode === 'execute' &&
			activeGuideSetId === guideSetId && // Проверяем, является ли этот набор активным
			steps[currentStepIndex]?.elementId
		) {
			highlightElement(steps[currentStepIndex].elementId);
		}

		// Убираем выделение при закрытии модального окна, смене шага или изменении активного набора
		return () => {
			if (steps[currentStepIndex]?.elementId) {
				removeHighlightElement(steps[currentStepIndex].elementId);
			}
		};
	}, [currentStepIndex, mode, steps, activeGuideSetId, guideSetId]);

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
					return (
						<li className={styles.fontList} key={step.id}>
							<GuideStep
								key={`step-${step.id}`}
								step={step}
								handleEditStep={() => handleEditStep(stepIndex)}
								handleDeleteStep={() => handleDeleteStep(stepIndex)}
							/>
						</li>
					);
				})}
			</ul>

			{isGuideModalOpen &&
				mode === 'execute' &&
				activeGuideSetId === guideSetId &&
				steps[currentStepIndex] && (
					<Modal
						style={{
							position: 'absolute',
							top: `${modalPosition.top}px`,
							left: `${modalPosition.left}px`,
						}}
					>
						<h3>{steps[currentStepIndex]?.title}</h3>
						{steps[currentStepIndex]?.imageUrl && (
							<img
								src={steps[currentStepIndex].imageUrl}
								alt={steps[currentStepIndex].title}
								width={steps[currentStepIndex].imgWidth}
								height={steps[currentStepIndex].imgHeight}
							/>
						)}
						<p>{steps[currentStepIndex]?.description}</p>
						<p>Total Steps: {`${currentStepIndex + 1} of ${steps.length}`}</p>
						<Button onClick={handlePrevious} disabled={currentStepIndex === 0}>
							Previous
						</Button>
						<Button variant='lightGrey' onClick={handleCancel}>
							Close
						</Button>
						<Button
							onClick={handleNext}
							disabled={currentStepIndex === steps.length - 1}
						>
							Next
						</Button>
					</Modal>
				)}
		</div>
	);
}
