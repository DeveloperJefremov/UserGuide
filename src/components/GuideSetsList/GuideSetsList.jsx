import { useState } from 'react';
import mockData from '../../data/MockData';
import GuideSet from '../GuideSet/GuideSet';
import GuideSetHeaderForm from '../GuideSet/GuideSetHeaderForm';
import Modal from '../UI/Modal';

export default function GuideSetsList() {
	const [guideSetsList, setGuideSetsList] = useState(mockData);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newSetTitle, setNewSetTitle] = useState('');

	const handleCreateSet = () => {
		setIsModalOpen(true);
	};

	const handleLaunchSet = () => {
		alert('Launch button clicked');
	};

	const handleTitleChange = title => {
		setNewSetTitle(title);
	};

	const handleSaveNewSet = () => {
		if (newSetTitle.trim() === '') {
			alert('Title cannot be empty');
			return;
		}
		// Создание нового сета и добавление его в список
		const newSet = {
			id: guideSetsList.length + 1,
			data: [
				{
					setHeader: newSetTitle,
					setFooter: 'Footer for the new set',
				},
			],
		};
		setGuideSetsList([...guideSetsList, newSet]);
		setIsModalOpen(false); // Закрыть модальное окно
		setNewSetTitle(''); // Очистить заголовок
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setNewSetTitle(''); // Очистить заголовок при отмене
	};

	return (
		<div>
			<GuideSet title='Create New Set' onCreateSet={handleCreateSet} />

			<h2>Guide Sets List:</h2>

			<ul>
				{guideSetsList.map(guideSet => (
					<li key={guideSet.id}>
						<GuideSet data={guideSet.data} onLaunchSet={handleLaunchSet} />
					</li>
				))}
			</ul>

			{isModalOpen && (
				<Modal onClick={handleCancel}>
					<GuideSetHeaderForm
						title={newSetTitle}
						onTitleChange={handleTitleChange}
						onSave={handleSaveNewSet}
						onCancel={handleCancel}
					/>
				</Modal>
			)}
		</div>
	);
}
