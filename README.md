## React Query + ErrorBoundary + Suspense

### Point
- ReactQuery를 같이 사용했을때 ReactQuery에 들어가는 비지니스 로직을 어떻게 관리할지에 대한 고민
- ErrorBoundary와 Suspense를 같이 쓰다 보면 공통적으로 파일이 2개씩 ( ErrorBoundary 1개 , Suspense 1개 ) 생기는데 그때 어떤식으로 관리하면 좋을지에 대한 고민
- 공통적으로 처리하는 HTTP Status에 따른 ErrorMessage를 어떻게 관리하면 좋을지에 대한 고민
- 예상하지 못하는 에러들에 대해서는 어떤식으로 처리하면 좋을지에 대한 고민

### Problem
- Suspense Spinner를 보여줄때 Layout Shift 현상이 일어나는데 그때 어떤식으로 처리해야하는지
- Transition과 같은 업데이트 우선순위는 어떤식으로 활용해야할지 모르겠음
- fallback Render에서 보여주는 에러메시지 형태들이 비슷하게 작성되는것으로 보았을떄 HOC를 만들어서 공통적인 형태들을 하나의 컴포넌트로 만들고 그걸 감싸서 만들면 좋을 것 같다는 생각

### Good
- 하나의 비동기 요청에 대해서 Error가 났을때 모든 페이지가 Block되지 않아도 된다는 점 
- 코드의 모든 비동기 요청에 try-catch를 하지 않아도 ErrorBoundary에서 전역적으로 처리 가능하다는 점
- 코드상에서 Error나 Loading에 대한 복잡한 상태 처리( 성공이나 실패에 관한 ) 없이 선언적으로 처리할 수 있다는 점
