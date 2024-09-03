import { useState } from 'react';
import Button from '../Button/Button';
import GuideStep from '../GuideStep/GuideStep';
import GuideStepForm from '../GuideStep/GuideStepForm';
import Modal from '../UI/Modal';

export default function GuideStepsList({ data }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		elementId: '',
		imgChecked: false,
		imgWidth: 0,
		imgHeight: 0,
		imageUrl: '',
	});
	const [steps, setSteps] = useState(data || []);

	const handleCreateStep = () => {
		setIsModalOpen(true);
	};

	const handleSave = () => {
		// Создаем новый шаг
		const newStep = { ...formData, mode: 'folded' };

		// Обновляем шаги, добавляя новый шаг в существующий setBody
		const updatedSteps = steps.map((set, index) => {
			// Предполагаем, что новый шаг добавляется в последний set
			if (index === steps.length - 1) {
				return {
					...set,
					setBody: [...(set.setBody || []), newStep],
				};
			}
			return set;
		});

		// Обновляем состояние шагов
		setSteps(updatedSteps);
		setIsModalOpen(false); // Закрываем модальное окно после сохранения

		// Сбрасываем форму после сохранения
		setFormData({
			title: '',
			description: '',
			elementId: '',
			imgChecked: false,
			imgWidth: 0,
			imgHeight: 0,
			imageUrl: '',
		});
	};

	const handleCancel = () => {
		setIsModalOpen(false); // Закрываем модальное окно при отмене
	};

	const handleFormChange = newFormData => {
		setFormData(newFormData); // Обновляем данные формы
	};

	return (
		<div>
			{/* Кнопка и модальное окно для создания нового шага */}
			<div>
				<h2>Create New Lesson</h2>
				<Button size='large' variant='lightGrey' onClick={handleCreateStep}>
					Add: Lesson
				</Button>
				{isModalOpen && (
					<Modal onClick={handleCancel}>
						<GuideStepForm
							{...formData}
							isEditMode={true}
							onChange={handleFormChange}
						/>
						<div style={{ textAlign: 'right' }}>
							<Button variant='lightGrey' size='md' onClick={handleCancel}>
								Cancel
							</Button>
							<Button variant='default' size='md' onClick={handleSave}>
								Save
							</Button>
						</div>
					</Modal>
				)}
			</div>

			<ul>
				<h2>Guide Steps List:</h2>
				{steps.map((set, index) => (
					<li key={set.setHeader || `set-${index}`}>
						<div>
							{set.setBody &&
								set.setBody.map((step, idx) => (
									<GuideStep
										key={`${set.setHeader}-${idx}`}
										{...step}
										mode='folded'
									/>
								))}
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
