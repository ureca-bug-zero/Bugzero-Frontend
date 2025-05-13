import React, { useState } from 'react';
import { useFriendStore } from '@/store/friend'; // ✅ Zustand store
import { sendFriendRequest } from '@/features/friend/FriendService';
import { X } from 'lucide-react';

const FriendAddModal = () => {
  const { modalType, closeModal, openModal } = useFriendStore();
  const [email, setEmail] = useState('');

  if (modalType !== 'add') return null; // ✅ 모달 타입이 add일 때만 표시

  const handleSubmit = async () => {
    if (!email.trim()) {
      alert('이메일을 입력해주세요.');
      return;
    }
    try {
      await sendFriendRequest({ email });
      alert('친구 요청을 보냈습니다!');
      closeModal(); // ✅ 모달 닫기
    } catch (err) {
      console.error('친구 요청 실패:', err);
      alert('요청 실패: 이메일을 확인하세요');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 min-h-screen">
      <div className="bg-white rounded-2xl w-[550px] h-[410px] shadow-lg p-12 relative">
        {/* 닫기 버튼 */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-2xl">
            <img
              src="/public/add-modal-icon.svg"
              className="w-10 h-10"
              alt="icon"
            />
            Add Your Friends
          </div>

          {/* 토글 */}
          <div className="flex items-center gap-2">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  onChange={() => openModal('request')}
                />
                <div className="w-10 h-5 bg-gray-300 rounded-full shadow-inner"></div>
                <div className="absolute left-0 top-0 w-5 h-5 bg-white border rounded-full shadow transform transition translate-x-5" />
              </div>
              <span className="ml-2 text-sm text-secondary-500">수락</span>
            </label>
          </div>
        </div>

        {/* 설명 */}
        <div className="text-sm text-primary-600 pt-5 mb-6">
          친구를 추가해 보세요. <br />
          친구의 <span className="text-secondary-500 font-semibold">Bug</span>
          <span className="text-primary-500 font-semibold">Zero</span> 를 구경할
          수 있어요!
        </div>

        {/* 이메일 입력 */}
        <input
          type="email"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-[73px] border rounded-lg px-4 py-3 mb-6"
        />

        {/* 제출 버튼 */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-lg bg-primary-500 text-white font-semibold hover:bg-green-600 mt-2"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default FriendAddModal;
