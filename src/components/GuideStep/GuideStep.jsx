import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import Modal from '../UI/Modal';
import styles from './GuideStep.module.css';
import GuideStepForm from './GuideStepForm';

export default function GuideStep({
	step,
	// handleNext,
	// handlePrevious,
	//onChange, FIXME: need implement changin logic which send new wxwmplar of steo
	handleEditStep,
	handleDeleteStep,
	// totalSteps,
	// mode,
	// currentStepIndex, // Передаем индекс текущего шага из родительского компонента
}) {
	const [isShownStep, setIsShownStep] = useState(false);
	const [formData, setFormData] = useState({
		title: step.title,
		description: step.description,
		pageUrl: step.pageUrl,
		elementId: step.elementId,
		imgChecked: step.imgChecked,
		imgWidth: step.imgWidth,
		imgHeight: step.imgHeight,
		imageUrl: step.imageUrl,
	});

	useEffect(() => {
		console.log('step - ', step);
	}, [step]);

	// const [isModalOpen, setIsModalOpen] = useState(false);

	// useEffect(() => {
	// 	console.dir(handleEditStep instanceof Function);
	// }, [handleEditStep]);

	// Следим за изменением setListMode
	// useEffect(() => {
	// 	if (setListMode === 'execute') {
	// 		setStepMode('execute'); // Устанавливаем stepMode в 'execute'
	// 		setIsModalOpen(true); // Открываем модальное окно
	// 	} else {
	// 		setStepMode('folded'); // Возвращаем в 'folded' если setListMode изменился
	// 		setIsModalOpen(false); // Закрываем модальное окно
	// 	}
	// }, [setListMode]);

	const handleImgCheckboxChange = async event => {
		const checked = event.target.checked;
		setFormData(prevState => ({
			...prevState,
			imgChecked: checked,
		}));

		if (checked) {
			try {
				const response = await fetch('https://dog.ceo/api/breeds/image/random');
				const step = await response.json();
				if (step && step.message) {
					setFormData(prevState => ({
						...prevState,
						imageUrl: step.message,
						imgWidth: 100, // Устанавливаем ширину изображения
						imgHeight: 100, // Устанавливаем высоту изображения
					}));
				} else {
					setFormData(prevState => ({
						...prevState,
						imageUrl: '',
					}));
				}
			} catch (error) {
				console.error('Ошибка при получении изображения:', error);
				setFormData(prevState => ({
					...prevState,
					imageUrl: '',
				}));
			}
		} else {
			setFormData(prevState => ({
				...prevState,
				imageUrl: '',
				imgWidth: 0,
				imgHeight: 0,
			}));
		}
	};

	const setModeHandler = clickEvent => {
		const buttonClick = clickEvent.target.getAttribute('data-button-clicked');
		console.log('mode setModeHandler - ', buttonClick);

		if (buttonClick === 'display') {
			setIsShownStep(prevState => !prevState);
		}

		// if (buttonClick === 'edit') {
		// 	setStepMode(() => 'edit');
		// }

		// if (buttonClick === 'delete') {
		// 	// Логика для кнопки удаления (если требуется)
		// }

		// if (buttonClick === 'create' && handleCreateStep) {
		// 	handleCreateStep(formData); // Передаем данные формы при создании
		// 	setStepMode('folded'); // Возвращаемся в свернутый режим
		// }
	};

	const handleSave = () => {
		// Сохраняем изменения
		// console.log('Saved data:', formData);
		// setStepMode('folded'); // Возвращаем в свернутый режим после сохранения
		setIsShownStep(false);
	};

	const handleCancel = () => {
		// Отменяем изменения, возвращаемся к исходным данным
		setFormData(
			...step
			// 	{

			// 	title: data.title,
			// 	description: data.description,
			// 	elementId: step.elementId,
			// 	imgChecked: step.imgChecked,
			// 	imgWidth: step.imgWidth,
			// 	imgHeight: step.imgHeight,
			// 	imageUrl: step.imageUrl,
			// }
		);
		setIsShownStep(false);
		// setStepMode('folded'); // Возвращаем в свернутый режим при отмене
	};

	const handleFormChange = newFormData => {
		setFormData(newFormData); // Обновляем состояние при изменении в форме
	};

	// Обработчик для кнопки "Previous"

	return (
		<div className={styles.step}>
			{/* <h2>setListMode: {mode}</h2> */}

			<GuideStepHeader
				handleDeleteStep={handleDeleteStep}
				handleEditStep={handleEditStep}
				isShownStep={isShownStep}
				onDisplayChange={setModeHandler}
				step={step}
				// handleFormChange={handleFormChange}
				// handleImgCheckboxChange={handleImgCheckboxChange}
			/>
			<GuideStepBody
				// handlePrevious={handlePrevious}
				// handleNext={handleNext}
				// totalSteps={totalSteps}
				// mode={mode}
				isShownStep={isShownStep}
				step={step}
				handleImgCheckboxChange={handleImgCheckboxChange}
				// currentStepIndex={currentStepIndex}
			/>
			<GuideStepFooter
				isShownStep={isShownStep}
				// onSave={handleSave}
				// onCancel={handleCancel}
			/>
		</div>
	);
}

