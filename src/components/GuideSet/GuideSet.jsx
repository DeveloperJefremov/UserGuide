import React, { useState } from 'react';
import Button from '../Button/Button';
import GuideStepsList from '../GuideStepsList/GuideStepsList';
import styles from './GuideSet.module.css';

export default function GuideSet({
	isGuideModalOpen,
	onModeChange,
	mode,
	title,
	activeGuideSetId,
	onLaunchSet,
	guideSet,
	handleEditSet,
	handleDeleteSet,
}) {
	const [isShownSet, setIsShownSet] = useState(false);

	if (!guideSet && title !== 'Create New Set') return null;

	return (
		<div className={styles.guideSet}>
			<GuideSetHeader
				isShownSet={isShownSet} // Передаем текущее состояние в Header
				handleEditSet={handleEditSet}
				handleDeleteSet={handleDeleteSet}
				title={guideSet.setHeader}
				onToggleContent={() => setIsShownSet(prev => !prev)} // Добавляем логику переключения
			/>

			{isShownSet && (
				<GuideSetBody isShownSet={isShownSet}>
					<GuideStepsList
						isGuideModalOpen={isGuideModalOpen}
						guideSetId={guideSet.id}
						activeGuideSetId={activeGuideSetId}
						mode={mode}
						onModeChange={onModeChange}
						key={guideSet.id}
						steps={guideSet.setBody}
					/>
				</GuideSetBody>
			)}

			{isShownSet && (
				<GuideSetFooter onLaunchSet={onLaunchSet} setMode={isShownSet} />
			)}
		</div>
	);
}

const GuideSetHeader = ({
	isShownSet,
	handleDeleteSet,
	handleEditSet,
	title,
	onToggleContent,
}) => {
	console.log(isShownSet);
	let displayButtonText = !isShownSet ? '+' : '-';

	return (
		<header className={styles.guideSetHeader}>
			<h3>{title}</h3>
			<div className={styles.guideSetHeader__buttonContainer}>
				<Button onClick={handleEditSet} variant='lightGrey' size='lg'>
					Edit: Tutorial
				</Button>
				<Button onClick={handleDeleteSet} variant='danger' size='lg'>
					Delete: Tutorial
				</Button>

				<Button size='icon' variant='lightGrey' onClick={onToggleContent}>
					{displayButtonText}
				</Button>
			</div>
		</header>
	);
};

const GuideSetBody = ({ children, isShownSet }) => {
	let cssClassList = `${styles.setBody} ${
		isShownSet ? styles.expanded : styles.folded
	}`;

	return <main className={cssClassList}>{children}</main>;
};

const GuideSetFooter = ({ onLaunchSet, isShownSet }) => {
	const cssClassList = `${styles.stepFooter} ${
		isShownSet ? styles.expanded : ''
	} ${!isShownSet ? styles.folded : ''}`;
	return (
		<footer className={cssClassList}>
			{onLaunchSet && (
				<Button onClick={onLaunchSet} variant='default' size='lg'>
					Launch: Tutorial
				</Button>
			)}
		</footer>
	);
};
