// src/components/Modal.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

const Backdrop = ({ onClick }) => {
	return <div className={styles.backdrop} onClick={onClick}></div>;
};

const ModalWindow = ({ children, style }) => {
	return (
		<div
			className={styles.modal}
			style={style}
			onClick={e => e.stopPropagation()}
		>
			<div className={styles.content}>{children}</div>
		</div>
	);
};

const portalElement = document.getElementById('overlays');

const Modal = ({ onClick, children, style }) => {
	return (
		<>
			{ReactDOM.createPortal(<Backdrop onClick={onClick} />, portalElement)}
			{ReactDOM.createPortal(
				<ModalWindow style={style}>{children}</ModalWindow>,
				portalElement
			)}
		</>
	);
};

export default Modal;
