import { basePath } from 'src/utils/base-path';
import styles from './LoadingGif.module.scss';

export const LoadingGif = () => {
	return (
		<div className={styles.wrapper}>
			<img src={`${basePath}/img/loading.gif`} alt='loading' />
		</div>
	);
};
