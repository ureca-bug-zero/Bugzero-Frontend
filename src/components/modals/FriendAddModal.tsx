import React, { useState, useEffect } from 'react';
import { useFriendStore } from '@/store/friend';
import {
  sendFriendRequest,
  fetchFriendList,
} from '@/features/friend/FriendService';
import { X } from 'lucide-react';
import { toast } from 'react-toastify';
import CustomSuccessToast from '../common/CustomSuccessToast';
import CustomErrorToast from '../common/CustomErrorToast';

const FriendAddModal = () => {
  const { modalType, closeModal, openModal, friendList, setFriendList } =
    useFriendStore();
  const [email, setEmail] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);

  // 모달이 열릴 때 친구 리스트 로드
  useEffect(() => {
    const loadFriendList = async () => {
      try {
        const list = await fetchFriendList();
        setFriendList(list);
      } catch (err) {
        console.error('친구 리스트 불러오기 실패:', err);
      }
    };

    if (modalType === 'add') {
      loadFriendList();
    }
    if (modalType !== 'add') {
      setEmail('');
    }
  }, [modalType, setFriendList]);

  // 이메일 입력 시 중복 검사
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    const duplicate = friendList.some((friend) => friend.friendEmail === value);
    setIsDuplicate(duplicate);
  };

  const handleSubmit = async () => {
    // if (!email.trim()) {

    //   return;
    // }

    if (isDuplicate) return;

    try {
      await sendFriendRequest({ email });
      toast((props) => <CustomSuccessToast {...props} />);
      setEmail('');
      closeModal();
    } catch (err) {
      console.error('친구 요청 실패:', err);
      toast((props) => <CustomErrorToast {...props} />);
    }
  };

  if (modalType !== 'add') return null;

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
              src="/public/icons/add-modal-icon.svg"
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
              <span className="ml-2 text-sm text-secondary-500">요청</span>
            </label>
          </div>
        </div>

        {/* 설명 */}
        <div className="text-sm text-primary-600 pt-5 mb-4">
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
          onChange={handleEmailChange}
          className={`w-full h-[73px] rounded-lg px-4 py-3 mb-2 border ${
            isDuplicate ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {isDuplicate && (
          <p className="text-red-500 text-sm mb-2">이미 등록된 친구입니다.</p>
        )}

        {/* 제출 버튼 */}
        <button
          onClick={handleSubmit}
          disabled={isDuplicate}
          className={`w-full py-3 rounded-lg font-semibold mt-2 transition duration-200 ${
            isDuplicate
              ? 'bg-gray-300 text-white cursor-not-allowed'
              : 'bg-primary-500 text-white hover:bg-green-600'
          }`}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default FriendAddModal;
