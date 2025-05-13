import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useFriendModal } from '@/features/friend/useFriendModal';

const FriendRequestModal = () => {
  const {
    modalType,
    friendRequests,
    loadRequests,
    handleAccept,
    handleReject,
    openModal,
    closeModal,
  } = useFriendModal();

  useEffect(() => {
    if (modalType === 'request') {
      loadRequests();
    }
  }, [modalType]);

  if (modalType !== 'request') return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 min-h-screen">
      <div className="bg-white rounded-2xl w-[550px] h-[410px] shadow-lg p-12 relative overflow-y-auto">
        {/* 닫기 버튼 */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-2xl">
            <img
              src="/public/add-modal-icon.svg"
              className="w-10 h-10"
              alt="icon"
            />
            Received Requests
          </div>

          {/* 토글 */}
          <div className="flex items-center gap-2">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  onChange={() => openModal('add')}
                />
                <div className="w-10 h-5 bg-gray-300 rounded-full shadow-inner"></div>
                <div className="absolute left-0 top-0 w-5 h-5 bg-white border rounded-full shadow transform transition" />
              </div>
              <span className="ml-2 text-sm text-secondary-500">요청</span>
            </label>
          </div>
        </div>

        {/* 요청 목록 */}
        {friendRequests.length === 0 ? (
          <p className="text-center text-gray-400 mt-8">
            받은 친구 요청이 없습니다.
          </p>
        ) : (
          <div className="space-y-4 max-h-[240px] overflow-y-auto pr-2">
            {friendRequests.map((f) => (
              <div
                key={f.id}
                className="flex justify-between items-center border p-3 rounded-lg"
              >
                <div className="text-sm">
                  {f.name} ({f.email})
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAccept(f.id)}
                    className="text-green-600 font-semibold"
                  >
                    수락
                  </button>
                  <button
                    onClick={() => handleReject(f.id)}
                    className="text-red-500 font-semibold"
                  >
                    거절
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendRequestModal;
