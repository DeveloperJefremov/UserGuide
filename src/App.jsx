import styles from './App.module.css';
import FirstSideBar from './components/Layout/FirstSideBar';
import SecondSideBar from './components/Layout/SecondSideBar';
import MainContent from './components/MainContent/MainContent';

function App() {
	return (
		<div className={styles.appContainer}>
			<FirstSideBar />
			<SecondSideBar />

			<MainContent />
		</div>
	);
}

export default App;
