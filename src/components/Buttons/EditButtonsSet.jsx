import styles from './EditButtonsSet.module.css';

export default function EditButtonsSet() {
	return (
		<>
			<button className={styles.deleteBtn}>Delete</button>
			<button className={styles.createBtn}>Create</button>
		</>
	);
}
