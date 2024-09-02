import React from 'react';
import styles from './ConfirmButtonsSet.module.css';

export default function ConfirmButtonsSet({ onSave, onCancel }) {
	return (
		<div className={styles.buttons}>
			<button className={styles.cancelBtn} onClick={onCancel}>
				Cancel
			</button>
			<button className={styles.saveBtn} onClick={onSave}>
				Save
			</button>
		</div>
	);
}
