import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import classNames from 'classnames';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type ArrowButtonProps = {
	isOpen: boolean;
	onClick: OnClick;
};

// Кнопка открытия боковой панели настроек
export const ArrowButton = ({ isOpen, onClick }: ArrowButtonProps) => {
	const containerClass = classNames(styles.container, {
		[styles.container_open]: isOpen,
	});

	const arrowClass = classNames(styles.arrow, { [styles.arrow_open]: isOpen });

	return (
		/* Не забываем указывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={containerClass}
			onClick={onClick}>
			<img src={arrow} alt='иконка стрелочки' className={arrowClass} />
		</div>
	);
};
