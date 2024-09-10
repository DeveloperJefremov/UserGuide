import { useEffect, useState } from 'react';
import Button from '../Button/Button';

import styles from './GuideStep.module.css';

export default function GuideStep({
	step,

	handleEditStep,
	handleDeleteStep,
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

	return (
		<section className={styles.step}>
			<GuideStepHeader
				handleDeleteStep={handleDeleteStep}
				handleEditStep={handleEditStep}
				isShownStep={isShownStep}
				onDisplayChange={displayHandler}
				step={step}
			/>
			<GuideStepBody
				isShownStep={isShownStep}
				step={step}
				handleImgCheckboxChange={handleImgCheckboxChange}
			/>
			<GuideStepFooter isShownStep={isShownStep} />
		</section>
	);
}

const GuideStepHeader = ({
	handleDeleteStep,
	handleEditStep,
	isShownStep,
	onDisplayChange,
	step,
}) => {
	let displayButtonText = isShownStep ? '-' : '+';

	return (
		<header className={styles.stepHeader}>
			<div className={styles.headerLeft}>
				<h3>{step.title}</h3>
				<h4>Order: {step.order}</h4>
			</div>
			<div className={styles.headerRight}>
				<Button size='sm' variant='grey' onClick={handleEditStep}>
					Edit
				</Button>

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
			</div>
		</header>
	);
};

const GuideStepBody = ({
	step,

	isShownStep,
}) => {
	let cssClassList = `${styles.stepBody} ${
		isShownStep ? styles.expanded : ''
	} ${!isShownStep ? styles.folded : ''}`;

	return (
		<main className={cssClassList}>
			<article className={styles.stepContent}>
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
			</article>
		</main>
	);
};

const GuideStepFooter = ({ isShownStep }) => {
	const cssClassList = `${styles.stepFooter} ${
		isShownStep ? styles.expanded : ''
	} ${!isShownStep ? styles.folded : ''}`;

	return <footer className={cssClassList}></footer>;
};
