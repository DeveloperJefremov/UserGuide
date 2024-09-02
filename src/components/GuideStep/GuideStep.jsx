import { useState } from 'react';
import Button from '../Button/Button';
import styles from './GuideStep.module.css';
import GuideStepForm from './GuideStepForm';

const role = 'admin';

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
					className={styles.showBtn}
					onClick={modeHandler}
				>
					{displayButtonText}
				</Button>
				<button
					data-button-clicked='edit'
					className={styles.editBtn}
					onClick={modeHandler}
				>
					Edit
				</button>
				{mode === 'edit' ? (
					<button
						data-button-clicked='delete'
						className={styles.deleteBtn}
						onClick={modeHandler}
					>
						Delete
					</button>
				) : null}
			</div>
		</div>
	);
};

// const GuideStepBody = ({ mode, ...data }) => {
// 	const cssClassList = `${styles.stepBody} ${
// 		mode === 'expanded' || mode === 'edit' ? styles.expanded : ''
// 	} ${mode === 'folded' ? styles.folded : ''}`;

// 	return (
// 		<div className={cssClassList}>
// 			<section className={styles.stepContent}>
// 				<GuideStepForm {...data} /> {/* Используем новый компонент */}
// 			</section>
// 		</div>
// 	);
// };
const GuideStepBody = ({
	mode,
	data: {
		title,
		description,
		elementId,
		imgChecked,
		imgWidth,
		imgHeight,
		imageUrl,
	},
}) => {
	let cssClassList = `${styles.stepBody} ${
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

const GuideStepFooter = ({ mode, onSave, onCancel }) => {
	const cssClassList = `${styles.stepFooter} ${
		mode === 'expanded' || mode === 'edit' ? styles.expanded : ''
	} ${mode === 'folded' ? styles.folded : ''}`;

	return (
		<div className={cssClassList}>
			{mode === 'edit' ? (
				<div className={styles.stepFooter}>
					<button className={styles.cancelBtn} onCancel={onCancel}>
						Cancel
					</button>
					<button className={styles.saveBtn} onSave={onSave}>
						Save
					</button>
				</div>
			) : null}
		</div>
	);
};

export default function GuideStep(data) {
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

		if (buttonClick === 'delete') {
			// Логика для кнопки удаления (если требуется)
		}
	};

	const handleSave = () => {
		// Сохраняем изменения
		console.log('Saved data:', formData);
		setStepMode('folded'); // Возвращаем в свернутый режим после сохранения
	};

	const handleCancel = () => {
		// Отменяем изменения, возвращаемся к исходным данным
		setFormData({
			title: data.title,
			description: data.description,
			elementId: data.elementId,
			imgChecked: data.imgChecked,
			imgWidth: data.imgWidth,
			imgHeight: data.imgHeight,
			imageUrl: data.imageUrl,
		});
		setStepMode('folded'); // Возвращаем в свернутый режим при отмене
	};

	const handleFormChange = newFormData => {
		setFormData(newFormData); // Обновляем состояние при изменении в форме
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
			<GuideStepBody mode={stepMode} data={data} />
			<GuideStepFooter
				mode={stepMode}
				onSave={handleSave}
				onCancel={handleCancel}
			/>
		</div>
	);
}
