# 개발자를 위한 투두리스트, BugZero

**배포 링크: https://silver-starburst-a7fd7e.netlify.app** (현재는 서버를 중지했습니다) <br/><br/>

## 서비스 소개
시중에 다양한 투두리스트 서비스가 존재하지만, 일반적인 투두리스트는 개발자의 흐름을 따라가지 못합니다.<br/><br/>
**BugZero**는 **개발자만을 위해 설계된 일정 관리 서비스**입니다.
문제 링크와 코드 레퍼런스를 함께 저장할 수 있는 투두 기능, 날짜별 달성률을 확인할 수 있는 캘린더, 친구와의 투두 공유 기능을 통해 개발자에게 최적화된 일정 관리 환경을 제공합니다.<br/><br/>
**버그 없는 하루, 그 시작을 BugZero와 함께하길 바랍니다.**

<br />

## 기술 스택
- <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white" align="center"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white" align="center"/> <img src="https://img.shields.io/badge/Zustand-000000?style=flat-square&logo=zotero&logoColor=white" align="center"/> <img src="https://img.shields.io/badge/TanStack Query-FF4154?style=flat-square&logo=react-query&logoColor=white" align="center"/> <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white" align="center"/> <img src="https://img.shields.io/badge/React Calendar-06AC38?style=flat-square&logo=react&logoColor=white" align="center"/> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" align="center"/>

- 배포 : <img src="https://img.shields.io/badge/Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white" align="center"/>

- 협업 툴 : <img src="https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white" align="center"/> <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white" align="center"/> <img src="https://img.shields.io/badge/Notion-000000?style=flat-square&logo=notion&logoColor=white" align="center"/> <img src="https://img.shields.io/badge/Slack-4A154B?style=flat-square&logo=slack&logoColor=white" align="center"/>

<br />

## 주요 기능

### 1. 소셜 로그인
![ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/0e67df10-b0d5-43ec-99ce-d07d8cff6ff1)
- 랜딩 페이지는 다양한 디바이스 환경에서도 최적화된 화면을 제공하여, 사용자에게 일관되고 편리한 서비스를 제공합니다.
- 카카오 로그인을 통해 사용자가 더 편리하게 서비스에 로그인할 수 있습니다.

