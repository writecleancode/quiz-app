import styles from './LoadingGif.module.scss';

export const LoadingGif = () => {
	return (
		<div className={styles.wrapper}>
			<img src='/src/assets/img/loading.gif' alt='loading' />
		</div>
	);
};
