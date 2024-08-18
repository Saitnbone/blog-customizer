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
import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import classNames from 'classnames';
import styles from './ArticleParamsForm.module.scss';

type ParamsFormProps = {
	onSettingsChange: (settings: CustomCSSProperties) => void;
};

// Интерфейс для настройки стандартных CSSProperties
export interface CustomCSSProperties extends CSSProperties {
	'--font-family': string;
	'--font-size': string;
	'--font-color': string;
	'--container-width': string;
	'--bg-color': string;
}

// Компонент для выдвигающейся формы с кнопкой
export const ArticleParamsForm = ({ onSettingsChange }: ParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [articleParams, setArticleParams] = useState({
		fontFamily: defaultArticleState.fontFamilyOption,
		fontSize: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		backgroundColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
	});
	const containerRef = useRef<HTMLDivElement>(null);

	const handleClick = () => {
		setIsMenuOpen((prevState) => !prevState);
	};

	const containerStyle = classNames(styles.container, {
		[styles.container_open]: isMenuOpen,
	});

	useEffect(() => {
		if (!isMenuOpen) {
			return;
		}
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsMenuOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen]);

	const updateArticleParams = (
		key: keyof typeof articleParams,
		value: OptionType
	) => {
		const newParams = { ...articleParams, [key]: value };
		setArticleParams(newParams);
	};

	// Функция отправки данных для перерендеринга
	const handleSubmitButton = (event: React.FormEvent) => {
		event.preventDefault();
		onSettingsChange({
			'--font-family': articleParams.fontFamily.value,
			'--font-size': articleParams.fontSize.value,
			'--font-color': articleParams.fontColor.value,
			'--container-width': articleParams.contentWidth.value,
			'--bg-color': articleParams.backgroundColor.value,
		});
	};

	// Функция очистки полей формы
	const handleResetButton = () => {
		const resetParams = {
			fontFamily: defaultArticleState.fontFamilyOption,
			fontSize: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
		};
		setArticleParams(resetParams);
		onSettingsChange({
			'--font-family': resetParams.fontFamily.value,
			'--font-size': resetParams.fontSize.value,
			'--font-color': resetParams.fontColor.value,
			'--container-width': resetParams.contentWidth.value,
			'--bg-color': resetParams.backgroundColor.value,
		});
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={handleClick} />
			<aside className={containerStyle} ref={containerRef}>
				<form className={styles.form} onSubmit={handleSubmitButton}>
					<h2 className={styles.title}>Задайте параметры</h2>
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
