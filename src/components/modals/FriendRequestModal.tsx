// components/modals/FriendRequestModal.tsx
import React, { useEffect } from 'react';
import { useFriendModal } from '@/features/friend/useFriendModal';

const FriendRequestModal = () => {
  const {
    isRequestModalOpen,
    friendRequests,
    closeRequestModal,
    loadRequests,
    handleAccept,
    handleReject,
  } = useFriendModal();

  useEffect(() => {
    if (isRequestModalOpen) loadRequests();
  }, [isRequestModalOpen]);

  if (!isRequestModalOpen) return null;

  return (
    <div className="modal-bg">
      <div className="modal-content">
        <h2>친구 요청 확인</h2>
        {friendRequests.map((f) => (
          <div key={f.id} className="flex justify-between">
            <div>
              {f.name} ({f.email})
            </div>
            <div>
              <button onClick={() => handleAccept(f.id)}>ok</button>
              <button onClick={() => handleReject(f.id)}>no</button>
            </div>
          </div>
        ))}
        <button onClick={closeRequestModal}>닫기</button>
      </div>
    </div>
  );
};

export default FriendRequestModal;
