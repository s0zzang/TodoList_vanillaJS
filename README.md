# TodoList - banillaJS

|                                                 미리보기1                                                  |                                                 미리보기2                                                  |
| :--------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------: |
| <img width="100%" src="https://github.com/user-attachments/assets/73d4e75b-c6c3-4639-a0ce-8bf677911ec3" /> | <img width="100%" src="https://github.com/user-attachments/assets/8cc54277-2245-4387-aadb-c18e8be9ae08" /> |

<br />

## 1. 실행방법

### 📍 VSCode Live Server 사용

```bash
1. Live Server 확장 프로그램을 설치
2. 우측 하단 `Go Live` 버튼 클릭하여 서버 열기
```

<br>

## 2. 디렉터리 구조

```bash
├── assets
│   └── img
│       ├── icon-delete.svg
│       ├── icon-edit-on.svg
│       ├── icon-edit.svg
│       └── icon-keyboard.svg
├── components
│   ├── Counter.js                 # 할 일, 완료 개수 UI
│   ├── Form.js                    # 할 일 입력 UI
│   ├── Item.js                    # 할 일 아이템 UI
│   ├── Layout.js                  # 레이아웃
│   └── List.js                    # 할 일 리스트 UI
├── styles
│   ├── base.css                   # 변수 설정 및 공통 스타일
│   ├── footer.css                 # 할 일 입력 스타일
│   ├── header.css                 # 상단 타이틀 스타일
│   ├── index.css                  # 스타일 파일 통합
│   ├── main.css                   # 할 일 리스트 및 아이템 스타일
│   └── reset.css                  # 브라우저 기본 스타일 초기화
├── utils
│   ├── createElement.js           # HTMLElement 생성 유틸
│   └── storage.js                 # 스토리지 get, set 유틸
├── index.html
├── index.js
├── App.js
└── README.md

```

<br>

## 3. 주요 구현 기능

### 📍 앱 초기화

- `App`: 주요 컴포넌트를 생성하고 핸들러 및 데이터를 전달하여 단방향 데이터 흐름 유지
- `Layout`: UI 구조를 담당하며, `List`, `Form` 컴포넌트 호출

<br>

### 📍 상태 관리

#### 1. 할 일 목록

- 할 일 목록 추가, 삭제, 수정하기 위해 필요한 상태 관리
- `todo`: 전체 할 일 목록 상태, `getStorage()`를 통해 초기 데이터 로딩
- `setTodo()`: 할 일의 완료 여부 기준으로 데이터를 정렬 -> `setStorage()` 유틸을 통해 localStorage에 저장 -> `render()`로 UI 업데이트

#### 2. 입력 필드

- `inputField`: 수정할 항목의 정보(제목, 인덱스, 완료 상태)를 저장하는 상태
- `inputFieldSet()`: 수정할 항목의 정보를 설정
- `inputFieldReset()`: 입력 필드 초기화
- 이 상태를 통해 수정할 항목이 입력 필드에 자동으로 반영됨

<br>

### 📍 핸들러

- `handlers`: 모든 이벤트 핸들러를 통합한 객체
- `handlers.todos`: 할 일 목록 관련 핸들러 모음
- `handlers.inputField`: 입력 필드 관련 핸들러 모음

#### 1. 할 일 목록 (todos)

- `addItem`: 새로운 할 일 추가
- `deleteItem`: 특정 항목 삭제
- `toggleItem`: 항목 완료 여부 토글
- `prepareEditItem`: 수정할 항목을 입력 필드에 반영
- `editItem`: 항목 내용 수정 및 입력 필드 초기화
- `completeAllItems`: 모든 항목 완료 처리
- `deleteAllItems`: 모든 항목 삭제 처리

#### 2. 입력 필드 (inputField)

- `get`: 현재 입력 필드 상태 가져오기
- `set`: 입력 필드 상태 설정
- `reset`: 입력 필드 초기화 및 렌더링

<br>

## 4. UI/UX 고려사항

#### 📍 디자인 일관성

- 색상, 여백, 폰트 크기 등을 CSS 변수로 관리해 스타일의 일관성과 유지 보수성을 높임

#### 📍 서비스 흐름 유지

- 할 일을 입력하거나 수정한 뒤, 입력 필드에 자동 포커싱하여 서비스 흐름 유지
- 완료되지 않은 할 일을 상단에 정렬하여 우선적으로 보여줌

#### 📍 시각적 피드백

- 사용자 인터랙션 시 `hover`, `focus` 스타일로 명확한 피드백 제공
- 할 일을 완료할 때 라인 애니메이션 적용을 적용하여 피드백 제공
- 수정 아이콘을 체크박스와 함께 표시하여 편집 가능함을 시각적으로 안내
- 수정 불가능한 항목은 입력 필드에 read-only 스타일을 지정하여 명확한 피드백 제공

#### 📍 마크업 구조 및 접근성

- 헤딩 태그(h1, h2, h3)를 계층적으로 사용해 구조를 체계적으로 구성
- `header`, `main`, `footer`, `section`, `p`, `dl`, `dt`, `dd` 등 시맨틱 태그를 적극 활용하여 접근성과 의미 전달을 고려한 HTML 작성
- 정보 전달에 중요하지 않은 이미지는 가상 클래스로 처리하고, 스크린 리더를 위한 숨김 텍스트를 추가해 접근성 강화
  ```html
  <button class="delete-btn" type="button">
    <span class="hidden">삭제</span>
  </button>
  ```

#### 📍 빈 데이터 UI

- 할 일이 없는 경우, 안내 문구를 표시하여 현재 상태를 명확히 인지할 수 있도록 함
