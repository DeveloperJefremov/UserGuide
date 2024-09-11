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

	const onToggleContent = () => {
		setIsShownSet(prevState => !prevState); // Просто переключаем состояние
	};

	return (
		<div className={styles.guideSet}>
			<GuideSetHeader
				isShownSet={isShownSet}
				handleEditSet={handleEditSet}
				handleDeleteSet={handleDeleteSet}
				title={guideSet.setHeader}
				onToggleContent={onToggleContent}
			/>

			<div className={isShownSet ? styles.expanded : styles.folded}>
				<GuideSetBody>
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

				<GuideSetFooter onLaunchSet={onLaunchSet} />
			</div>
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
	let displayButtonText = !isShownSet ? '+' : '-';

	return (
		<header className={styles.guideSetHeader}>
			<h3>{title}</h3>
			<div className={styles.guideSetHeader__buttonContainer}>
				<Button onClick={handleEditSet} variant='lightGrey' size='lg'>
					Edit: Tutorial
				</Button>
				<Button onClick={handleDeleteSet} variant='default' size='lg'>
					Delete: Tutorial
				</Button>

				<Button size='icon' variant='lightGrey' onClick={onToggleContent}>
					{displayButtonText}
				</Button>
			</div>
		</header>
	);
};

const GuideSetBody = ({ children }) => {
	return <main className={styles.guideSetBody}>{children}</main>;
};

const GuideSetFooter = ({ onLaunchSet }) => {
	return (
		<footer className={styles.guideSetFooter}>
			{onLaunchSet && (
				<Button onClick={onLaunchSet} variant='default' size='lg'>
					Launch: Tutorial
				</Button>
			)}
		</footer>
	);
};
