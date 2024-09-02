import React from 'react';
import styles from './Button.module.css';
export default function Button({
	children,
	variant = 'default',
	size = 'md',
	...props
}) {
	const variantMap = {
		grey: styles.greyButton,
		lightGrey: styles.lightGreyButton,
		default: styles.defaultButton,
	};

	const sizeMap = {
		sm: styles.small,
		md: styles.medium,
		lg: styles.large,
	};

	return (
		<button
			className={` ${styles.button} ${variantMap[variant]} ${sizeMap[size]}`}
			{...props}
		>
			{children}
		</button>
	);
}
