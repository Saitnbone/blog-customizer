import clsx from 'clsx';
import { useState } from 'react';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form';
import { CustomCSSProperties } from '../article-params-form/ArticleParamsForm';
import styles from './app.module.scss';

export const App = () => {
	const [pageSettings, setPageSettings] = useState<CustomCSSProperties>({
		'--font-family': '',
		'--font-size': '',
		'--font-color': '',
		'--container-width': '',
		'--bg-color': '',
	});

	const handlePageSettings = (settings: CustomCSSProperties) => {
		setPageSettings(settings);
	};

	return (
		<div className={clsx(styles.main)} style={pageSettings}>
			<ArticleParamsForm onSettingsChange={handlePageSettings} />
			<Article />
		</div>
	);
};
