// features/friend/useFriendModal.ts
import { useFriendStore } from '@/store/friend';
import {
  fetchFriendRequests,
  acceptFriendRequest,
  refuseFriendRequest,
} from '@/features/friend/FriendService';
import { useAuthStore } from '@/store/auth';

export const useFriendModal = () => {
  const {
    friendRequests,
    setFriendRequests,
    isRequestModalOpen,
    openRequestModal,
    closeRequestModal,
  } = useFriendStore();

  const { user } = useAuthStore();

  // 친구 요청 목록 불러오기
  const loadRequests = async () => {
    try {
      const response = await fetchFriendRequests(); // IncomingFriendRequest[]
      const transformed = response.map((item) => ({
        id: item.senderId,
        name: item.senderName,
        email: '', // 서버 응답에 없으면 빈 문자열
      }));
      setFriendRequests(transformed);
    } catch (err) {
      console.error('친구 요청 로딩 실패:', err);
    }
  };

  // 친구 요청 수락
  const handleAccept = async (senderId: number) => {
    if (!user?.id) return;

    try {
      await acceptFriendRequest({ senderId, receiverId: user.id });
      await loadRequests();
    } catch (err) {
      console.error('친구 요청 수락 실패:', err);
    }
  };

  // 친구 요청 거절
  const handleReject = async (senderId: number) => {
    if (!user?.id) return;

    try {
      await refuseFriendRequest({ senderId, receiverId: user.id });
      await loadRequests();
    } catch (err) {
      console.error('친구 요청 거절 실패:', err);
    }
  };

  return {
    friendRequests,
    isRequestModalOpen,
    openRequestModal,
    closeRequestModal,
    loadRequests,
    handleAccept,
    handleReject,
  };
};
