import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';
import styles from './GuideStepForm.module.css';

export default function GuideStepForm({
	formData: initialFormData,
	mode,
	onChange,
	handleSaveStep,
	handleCancel,
}) {
	const obj = {
		title: '',
		description: '',
		pageUrl: '',
		elementId: '',
		imgChecked: false,
		imgWidth: 0,
		imgHeight: 0,
		imageUrl: '',
	};
	const [formData, setFormData] = useState(initialFormData ?? obj);

	// Обновляем форму при изменении начальных данных
	useEffect(() => {
		setFormData(initialFormData);
	}, [initialFormData]);

	// Обрабатываем изменения формы
	const handleInputChange = e => {
		const { name, value, type, checked } = e.target;
		const updatedFormData = {
			...formData,
			[name]: type === 'checkbox' ? checked : value, // Обрабатываем checkbox отдельно
		};
		setFormData(updatedFormData);
		onChange(updatedFormData); // Передаем изменения в родительский компонент
	};

	// Обработка изменения checkbox для изображения
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
		onChange(updatedData); // Передаем изменения в родительский компонент
	};

	return (
		<form className={styles.guideStepForm}>
			<label htmlFor='title'> Title:</label>
			<input
				id='title'
				className={styles.input}
				type='text'
				name='title'
				value={formData.title}
				onChange={handleInputChange}
				disabled={mode !== 'create' && mode !== 'edit'}
			/>

			<label htmlFor='order'>Order:</label>
			<input
				id='order'
				className={styles.input}
				type='number'
				name='order'
				value={formData.order}
				onChange={handleInputChange}
				disabled={mode !== 'create' && mode !== 'edit'}
			/>

			<label htmlFor='description'>Description:</label>
			<textarea
				id='description'
				className={styles.textarea}
				name='description'
				value={formData.description}
				onChange={handleInputChange}
				disabled={mode !== 'create' && mode !== 'edit'}
			/>

			<label htmlFor='pageUrl'>Page URL:</label>
			<input
				id='pageUrl'
				className={styles.input}
				name='pageUrl'
				value={formData.pageUrl}
				onChange={handleInputChange}
				disabled={mode !== 'create' && mode !== 'edit'}
			/>

			<label htmlFor='elementId'>Element ID:</label>
			<input
				id='elementId'
				className={styles.input}
				type='text'
				name='elementId'
				value={formData.elementId}
				onChange={handleInputChange}
				disabled={mode !== 'create' && mode !== 'edit'}
			/>

			<fieldset>
				<legend>Image Settings</legend>
				<label htmlFor='imgChecked'>Image:</label>
				<input
					id='imgChecked'
					name='imgChecked'
					type='checkbox'
					checked={formData.imgChecked}
					onChange={handleImgCheckboxChange}
					disabled={mode !== 'create' && mode !== 'edit'}
				/>

				{formData.imgChecked && formData.imageUrl && (
					<>
						<label htmlFor='imgWidth'>Image Width:</label>
						<input
							id='imgWidth'
							type='number'
							name='imgWidth'
							min='1'
							value={formData.imgWidth}
							onChange={handleInputChange}
							disabled={mode !== 'create' && mode !== 'edit'}
							className={styles.input}
						/>
						<label htmlFor='imgHeight'>Image Height:</label>
						<input
							id='imgHeight'
							type='number'
							name='imgHeight'
							min='1'
							value={formData.imgHeight}
							onChange={handleInputChange}
							disabled={mode !== 'create' && mode !== 'edit'}
							className={styles.input}
						/>
						<img
							className={styles.stepImagePreview}
							src={formData.imageUrl}
							alt={formData.title}
							width={formData.imgWidth}
							height={formData.imgHeight}
						/>
					</>
				)}
			</fieldset>
			<div className={styles.guideStepForm__buttonContainer}>
				<Button variant='lightGrey' size='md' onClick={handleCancel}>
					Cancel
				</Button>
				<Button variant='default' size='md' onClick={handleSaveStep}>
					Save
				</Button>
			</div>
		</form>
	);
}
