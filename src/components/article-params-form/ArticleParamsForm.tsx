import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { Separator } from '../separator';
import { RadioGroup } from '../radio-group';
import { useState } from 'react';
import classNames from 'classnames';

import styles from './ArticleParamsForm.module.scss';

// Компонент для выдвигающейся формы с кнопкой
export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsOpen((prevState) => !prevState);
	};

	const containerStyle = classNames(styles.container, {
		[styles.container_open]: isOpen,
	});
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleClick} />
			<aside className={containerStyle}>
				<form className={styles.form}>
					<Select />
					<RadioGroup />
					<Select />
					<Separator />
					<Select />
					<Select />
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
