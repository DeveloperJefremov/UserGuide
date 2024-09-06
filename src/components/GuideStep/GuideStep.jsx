import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import Modal from '../UI/Modal';
import styles from './GuideStep.module.css';
import GuideStepForm from './GuideStepForm';

export default function GuideStep({
	step,
	// handleNext,
	// handlePrevious,
	//onChange, FIXME: need implement changing logic which send new exemplar of step
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

	const displayHandler = clickEvent => {
		const buttonClick = clickEvent.target.getAttribute('data-button-clicked');
		console.log('mode setModeHandler - ', buttonClick);

		if (buttonClick === 'display') {
			setIsShownStep(prevState => !prevState);
		}
	};

	// const handleSave = () => {
	// 	setIsShownStep(false);
	// };

	// const handleCancel = () => {
	// 	setFormData(...step);
	// 	setIsShownStep(false);
	// };

	// const handleFormChange = (value, fieldName) => {
	// 	setFormData(prev => ({ ...prev, [fieldName]: value }));
	// };

	return (
		<div className={styles.step}>
			{/* <h2>setListMode: {mode}</h2> */}

			<GuideStepHeader
				handleDeleteStep={handleDeleteStep}
				handleEditStep={handleEditStep}
				isShownStep={isShownStep}
				onDisplayChange={displayHandler}
				step={step}
				// handleFormChange={handleFormChange}
				// handleImgCheckboxChange={handleImgCheckboxChange}
			/>
			<GuideStepBody
				// handlePrevious={handlePrevious}
				// handleNext={handleNext}
				// totalSteps={totalSteps}
				// mode={mode}
				// onChange={handleFormChange}
				isShownStep={isShownStep}
				step={formData}
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
	formData,
	// onChange,
	// handleNext,
	// handlePrevious,
	// totalSteps,
	isShownStep,
	// mode,

	// handleImgCheckboxChange,
}) => {
	let cssClassList = `${styles.stepBody} ${
		isShownStep ? styles.expanded : ''
	} ${!isShownStep ? styles.folded : ''}`;

	useEffect(() => {
		console.log('step in body: ', formData);
	}, [formData]);
	return (
		<div className={cssClassList}>
			<section className={styles.stepContent}>
				<div className={styles.stepDetails}>
					{formData.description && (
						<label>
							Description:
							<textarea
								// onChange={event => onChange(event.target.value, 'description')}
								className={styles.textarea}
								name='description'
								value={formData.description}
								disabled
							/>
						</label>
					)}
					{formData.pageUrl && (
						<label>
							PageUrl:
							<input
								// onChange={event => onChange(event.target.value, 'pageUrl')}
								className={styles.input}
								type='text'
								name='pageUrl'
								value={formData.pageUrl}
								disabled
							/>
						</label>
					)}
					{formData.elementId && (
						<label>
							Element ID:
							<input
								// onChange={event => onChange(event.target.value, 'elementId')}
								className={styles.input}
								type='text'
								name='elementId'
								value={formData.elementId}
								disabled
							/>
						</label>
					)}
					{formData.imgChecked && formData.imageUrl && (
						<div>
							<label>
								Image Width:
								<input
									// onChange={event => onChange(event.target.value, 'imgWidth')}
									type='number'
									name='imgWidth'
									min='1'
									value={formData.imgWidth}
									className={styles.input}
									disabled
								/>
							</label>
							<label>
								Image Height:
								<input
									// onChange={event => onChange(event.target.value, 'imgHeight')}
									type='number'
									name='imgHeight'
									min='1'
									value={formData.imgHeight}
									className={styles.input}
									disabled
								/>
							</label>
							<img
								className={styles.stepImagePreview}
								src={formData.imageUrl}
								alt={formData.title}
								width={formData.imgWidth}
								height={formData.imgHeight}
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
