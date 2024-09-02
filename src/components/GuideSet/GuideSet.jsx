import { useState } from 'react';
import Button from '../Button/Button';
import GuideStepsList from '../GuideStepsList/GuideStepsList';
import styles from './GuideSet.module.css';

const GuideSetHeader = ({
	title,
	onToggleContent,
	isContentVisible,
	onCreateSet,
}) => {
	return (
		<div className={styles.guideSetHeader}>
			<h2>{title}</h2>
			<div className={styles.buttonContainer}>
				{onCreateSet && (
					<Button onClick={onCreateSet} variant='lightGrey' size='lg'>
						Create Set
					</Button>
					// <button onClick={onCreateSet} className={styles.createSetButton}>
					// 	Create Set
					// </button>
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
				title={data ? data[0].setHeader : title}
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
