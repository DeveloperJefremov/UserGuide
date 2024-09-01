import { useState } from 'react';
import ConfirmButtonsSet from '../Buttons/ConfirmButtonsSet';
import styles from './GuideStep.module.css';

const role = 'admin.';

const GuideStepHeader = ({ order, title, mode, modeHandler }) => {
	let displayButtonText = '';
	if (mode === 'folded') {
		displayButtonText = 'Show';
	} else if (mode === 'expanded') {
		displayButtonText = 'Hide';
	} else {
		displayButtonText = 'Add Error Handler';
	}

	return (
		<div className={styles.stepHeader}>
			<div className={styles.headerLeft}>
				<h3>{title}</h3>
				<p>Order: {order}</p>
			</div>
			<div className={styles.headerRight}>
				<button
					data-button-clicked='display'
					className={styles.showBtn}
					onClick={modeHandler}
				>
					{displayButtonText}
				</button>
				<button
					data-button-clicked='edit'
					className={styles.editBtn}
					onClick={modeHandler}
				>
					Edit
				</button>
				<button
					data-button-clicked='delete'
					className={styles.deleteBtn}
					onClick={modeHandler}
				>
					Delete
				</button>
			</div>
		</div>
	);
};

const GuideStepBody = ({
	mode,
	title,
	description,
	elementId,
	imgChecked,
	imgWidth,
	imgHeight,
	imageUrl,
}) => {
	const cssClassList = `${styles.stepBody} ${
		mode === 'expanded' ? styles.expanded : ''
	} ${mode === 'folded' ? styles.folded : ''}`;

	return (
		<div className={cssClassList}>
			<section className={styles.stepContent}>
				<div className={styles.stepDetails}>
					<label>
						Description:
						<textarea
							className={styles.textarea}
							name='description'
							value={description}
						/>
					</label>
					<label>
						Element ID:
						<input
							className={styles.input}
							type='text'
							name='elementId'
							value={elementId}
						/>
					</label>
					<label>
						Image:
						<input name='imgChecked' type='checkbox' checked={imgChecked} />
					</label>

					<label>
						Image Width:
						<input
							type='number'
							name='imgWidth'
							min='1'
							value={imgWidth}
							className={styles.input}
						/>
					</label>
					<label>
						Image Height:
						<input
							type='number'
							name='imgHeight'
							min='1'
							value={imgHeight}
							className={styles.input}
						/>
					</label>
					<img
						className={styles.stepImagePreview}
						src={imageUrl}
						alt={title}
						width={imgWidth}
						height={imgHeight}
					/>
				</div>
			</section>
		</div>
	);
};

const GuideStepFooter = ({ mode }) => {
	const cssClassList = `${styles.stepFooter} ${
		mode === 'expanded' ? styles.expanded : ''
	} ${mode === 'folded' ? styles.folded : ''}`;

	return (
		<div className={cssClassList}>
			<ConfirmButtonsSet />
		</div>
	);
};

export default function GuideStep(data, setCase) {
	const [stepMode, setStepMode] = useState('folded');

	const setModeHandler = clickEvent => {
		const buttonClick = clickEvent.target.getAttribute('data-button-clicked');
		console.log(buttonClick);

		if (stepMode === 'folded') {
			setStepMode('expanded');
		} else if (stepMode === 'expanded') {
			setStepMode('folded');
		}

		if (buttonClick === 'edit') {
			// Логика для кнопки редактирования (если требуется)
		}

		if (buttonClick === 'delete') {
			// Логика для кнопки удаления (если требуется)
		}
	};

	return (
		<div className={styles.step}>
			{role === 'admin' ? <div>GuideStep: item for create</div> : null}
			<GuideStepHeader
				mode={stepMode}
				modeHandler={setModeHandler}
				title={data.title}
				order={data.order}
			/>
			<GuideStepBody mode={stepMode} {...data} />
			<GuideStepFooter mode={stepMode} />
		</div>
	);
}
