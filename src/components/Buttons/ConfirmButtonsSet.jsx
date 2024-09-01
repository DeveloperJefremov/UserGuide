import styles from './ConfirmButtonsSet.module.css';

export default function ConfirmButtonsSet() {
	return (
		<>
			<button className={styles.cancelBtn}>Cancel</button>
			<button className={styles.saveBtn}>Save</button>
		</>
	);
}