const GuideStepHeader = ({
	handleDeleteStep,
	handleEditStep,
	isShownStep,
	onDisplayChange,
	step,
	// handleFormChange,
	// handleImgCheckboxChange,
}) => {
	let displayButtonText = isShownStep ? '-' : '+';

	return (
		<div className={styles.stepHeader}>
			<div className={styles.headerLeft}>
				<h3>{step.title}</h3>
				<p>Order: {step.order}</p>
			</div>
			<div className={styles.headerRight}>
				<Button
					size='sm'
					variant='grey'
					// data-button-clicked='edit'
					onClick={handleEditStep}
				>
					Edit
				</Button>
				{/* {mode === 'edit' && ( */}
				<Button
					size='sm'
					variant='default'
					data-button-clicked='delete'
					onClick={handleDeleteStep}
				>
					Delete
				</Button>
				<Button
					size='icon'
					variant='lightGrey'
					data-button-clicked='display'
					onClick={onDisplayChange}
				>
					{displayButtonText}
				</Button>
				{/* )} */}
			</div>
			{/* {mode === 'edit' ? (
				<Modal>
					<GuideStepForm
						// mode={mode}
						//FIXME: props
						formData={step}
						onChange={handleFormChange}
						onImgCheckboxChange={handleImgCheckboxChange}
					/>
				</Modal>
			) : null} */}
		</div>
	);
};

const GuideStepBody = ({
	// handleNext,
	// handlePrevious,
	// totalSteps,
	isShownStep,
	// mode,
	step,
	// handleImgCheckboxChange,
}) => {
	let cssClassList = `${styles.stepBody} ${
		isShownStep ? styles.expanded : ''
	} ${!isShownStep ? styles.folded : ''}`;

	// useEffect(() => {
	// 	console.log('mode in body: ', mode);
	// }, [mode]);
	return (
		<div className={cssClassList}>
			<section className={styles.stepContent}>
				<div className={styles.stepDetails}>
					{step.description && (
						<label>
							Description:
							<textarea
								className={styles.textarea}
								name='description'
								value={step.description}
								disabled
							/>
						</label>
					)}
					{step.pageUrl && (
						<label>
							PageUrl:
							<input
								className={styles.input}
								type='text'
								name='pageUrl'
								value={step.pageUrl}
								disabled
							/>
						</label>
					)}
					{step.elementId && (
						<label>
							Element ID:
							<input
								className={styles.input}
								type='text'
								name='elementId'
								value={step.elementId}
								disabled
							/>
						</label>
					)}
					{step.imgChecked && step.imageUrl && (
						<div>
							<label>
								Image Width:
								<input
									type='number'
									name='imgWidth'
									min='1'
									value={step.imgWidth}
									className={styles.input}
									disabled
								/>
							</label>
							<label>
								Image Height:
								<input
									type='number'
									name='imgHeight'
									min='1'
									value={step.imgHeight}
									className={styles.input}
									disabled
								/>
							</label>
							<img
								className={styles.stepImagePreview}
								src={step.imageUrl}
								alt={step.title}
								width={step.imgWidth}
								height={step.imgHeight}
							/>
						</div>
					)}
				</div>
			</section>
			{/* {setListMode === 'execute' && (
				<Modal>
					<h3>{step.title}</h3>
					{step.imageUrl && (
						<img
							src={step.imageUrl}
							alt={step.title}
							width={step.imgWidth}
							height={step.imgHeight}
						/>
					)}
					<p>TotalSteps {totalSteps}</p>
					<Button onClick={handlePrevious} disabled={step.stepIndex === 0}>
						Previous
					</Button>
					<Button variant='lightGrey'>Close</Button>
					<Button
						onClick={handleNext}
						disabled={step.stepIndex === totalSteps - 1}
					>
						Next
					</Button>
				</Modal>
			)} */}
		</div>
	);
};

const GuideStepFooter = ({
	isShownStep,
	// onSave, onCancel
}) => {
	const cssClassList = `${styles.stepFooter} ${
		isShownStep ? styles.expanded : ''
	} ${!isShownStep ? styles.folded : ''}`;

	return (
		<div className={cssClassList}>
			{/* {mode === 'edit' ? (
				<div className={styles.stepFooter}>
					<Button variant='lightGrey' size='md' onCancel={onCancel}>
						Cancel
					</Button>
					<Button variant='default' size='md' onSave={onSave}>
						Save
					</Button>
				</div>
			) : null} */}
		</div>
	);
};
