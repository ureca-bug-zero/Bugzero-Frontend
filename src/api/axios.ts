// axios 인스턴스 설정

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8082/api', // 실제 백엔드 주소에 맞게 수정
  withCredentials: true,
});

export default instance;
