import React, { useEffect, useState } from 'react';
import Modal from '../UI/Modal'; // Ваш компонент модального окна
import styles from './GuideLaunch.module.css';

const GuideLaunchItem = () => {
	const [position, setPosition] = useState({ top: '0px', left: '0px' });
	const [showModal, setShowModal] = useState(false);
	const [targetElementId, setTargetElementId] = useState(''); // Для хранения id элемента

	const handleLaunchSet = id => {
		const element = document.getElementById(id); // Получаем элемент по id
		if (element) {
			const rect = element.getBoundingClientRect();
			setPosition({
				top: `${rect.top + window.scrollY}px`,
				left: `${rect.right + window.scrollX + 30}px`, // Отступ вправо на 30px
			});
			setTargetElementId(id);
			setShowModal(true); // Показать модальное окно
		}
	};

	const handleClose = () => {
		setShowModal(false); // Закрыть модальное окно
	};

	return (
		<div>
			<button onClick={() => handleButtonClick('myElementId')}>
				Показать окно
			</button>

			{/* Модальное окно */}
			{showModal && (
				<Modal
					onClick={handleClose}
					style={{ top: position.top, left: position.left }}
				>
					<div className={styles.GuideLaunchItem}>
						<p>Это модальное окно для элемента с id: {targetElementId}</p>
						<button onClick={handleClose}>Закрыть</button>
					</div>
				</Modal>
			)}

			{/* Пример элемента на странице */}
			<div
				id='myElementId'
				style={{ margin: '100px', padding: '20px', background: '#eee' }}
			>
				Это целевой элемент (myElementId)
			</div>
		</div>
	);
};

export default GuideLaunchItem;
