import { useState } from 'react';
import GuideStepsList from '../GuideStepsList/GuideStepsList';
import styles from './GuideSet.module.css';

const GuideSetHeader = ({
	setTitle,
	onToggleContent,
	isContentVisible,
	onCreateSet,
	showCreateButton,
}) => {
	return (
		<div className={styles.guideSetHeader}>
			<h2>{setTitle}</h2>
			<div className={styles.buttonContainer}>
				{showCreateButton && (
					<button onClick={onCreateSet} className={styles.createSetButton}>
						Create Set
					</button>
				)}
				<button className={styles.launchButton}>Launch Set</button>
				<button className={styles.toggleButton} onClick={onToggleContent}>
					{isContentVisible ? '-' : '+'}
				</button>
			</div>
		</div>
	);
};

const GuideSetBody = ({ children }) => {
	return <div className={styles.mainContentBody}>{children}</div>;
};

const GuideSetFooter = ({ content }) => {
	if (!content) return null;
	return (
		<div className={styles.guideSetFooter}>
			<p>{content}</p>
		</div>
	);
};

export default function GuideSet({ data, title, onCreateSet }) {
	const [isContentVisible, setIsContentVisible] = useState(false);

	const toggleContentVisibility = () => {
		setIsContentVisible(prevState => !prevState);
	};

	if (!data && title !== 'Create New Set') return null;

	return (
		<div className={styles.guideSet}>
			<GuideSetHeader
				setTitle={data ? data[0].setHeader : title}
				onToggleContent={toggleContentVisibility}
				isContentVisible={isContentVisible}
				onCreateSet={onCreateSet}
				showCreateButton={title === 'Create New Set'}
			/>

			{isContentVisible && data && (
				<GuideSetBody>
					<GuideStepsList data={data} key={data.id} />
				</GuideSetBody>
			)}

			{isContentVisible && data && (
				<GuideSetFooter content={data[0].setFooter} />
			)}
		</div>
	);
}