### 2. 투두리스트
![ezgif com-video-to-gif-converter (1)](https://github.com/user-attachments/assets/7cf7d555-2593-4fd8-a461-5c93a2ec7340)
- 내용, 링크를 투두로 작성할 수 있으며, 내용은 필수, 링크는 선택입니다.
- [수정 버튼] 클릭 시, 투두의 내용과 링크를 수정할 수 있습니다.
- [삭제 버튼] 클릭 시, 투두를 삭제할 수 있습니다.
- 매일 자정, 백준 문제 링크가 랜덤하게 '오늘의 미션'으로 생성됩니다.

### 3. 캘린더
![-Clipchamp1-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/9e122a3d-56f8-46a5-b9f7-f540b0072191)
- 투두리스트 달성률에 따라 해당 날짜의 배경 색상의 투명도가 결정됩니다.

### 4. 타이머
![-Clipchamp2-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/98c03761-b67c-46c6-bf55-7074fe2b2a0c)
- 뽀모도로 타이머를 통해 집중 학습이 가능하게 합니다.

### 5. 친구 추가
![-Clipchamp3-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/960e5cae-e95d-4e45-9863-f65931321103)
- 친구 요청이 있을 시, 체크 색상이 초록색으로 변경되며, 모달을 열어 친구를 수락or거절할 수 있습니다.

![-Clipchamp4-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/28cda451-0d38-42ac-a8c9-5b640faad476)
- 친구 요청을 보낼 수 있습니다.
- 친구 요청을 다시 보낼 시, 요청 실패 메시지를 받게됩니다.

### 6. 친구 투두 
![-Clipchamp5-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/993500a9-15ef-483a-8874-f795bd636ef9)
- 친구의 투두를 볼 수 있습니다.
- 친구 리스트에서 누른 친구의 페이지로 이동하며, 친구 페이지에서는 투두를 추가or수정or삭제할 수 없습니다.
- 헤더의 로고를 클릭하여 자신의 페이지로 돌아올 수 있습니다.

### 7. 반응형
![-Clipchamp7-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/89a4c91b-fb85-4419-b11a-7f51691a805d)
- 메인 페이지는 다양한 디바이스 환경에서도 최적화된 화면을 제공하여, 사용자에게 일관되고 편리한 서비스를 제공합니다.

### 8. 로그아웃
![-Clipchamp6-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/53e06d4b-5e6f-47a0-8dba-dc88cc2da7b1)
- 헤더의 로그아웃 버튼을 눌러 로그아웃할 수 있습니다.
- 로그아웃 시, 랜딩 페이지로 이동합니다. 
<br/>

## develop-ss
5인 팀으로, 1개의 서버에 대해, 브랜치를 **branch-ss, branch-mej**로 나누어 2개의 서비스를 구현했습니다.<br/><br/>

### 팀원 소개
<table>
  <tr>
    <td align="center"><img src="https://avatars.githubusercontent.com/u/88073842?v=4" width="160"></td>
    <td align="center"><img src="https://avatars.githubusercontent.com/u/164132741?v=4" width="160"></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/sujinRo" target="_blank">노수진</a></td>
    <td align="center"><a href="https://github.com/seohyunn2" target="_blank">이서현</a></td>
  </tr>
</table>

### 폴더 구조 
```plaintext
📁 src
├── 🛰️ apis              # API 요청 함수 정의
│
├── 🎨 assets
│   ├── 🖼️ icons         # 아이콘 리소스
│   └── 🖋️ fonts         # 웹폰트
│
├── 🧩 components        # 컴포넌트
│   ├── 📦 common
│   ├── 🧑‍🤝‍🧑 friend        # 친구 기능 관련 컴포넌트
│   ├── 🏠 home          # 홈 화면 관련 컴포넌트
│   ├── 💬 modals        # 모달 컴포넌트
│   └── ✅ todo          # 투두 컴포넌트
│
├── 🪝 hooks             # 커스텀 훅 (모달 관련)
│
├── 📄 pages             # 라우팅 단위 페이지 컴포넌트
│
├── 🗃️ store             # 전역 상태 관리 (Zustand)
│
├── 🎨 styles            # Tailwind 스타일 정의
│
├── 🧾 types             # 전역 타입 정의 (interface, type 등)
│
├── 🧠 App.tsx           # 루트 컴포넌트
├── 🚪 main.tsx          # React DOM 렌더링
│
└── ⚙️ 설정 및 환경 파일
    ├── .env
    ├── tailwind.config.js     # Tailwind 설정
    └── tsconfig.json          # 타입스크립트 설정
```


<br />

## develop-mej
5인 팀으로, 1개의 서버에 대해, 브랜치를 **branch-ss, branch-mej**로 나누어 2개의 서비스를 구현했습니다.<br/><br/>

### 팀원 소개
<table>
  <tr>
    <td align="center"><img src="https://avatars.githubusercontent.com/u/195983909?v=4" width="160"></td>
    <td align="center"><img src="https://avatars.githubusercontent.com/u/171488704?v=4" width="160"></td>
    <td align="center"><img src="https://avatars.githubusercontent.com/u/125029488?v=4" width="160"></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/minji-38" target="_blank">안민지</a></td>
    <td align="center"><a href="https://github.com/eunchrri" target="_blank">이은채</a></td>
    <td align="center"><a href="https://github.com/Jetty-Lee" target="_blank">이주희</a></td>
  </tr>
</table>

### 폴더 구조 
```plaintext
📁 src/                          # 소스코드 루트
│
│   ├── 📁 api/                  # Axios 인스턴스, API 요청 정의
│   ├── 📁 assets/               # 이미지, 폰트, SVG 등 정적 자산
│   ├── 📁 components/          # UI 구성 컴포넌트
│   │   ├── common/             # 공통 컴포넌트 (버튼, 인풋 등)
│   │   ├── friend/             # 친구 관련 UI 컴포넌트
│   │   ├── layout/             # 레이아웃 (헤더, 푸터 등)
│   │   ├── modals/            # 모달 컴포넌트
│   │   ├── panels/            # 대시보드 등 여러 기능 묶인 UI
│   │   ├── timer/             # 타이머 관련 UI
│   │   ├── todo/              # 투두 관련 UI
│   │   └── user/              # 사용자 관련 UI
│   ├── 📁 features/            # 도메인 단위 비즈니스 로직 (API/훅)
│   ├── 📁 hooks/               # 공통 커스텀 훅
│   ├── 📁 pages/               # 라우팅되는 페이지 컴포넌트
│   ├── 📁 router/              # React Router 설정
│   ├── 📁 store/               # 전역 상태 관리 (Zustand)
│   ├── 📁 types/               # 타입 정의 파일 (interface 등)
│   ├── 📁 utils/               # 공통 유틸 함수
│   ├── 🧠 App.tsx              # 앱 루트 컴포넌트
│   └── 🚪 main.tsx             # 진입점 (ReactDOM.createRoot)
│
├── .env                        # 환경 변수
├── tsconfig.json              # TypeScript 기본 설정
└── tailwind.config.js         # Tailwind 설정
```

<br />

## 아키텍쳐
<img src="https://github.com/user-attachments/assets/0e2fa470-a9cf-48fd-ac72-dc2ef431f2a2" width="700"/>
<br/>

## 로컬 실행 방법
```plaintext
# 레포지토리 클론
git clone https://github.com/ureca-bug-zero/Bugzero-Frontend.git

# 의존성 설치
npm install

# 실행
npm run dev
```
<br/>
