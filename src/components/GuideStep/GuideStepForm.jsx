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
	const [formData, setFormData] = useState(initialFormData);

	useEffect(() => {
		setFormData(initialFormData);
	}, [initialFormData]);

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

	// Проверка, активны ли поля (если mode === 'create')

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
					disabled={mode === 'create' || mode === 'edit' ? false : true}
				/>
			</label>
			<label>
				Order:
				<input
					className={styles.input}
					type='number'
					name='order'
					value={formData.order}
					onChange={handleChange}
					disabled={mode === 'create' || mode === 'edit' ? false : true}
				/>
			</label>
			<label>
				Description:
				<textarea
					className={styles.textarea}
					name='description'
					value={formData.description}
					onChange={handleChange}
					disabled={mode === 'create' || mode === 'edit' ? false : true}
				/>
			</label>
			<label>
				PageUrl:
				<input
					className={styles.input}
					name='pageUrl'
					value={formData.pageUrl}
					onChange={handleChange}
					disabled={mode === 'create' || mode === 'edit' ? false : true}
				/>
			</label>
			<label>
				Element ID:
				<input
					className={styles.input}
					type='text'
					name='elementId'
					value={formData.elementId}
					onChange={handleChange}
					disabled={mode === 'create' || mode === 'edit' ? false : true}
				/>
			</label>
			<label>
				Image:
				<input
					name='imgChecked'
					type='checkbox'
					checked={formData.imgChecked}
					onChange={handleImgCheckboxChange}
					disabled={mode === 'create' || mode === 'edit' ? false : true}
				/>
			</label>
			{formData.imgChecked && formData.imageUrl && (
				<>
					<label>
						Image
						<input
							type='number'
							name='imgWidth'
							min='1'
							value={formData.imgWidth}
							onChange={handleChange}
							disabled={mode === 'create' || mode === 'edit' ? false : true}
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
							onChange={handleChange}
							disabled={mode === 'create' || mode === 'edit' ? false : true}
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
			<div style={{ textAlign: 'right' }}>
				<Button variant='lightGrey' size='md' onClick={handleCancel}>
					Cancel
				</Button>
				<Button variant='default' size='md' onClick={handleSaveStep}>
					Save
				</Button>
			</div>
		</div>
	);
}
