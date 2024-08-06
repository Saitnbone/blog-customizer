import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, OptionType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [pageSettings, setPageSettings] = useState({
		fontFamily: defaultArticleState.fontFamilyOption,
		fontSize: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		backgroundColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
	});

	const handlePageSettings = (params: {
		fontFamily: OptionType;
		fontSize: OptionType;
		fontColor: OptionType;
		backgroundColor: OptionType;
		contentWidth: OptionType;
	}) => {
		setPageSettings(params);
	};

	const resetPageSettings = () => {
		setPageSettings({
			fontFamily: defaultArticleState.fontFamilyOption,
			fontSize: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
		});
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': pageSettings.fontFamily.value,
					'--font-size': pageSettings.fontSize.value,
					'--font-color': pageSettings.fontColor.value,
					'--container-width': pageSettings.contentWidth.value,
					'--bg-color': pageSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onSubmit={handlePageSettings}
				onReset={resetPageSettings}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
