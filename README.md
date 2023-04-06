# React Query + ErrorBoundary + Suspense

React 17버전에서 React 18버전으로 마이그레이션 테스트를 하기 위해 간단한 프로젝트를 만들고 시행해봤습니다. 

[ 기술 ] 

- Vite ( React )
- React Query
- ErrorBoundary + Suspense

## Point

- ReactQuery를 같이 사용했을때 ReactQuery에 들어가는 비지니스 로직을 어떻게 관리할지에 대한 고민
- ErrorBoundary와 Suspense를 같이 쓰다 보면 공통적으로 파일이 2개씩 ( ErrorBoundary 1개 , Suspense 1개 ) 생기는데 그때 어떤식으로 관리하면 좋을지에 대한 고민
- 공통적으로 처리하는 HTTP Status에 따른 ErrorMessage를 어떻게 관리하면 좋을지에 대한 고민
- fallback Render에서 보여주는 에러메시지 형태들이 비슷하게 작성되는것으로 보았을떄 공통적인 형태들을 어떻게 관리하면 좋을지에 대해 고민

## Problem

- Suspense Spinner를 보여줄때 Layout Shift 현상이 일어나는데 그때 어떤식으로 처리해야하는지
- React 18 이외에 기능들 Transition과 같은 업데이트 우선순위는 어떤식으로 활용해야할지 모르겠음

## Good

- 특정 비동기 요청에 대해서 Error가 났을때 모든 페이지가 Block되지 않아도 된다는 점
- 코드의 모든 비동기 요청에 try-catch를 하지 않아도 ErrorBoundary에서 전역적으로 처리 가능하다는 점
- 코드상에서 Error나 Loading에 대한 복잡한 상태 처리( 성공이나 실패에 관한 ) 없이 선언적으로 처리할 수 있다는 점

## 테스트

**ReactQuery를 같이 사용했을때 ReactQuery에 들어가는 비지니스 로직을 어떻게 관리할지에 대한 고민**

저번 토이프로젝트에서 경험했었는데 기존에는 React Query를 컴포넌트 레벨이나 페이지단에서 여러 서비스 로직과 뷰로직을 한번에 다루곤 했었는데 Custom Hook으로 관리하면 좋을 것 같다는 생각에 Hook으로 뺐습니다. 

**ErrorBoundary와 Suspense를 같이 쓰다 보면 공통적으로 파일이 2개씩 ( ErrorBoundary 1개 , Suspense 1개 ) 생기는데 그때 어떤식으로 관리하면 좋을지에 대한 고민**

ErrorBoundary와 Suspense를 중첩해서 코드상에 작성하다보니까 2개의 파일씩 생성되게 됩니다. ErrorBoundary에 대한거 1개 Suspense일때 보여주는 fallback 컴포넌트 1개 나중에 세세하게 처리하다 보면 파일이 많아지고 관리하기 어렵다는 생각이 들어서 폴더구조를 어떻게 가져가면 좋을지에 대해 고민해봤습니다. 

**공통적으로 처리하는 HTTP Status에 따른 ErrorMessage를 어떻게 관리하면 좋을지에 대한 고민**

Error 처리를 하다보니까 서버에서 Status에 따라서 내려주는 code들은 어떻게 관리하면 좋을지에 대해서 고민해봤습니다. 그거를 ErrorBoundary와 함께 사용하면 더욱더 쉽게 관리할 수 있을 것 같아서 getErrorMessage라는 함수를 하나 만들어서 그 안에서 switch case를 이용해서 status에 따른 상태 메시지를 보여주는 식으로 관리했습니다. 

**fallback Render에서 보여주는 에러메시지 형태들이 비슷하게 작성되는것으로 보았을떄 공통적인 형태들을 어떻게 관리하면 좋을지에 대해 고민**

HOC와 같은 고차 컴포넌트를 활용해서 공통적인 로직을 하나의 고차 컴포넌트로 관리하면 재사용성이나 반복되는 코드를 줄일 수 있을 것이라고 생각했습니다.