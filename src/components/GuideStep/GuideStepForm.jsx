import React, { useEffect, useState } from 'react';
import styles from './GuideStepForm.module.css';

export default function GuideStepForm({
	formData: initialFormData,

	mode,
	onChange,
	isEditMode,
}) {
	// const {
	// 	title,
	// 	description,
	// 	elementId,
	// 	imgChecked,
	// 	imgWidth,
	// 	imgHeight,
	// 	imageUrl,
	// 	order,
	// } = formData;

	const [formData, setFormData] = useState(initialFormData);

	// useEffect(() => {
	// 	setFormData({
	// 		title,
	// 		description,
	// 		elementId,
	// 		imgChecked,
	// 		imgWidth,
	// 		imgHeight,
	// 		imageUrl,
	// 		order,
	// 	});
	// }, [
	// 	title,
	// 	description,
	// 	elementId,
	// 	imgChecked,
	// 	imgWidth,
	// 	imgHeight,
	// 	imageUrl,
	// 	order,
	// ]);

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

	const handleImgCheckboxChange = async e => {
		const checked = e.target.checked;
		let updatedData = { ...formData, imgChecked: checked };

		if (checked) {
			try {
				const response = await fetch('https://dog.ceo/api/breeds/image/random');
				const data = await response.json();
				if (data && data.message) {
					updatedData = {
						...updatedData,
						imageUrl: data.message,
						imgWidth: 100,
						imgHeight: 100,
					};
				}
			} catch (error) {
				console.error('Ошибка при получении изображения:', error);
			}
		} else {
			updatedData = {
				...updatedData,
				imageUrl: '',
				imgWidth: 0,
				imgHeight: 0,
			};
		}

		setFormData(updatedData);
		if (onChange) {
			onChange(updatedData); // Передаем изменения в родительский компонент
		}
	};
	console.log('guidestepform.jsx = mode: ', mode);

	return (
		<div className={styles.stepDetails}>
			<label>
				Title:
				<input
					className={styles.input}
					type='text'
					name='title'
					value={formData.title}
					onChange={handleChange}
					disabled={mode === 'edit' || mode === 'create' ? false : true}
					// {...(mode === 'edit' ? null : 'disabled')}
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
					disabled={mode === 'edit' || mode === 'create' ? false : true}
				/>
			</label>
			<label>
				Description:
				<textarea
					className={styles.textarea}
					name='description'
					value={formData.description}
					onChange={isEditMode ? handleChange : null}
					disabled={mode === 'edit' || mode === 'create' ? false : true}
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
					disabled={mode === 'edit' || mode === 'create' ? false : true}
				/>
			</label>
			<label>
				Image:
				<input
					name='imgChecked'
					type='checkbox'
					checked={formData.imgChecked}
					onChange={isEditMode ? handleImgCheckboxChange : null}
					disabled={mode === 'edit' || mode === 'create' ? false : true}
				/>
			</label>
			{formData.imgChecked && formData.imageUrl && (
				<>
					<label>
						Image Width:
						<input
							type='number'
							name='imgWidth'
							min='1'
							value={formData.imgWidth}
							onChange={isEditMode ? handleChange : null}
							disabled={mode === 'edit' || mode === 'create' ? false : true}
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
							disabled={mode === 'edit' || mode === 'create' ? false : true}
							className={styles.input}
						/>
					</label>
					<img
						className={styles.stepImagePreview}
						src={formData.imageUrl}
						alt={formData.title}
						width={formData.imgWidth}
						height={formData.imgHeight}
					/>
				</>
			)}
		</div>
	);
}
