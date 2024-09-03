import { useState } from 'react';
import Button from '../Button/Button';
import styles from './GuideStep.module.css';
import GuideStepForm from './GuideStepForm';

const GuideStepHeader = ({ order, title, mode, modeHandler }) => {
	let displayButtonText = '';
	if (mode === 'folded') {
		displayButtonText = 'Show';
	} else if (mode === 'expanded' || mode === 'edit') {
		displayButtonText = 'Hide';
	}

	return (
		<div className={styles.stepHeader}>
			<div className={styles.headerLeft}>
				<h3>{title}</h3>
				<p>Order: {order}</p>
			</div>
			<div className={styles.headerRight}>
				<Button
					size='sm'
					variant='default'
					data-button-clicked='display'
					onClick={modeHandler}
				>
					{displayButtonText}
				</Button>
				<Button
					size='sm'
					variant='grey'
					data-button-clicked='edit'
					onClick={modeHandler}
				>
					Edit
				</Button>
				{mode === 'edit' ? (
					<Button
						size='sm'
						variant='default'
						data-button-clicked='delete'
						onClick={modeHandler}
					>
						Delete
					</Button>
				) : null}
			</div>
		</div>
	);
};

const GuideStepBody = ({
	mode,
	data,
	handleFormChange,
	handleImgCheckboxChange,
	formData,
}) => {
	let cssClassList = `${styles.stepBody} ${
		mode === 'expanded' || mode === 'edit' ? styles.expanded : ''
	} ${mode === 'folded' ? styles.folded : ''}`;

	return (
		<div className={cssClassList}>
			<section className={styles.stepContent}>
				{mode === 'edit' ? (
					<GuideStepForm
						{...formData}
						onChange={handleFormChange}
						onImgCheckboxChange={handleImgCheckboxChange}
					/>
				) : (
					<div className={styles.stepDetails}>
						<label>
							Description:
							<textarea
								className={styles.textarea}
								name='description'
								value={data.description}
								readOnly
							/>
						</label>
						<label>
							Element ID:
							<input
								className={styles.input}
								type='text'
								name='elementId'
								value={data.elementId}
								readOnly
							/>
						</label>
						{data.imgChecked && data.imageUrl && (
							<>
								<label>
									Image Width:
									<input
										type='number'
										name='imgWidth'
										min='1'
										value={data.imgWidth}
										className={styles.input}
										readOnly
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
										readOnly
									/>
								</label>
								<img
									className={styles.stepImagePreview}
									src={data.imageUrl}
									alt={data.title}
									width={data.imgWidth}
									height={data.imgHeight}
								/>
							</>
						)}
					</div>
				)}
			</section>
		</div>
	);
};

const GuideStepFooter = ({ mode, onSave, onCancel }) => {
	const cssClassList = `${styles.stepFooter} ${
		mode === 'expanded' || mode === 'edit' ? styles.expanded : ''
	} ${mode === 'folded' ? styles.folded : ''}`;

	return (
		<div className={cssClassList}>
			{mode === 'edit' ? (
				<div className={styles.stepFooter}>
					<Button variant='lightGrey' size='md' onCancel={onCancel}>
						Cancel
					</Button>
					<Button variant='default' size='md' onSave={onSave}>
						Save
					</Button>
				</div>
			) : null}
		</div>
	);
};

export default function GuideStep(data, handleCreateStep) {
	const [stepMode, setStepMode] = useState(data.mode);
	const [formData, setFormData] = useState({
		title: data.title,
		description: data.description,
		elementId: data.elementId,
		imgChecked: data.imgChecked,
		imgWidth: data.imgWidth,
		imgHeight: data.imgHeight,
		imageUrl: data.imageUrl,
	});

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
		console.log(buttonClick);

		if (buttonClick === 'display') {
			if (stepMode === 'folded') {
				setStepMode('expanded');
			} else if (stepMode === 'expanded') {
				setStepMode('folded');
			}
		}

		if (buttonClick === 'edit') {
			setStepMode('edit');
		}

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
		console.log('Saved data:', formData);
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

	return (
		<div className={styles.step}>
			<GuideStepHeader
				mode={stepMode}
				modeHandler={setModeHandler}
				title={data.title}
				order={data.order}
			/>
			<GuideStepBody
				mode={stepMode}
				data={data}
				handleImgCheckboxChange={handleImgCheckboxChange}
			/>
			<GuideStepFooter
				mode={stepMode}
				onSave={handleSave}
				onCancel={handleCancel}
			/>
		</div>
	);
}
