import { useState } from 'react';

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [friendBoxKey, setFriendBoxKey] = useState(0);

  const openModal = () => {
    setIsOpen(true);
    document.body.classList.add('overflow-hidden');
  };
  const closeModal = () => {
    setIsOpen(false);
    setFriendBoxKey((prev) => prev + 1);
    document.body.classList.remove('overflow-hidden');
  };

  return {
    isOpen,
    openModal,
    closeModal,
    friendBoxKey,
  };
}
