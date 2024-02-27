import { useState } from 'react';

export const useModal = () => {
	const [isModalOpen, setModalState] = useState(false);

	const handleDisplayScore = () => setModalState(true);
	const handleCloseModal = () => setModalState(false);

	return {
		isModalOpen,
		handleDisplayScore,
		handleCloseModal,
	};
};
