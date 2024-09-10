import React from 'react';
import Button from '../Button/Button';
import styles from './GuideSetHeaderForm.module.css';

const GuideSetHeaderForm = ({
	mode, // Режим: 'create' или 'edit'
	title, // Заголовок набора
	onTitleChange, // Функция для изменения заголовка
	onSave, // Функция для сохранения набора
	onCancel, // Функция для отмены
}) => {
	return (
		<form className={styles.guideSetHeader}>
			<label htmlFor='titleInput'>
				{mode === 'edit' ? 'Edit Tutorial Title' : 'Create New Tutorial Title'}
			</label>

			{/* Поле для ввода заголовка */}
			<input
				id='titleInput'
				type='text'
				value={title}
				onChange={e => onTitleChange(e.target.value)}
				className={styles.titleInput}
				placeholder='Enter title'
			/>

			<div className={styles.buttonContainer}>
				<Button onClick={onCancel} variant='lightGrey' size='lg'>
					Cancel
				</Button>
				<Button onClick={onSave} variant='default' size='lg'>
					Save
				</Button>
			</div>
		</form>
	);
};

export default GuideSetHeaderForm;
