import React from 'react';
import styles from './GuideStepForm.module.css';

export default function GuideStepForm({
	title,
	description,
	elementId,
	imgChecked,
	imgWidth,
	imgHeight,
	imageUrl,
}) {
	return (
		<div className={styles.stepDetails}>
			<label>
				Description:
				<textarea
					className={styles.textarea}
					name='description'
					value={description}
				/>
			</label>
			<label>
				Element ID:
				<input
					className={styles.input}
					type='text'
					name='elementId'
					value={elementId}
				/>
			</label>
			<label>
				Image:
				<input name='imgChecked' type='checkbox' checked={imgChecked} />
			</label>

			<label>
				Image Width:
				<input
					type='number'
					name='imgWidth'
					min='1'
					value={imgWidth}
					className={styles.input}
				/>
			</label>
			<label>
				Image Height:
				<input
					type='number'
					name='imgHeight'
					min='1'
					value={imgHeight}
					className={styles.input}
				/>
			</label>
			<img
				className={styles.stepImagePreview}
				src={imageUrl}
				alt={title}
				width={imgWidth}
				height={imgHeight}
			/>
		</div>
	);
}
