import GuideSetsList from '../GuideSetsList/GuideSetsList';
import styles from './MainContent.module.css';

const MainContentHeader = ({ title, description }) => {
	return (
		<div className={styles.mainContentHeader}>
			<h1>{title}</h1>
			<h2>{description}</h2>
			<button className={styles.loginButton}>Login as admin</button>
		</div>
	);
};

const MainContentFooter = ({ info }) => {
	return (
		<div className={styles.mainContentFooter}>
			<div>{info}</div>
		</div>
	);
};

const MainContentBody = ({ children }) => {
	return <div className={styles.mainContentBody}>{children}</div>;
};

export default function MainContent() {
	return (
		<div className={styles.mainContent}>
			<MainContentHeader
				title='User Guide'
				description='User guides are a type of technical documentation that enables customers and end-users with step-by-step instructions on how to execute a task or process.'
			/>

			<MainContentBody>
				<GuideSetsList />
			</MainContentBody>

			<MainContentFooter info='2024 Your Company. All rights reserved.' />
		</div>
	);
}
