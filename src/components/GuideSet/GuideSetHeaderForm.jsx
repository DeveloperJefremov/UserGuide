import React from 'react';
import Button from '../Button/Button';
import styles from './GuideSetHeaderForm.module.css';

const GuideSetHeaderForm = ({ title, onTitleChange, onSave, onCancel }) => {
	return (
		<div className={styles.guideSetHeader}>
			<h2>Create New Set Title</h2>
			<input
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
		</div>
	);
};

export default GuideSetHeaderForm;
