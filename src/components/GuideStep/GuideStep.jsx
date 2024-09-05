import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import Modal from '../UI/Modal';
import styles from './GuideStep.module.css';
import GuideStepForm from './GuideStepForm';

export default function GuideStep({
	data,
	handleNext,
	handlePrevious,
	handleEditStep,
	handleDeleteStep,
	totalSteps,
	setListMode,
	currentStepIndex, // Передаем индекс текущего шага из родительского компонента
}) {
	const [stepMode, setStepMode] = useState('folded');
	const [formData, setFormData] = useState({
		title: data.title,
		description: data.description,
		pageUrl: data.pageUrl,
		elementId: data.elementId,
		imgChecked: data.imgChecked,
		imgWidth: data.imgWidth,
		imgHeight: data.imgHeight,
		imageUrl: data.imageUrl,
	});

	const [isModalOpen, setIsModalOpen] = useState(false);

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
				const data = await response.json();
				if (data && data.message) {
					setFormData(prevState => ({
						...prevState,
						imageUrl: data.message,
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
			if (stepMode === 'folded') {
				setStepMode('expanded');
			} else if (stepMode === 'expanded') {
				setStepMode('folded');
			}
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
		setStepMode('folded'); // Возвращаем в свернутый режим после сохранения
	};

	const handleCancel = () => {
		// Отменяем изменения, возвращаемся к исходным данным
		setFormData(
			...data
			// 	{

			// 	title: data.title,
			// 	description: data.description,
			// 	elementId: data.elementId,
			// 	imgChecked: data.imgChecked,
			// 	imgWidth: data.imgWidth,
			// 	imgHeight: data.imgHeight,
			// 	imageUrl: data.imageUrl,
			// }
		);
		setStepMode('folded'); // Возвращаем в свернутый режим при отмене
	};

	const handleFormChange = newFormData => {
		setFormData(newFormData); // Обновляем состояние при изменении в форме
	};

	// Обработчик для кнопки "Previous"

	return (
		<div className={styles.step}>
			<h2>setListMode: {setListMode}</h2>

			<GuideStepHeader
				handleDeleteStep={handleDeleteStep}
				handleEditStep={handleEditStep}
				mode={stepMode}
				modeHandler={setModeHandler}
				data={data}
				handleFormChange={handleFormChange}
				handleImgCheckboxChange={handleImgCheckboxChange}
			/>
			<GuideStepBody
				handlePrevious={handlePrevious}
				handleNext={handleNext}
				totalSteps={totalSteps}
				setListMode={setListMode}
				mode={stepMode}
				data={data}
				handleImgCheckboxChange={handleImgCheckboxChange}
				currentStepIndex={currentStepIndex}
			/>
			<GuideStepFooter
				mode={stepMode}
				onSave={handleSave}
				onCancel={handleCancel}
			/>
		</div>
	);
}

const GuideStepHeader = ({
	handleDeleteStep,
	handleEditStep,
	mode,
	modeHandler,
	data,
	handleFormChange,
	handleImgCheckboxChange,
}) => {
	let displayButtonText = '';
	if (mode === 'folded') {
		displayButtonText = '+';
	} else if (mode === 'expanded') {
		displayButtonText = '-';
	}

	return (
		<div className={styles.stepHeader}>
			<div className={styles.headerLeft}>
				<h3>{data.title}</h3>
				<p>Order: {data.order}</p>
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
					onClick={modeHandler}
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
						formData={data}
						onChange={handleFormChange}
						onImgCheckboxChange={handleImgCheckboxChange}
					/>
				</Modal>
			) : null} */}
		</div>
	);
};

const GuideStepBody = ({
	handleNext,
	handlePrevious,

	totalSteps,
	setListMode,
	mode,
	data,

	// formData,
}) => {
	let cssClassList = `${styles.stepBody} ${
		mode === 'expanded' ? styles.expanded : ''
	} ${mode === 'folded' ? styles.folded : ''}`;

	// useEffect(() => {
	// 	console.log('mode in body: ', mode);
	// }, [mode]);
	return (
		<div className={cssClassList}>
			<section className={styles.stepContent}>
				<div className={styles.stepDetails}>
					{data.description && (
						<label>
							Description:
							<textarea
								className={styles.textarea}
								name='description'
								value={data.description}
								disabled
							/>
						</label>
					)}
					{data.pageUrl && (
						<label>
							PageUrl:
							<input
								className={styles.input}
								type='text'
								name='pageUrl'
								value={data.pageUrl}
								disabled
							/>
						</label>
					)}
					{data.elementId && (
						<label>
							Element ID:
							<input
								className={styles.input}
								type='text'
								name='elementId'
								value={data.elementId}
								disabled
							/>
						</label>
					)}
					{data.imgChecked && data.imageUrl && (
						<div>
							<label>
								Image Width:
								<input
									type='number'
									name='imgWidth'
									min='1'
									value={data.imgWidth}
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
									value={data.imgHeight}
									className={styles.input}
									disabled
								/>
							</label>
							<img
								className={styles.stepImagePreview}
								src={data.imageUrl}
								alt={data.title}
								width={data.imgWidth}
								height={data.imgHeight}
							/>
						</div>
					)}
				</div>
			</section>
			{setListMode === 'execute' && (
				<Modal>
					<h3>{data.title}</h3>
					{data.imageUrl && (
						<img
							src={data.imageUrl}
							alt={data.title}
							width={data.imgWidth}
							height={data.imgHeight}
						/>
					)}
					<p>{/* Step: {currentStepIndex + 1} of {totalSteps} */}</p>
					<Button onClick={handlePrevious} disabled={data.stepIndex === 0}>
						Previous
					</Button>
					<Button variant='lightGrey'>Close</Button>
					<Button
						onClick={handleNext}
						disabled={data.stepIndex === totalSteps - 1}
					>
						Next
					</Button>
				</Modal>
			)}
		</div>
	);
};

const GuideStepFooter = ({ mode, onSave, onCancel }) => {
	const cssClassList = `${styles.stepFooter} ${
		mode === 'expanded' ? styles.expanded : ''
	} ${mode === 'folded' ? styles.folded : ''}`;

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
