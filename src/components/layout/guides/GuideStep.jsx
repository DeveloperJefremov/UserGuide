import { useEffect, useState } from 'react';
import styles from './GuideStep.module.css';

const GuideStep = ({ mode = 'display', stepData, onEditStep, onDelete }) => {
	const [stepMode, setStepMode] = useState(mode); // Режим по умолчанию

	useEffect(() => {
		setStepMode(mode); // Обновляем режим при изменении prop mode
	}, [mode]);

	return (
		<div className={styles.step}>
			{stepMode === 'display' && (
				<div>
					<h3>{stepData.title}</h3>
					<p>{stepData.description}</p>
				</div>
			)}

			{stepMode === 'edit' && (
				<div>
					<input
						type='text'
						value={stepData.title}
						onChange={e => onEditStep({ ...stepData, title: e.target.value })}
					/>
					<textarea
						value={stepData.description}
						onChange={e =>
							onEditStep({ ...stepData, description: e.target.value })
						}
					/>
				</div>
			)}

			{stepMode === 'create' && (
				<div>
					<input
						type='text'
						placeholder='Enter title'
						onChange={e => onEditStep({ ...stepData, title: e.target.value })}
					/>
					<textarea
						placeholder='Enter description'
						onChange={e =>
							onEditStep({ ...stepData, description: e.target.value })
						}
					/>
				</div>
			)}

			{stepMode === 'guide' && (
				<div>
					<h3>{stepData.title}</h3>
					<p>{stepData.description}</p>
					<p>Guide Mode Active</p>
				</div>
			)}

			<div>
				<button onClick={() => setStepMode('edit')}>Edit</button>
				<button onClick={() => onDelete(stepData.id)}>Delete</button>
			</div>
		</div>
	);
};

export default GuideStep;
