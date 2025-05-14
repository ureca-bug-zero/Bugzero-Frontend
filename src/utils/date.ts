// 날짜 포맷, 계산 함수

export const getKSTDate = (date: Date) => {
  // 한국 시간대로 변경
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  return new Date(utc + 9 * 60 * 60000);
};
