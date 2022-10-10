import { useState } from 'react';

export default () => {
  const [isModalOpen, setModalOpen] = useState(false);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  return { isModalOpen, openModal, closeModal };
};
