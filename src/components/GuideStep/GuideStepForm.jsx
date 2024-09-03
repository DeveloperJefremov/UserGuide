import React, { useEffect, useState } from 'react';
import styles from './GuideStepForm.module.css';

export default function GuideStepForm({
	title,
	description,
	elementId,
	imgChecked,
	imgWidth,
	imgHeight,
	imageUrl,
	order,
	isEditMode,
	onChange,
}) {
	const [formData, setFormData] = useState({
		title,
		description,
		elementId,
		imgChecked,
		imgWidth,
		imgHeight,
		imageUrl,
		order,
	});

	useEffect(() => {
		setFormData({
			title,
			description,
			elementId,
			imgChecked,
			imgWidth,
			imgHeight,
			imageUrl,
			order,
		});
	}, [
		title,
		description,
		elementId,
		imgChecked,
		imgWidth,
		imgHeight,
		imageUrl,
		order,
	]);

	const handleChange = e => {
		const { name, value, type, checked } = e.target;
		const updatedData = {
			...formData,
			[name]: type === 'checkbox' ? checked : value,
		};
		setFormData(updatedData);
		if (onChange) {
			onChange(updatedData); // Передаем изменения в родительский компонент
		}
	};

	return (
		<div className={styles.stepDetails}>
			<label>
				Title:
				<input
					className={styles.input}
					type='text'
					name='title'
					value={formData.title}
					onChange={isEditMode ? handleChange : null}
					disabled={!isEditMode}
				/>
			</label>
			<label>
				Order:
				<input
					className={styles.input}
					type='number'
					name='order'
					value={formData.order}
					onChange={isEditMode ? handleChange : null}
					disabled={!isEditMode}
				/>
			</label>
			<label>
				Description:
				<textarea
					className={styles.textarea}
					name='description'
					value={formData.description}
					onChange={isEditMode ? handleChange : null}
					disabled={!isEditMode}
				/>
			</label>
			<label>
				Element ID:
				<input
					className={styles.input}
					type='text'
					name='elementId'
					value={formData.elementId}
					onChange={isEditMode ? handleChange : null}
					disabled={!isEditMode}
				/>
			</label>
			<label>
				Image:
				<input
					name='imgChecked'
					type='checkbox'
					checked={formData.imgChecked}
					onChange={isEditMode ? handleChange : null}
					disabled={!isEditMode}
				/>
			</label>
			{formData.imgChecked && (
				<>
					<label>
						Image Width:
						<input
							type='number'
							name='imgWidth'
							min='1'
							value={formData.imgWidth}
							onChange={isEditMode ? handleChange : null}
							disabled={!isEditMode}
							className={styles.input}
						/>
					</label>
					<label>
						Image Height:
						<input
							type='number'
							name='imgHeight'
							min='1'
							value={formData.imgHeight}
							onChange={isEditMode ? handleChange : null}
							disabled={!isEditMode}
							className={styles.input}
						/>
					</label>
				</>
			)}
			<img
				className={styles.stepImagePreview}
				src={imageUrl}
				alt={title}
				width={formData.imgWidth}
				height={formData.imgHeight}
			/>
		</div>
	);
}
