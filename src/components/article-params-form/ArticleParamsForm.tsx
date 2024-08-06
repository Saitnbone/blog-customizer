import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { Separator } from '../separator';
import { RadioGroup } from '../radio-group';
import {
	fontColors,
	fontFamilyOptions,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	OptionType,
} from 'src/constants/articleProps';
import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

import styles from './ArticleParamsForm.module.scss';

export type FormProps = {
	onSubmit: (params: {
		fontFamily: OptionType;
		fontSize: OptionType;
		fontColor: OptionType;
		backgroundColor: OptionType;
		contentWidth: OptionType;
	}) => void;
	onReset: () => void;
};

// Компонент для выдвигающейся формы с кнопкой
export const ArticleParamsForm = ({ onSubmit, onReset }: FormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const handleClick = () => {
		setIsOpen((prevState) => !prevState);
	};

	const containerStyle = classNames(styles.container, {
		[styles.container_open]: isOpen,
	});

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const updateArticleParams = (key: string, value: OptionType) => {
		setArticleParams((prevParams) => ({ ...prevParams, [key]: value }));
	};

	//
	const [articleParams, setArticleParams] = useState({
		fontFamily: defaultArticleState.fontFamilyOption,
		fontSize: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		backgroundColor: defaultArticleState.fontColor,
		contentWidth: defaultArticleState.contentWidth,
	});

	// Функция отправки данных для перерендеринга
	const handleSubmitButton = (event: React.FormEvent) => {
		event.preventDefault();
		onSubmit(articleParams);
	};

	// Функция очистки полей формы
	const handleResetButton = () => {
		setArticleParams({
			fontFamily: defaultArticleState.fontFamilyOption,
			fontSize: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
		});
		onReset();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleClick} />
			<aside className={containerStyle} ref={containerRef}>
				<form className={styles.form} onSubmit={handleSubmitButton}>
					<Select
						title='Шрифт'
						selected={articleParams.fontFamily}
						options={fontFamilyOptions}
						onChange={(value) => {
							updateArticleParams('fontFamily', value);
						}}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						selected={articleParams.fontSize}
						options={fontSizeOptions}
						onChange={(value) => {
							updateArticleParams('fontSize', value);
						}}
					/>
					<Select
						title='Цвет шрифта'
						selected={articleParams.fontColor}
						options={fontColors}
						onChange={(value) => {
							updateArticleParams('fontColor', value);
						}}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={articleParams.backgroundColor}
						options={backgroundColors}
						onChange={(value) => {
							updateArticleParams('backgroundColor', value);
						}}
					/>
					<Select
						title='Ширина контента'
						selected={articleParams.contentWidth}
						options={contentWidthArr}
						onChange={(value) => {
							updateArticleParams('contentWidth', value);
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleResetButton} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
