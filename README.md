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

**[ 해결 ]**

```jsx
// HTTP 상태 코드에 따른 여러가지 에러 문구
const getErrorMessage = (status: number) => {
  switch (status) {
    case 401:
    case 402:
      return {
        title: '접근 권한이 없습니다.',
        content: '로그인을 해주세요.',
      };
    case 404:
      return {
        title: '페이지를 찾을 수 없습니다.',
        content: '다른 페이지로 접속해주세요,',
      };
    case 500:
      return {
        title: '서비스에 접속할 수 없습니다.',
        content: '새로고침을 하거나 잠시 후 다시 접속해 주시기 바랍니다.',
      };
  }
};

export default getErrorMessage;
```

getErrorMessage 함수안에 Status 코드를 정의해놓고 Error에서 보여준다. 

**fallback Render에서 보여주는 에러메시지 형태들이 비슷하게 작성되는것으로 보았을떄 공통적인 형태들을 어떻게 관리하면 좋을지에 대해 고민**

HOC와 같은 고차 컴포넌트를 활용해서 공통적인 로직을 하나의 고차 컴포넌트로 관리하면 재사용성이나 반복되는 코드를 줄일 수 있을 것이라고 생각했습니다. 

**[ 해결 ]**

기존에는 아래와 같이 공통적으로 fallbackRender에서 공통적인 부분을 사용하고 있었습니다. 

```jsx
// Comment fallbackRender 컴포넌트
import getErrorMessage from '../getErrorMessage';

export default function CommentFallbackRender({ error, resetErrorBoundary }: any) {
  // 정의해놓은 HTTP Error Status를 넘겨줘서 FallbackRender에 넘겨준다.
  const { title, content }: any = getErrorMessage(error.response.request.status);

  return (
    <>
      <div>
        <div>{title}</div>
        <div>{content}</div>
        <div>
          Comment 데이터를 못불러오는 에러가 발생했습니다.
          <button onClick={() => resetErrorBoundary()}>다시 시도해주세요.</button>
        </div>
      </div>
    </>
  );
}
```

```jsx
// Photo fallbackRender 컴포넌트
import getErrorMessage from '../getErrorMessage';

export default function PhotoFallbackRender({ error, resetErrorBoundary }: any) {
  // 정의해놓은 HTTP Error Status를 넘겨줘서 FallbackRender에 넘겨준다.
  const { title, content }: any = getErrorMessage(error.response.request.status);

  return (
    <>
      <div>
        <div>{title}</div>
        <div>{content}</div>
        <div>
          Photo 데이터를 못불러오는 에러가 발생했습니다.
          <button onClick={() => resetErrorBoundary()}>다시 시도해주세요.</button>
        </div>
      </div>
    </>
  );
}
```

위와 같은 부분을 해결하기 위해 고차 컴포넌트를 만들고 공통적인 로직을 따로 빼서 작성하였습니다. 

```jsx
// Error HOC
// HOC는 인자로 컴포넌트를 받고 새로운 컴포넌트를 반환합니다.

import getErrorMessage from '../query/error/getErrorMessage';

// 인자로 전달받은 컴포넌트는 출력함수에서 그대로 구현하면 됩니다.
export default function WithError(WrappedComponent: any) {
  return function WithErrorComponent({ errors, ...props }: any) {
    // 정의해놓은 HTTP Error Status를 넘겨줘서 FallbackRender에 넘겨준다.
    const { title, content }: any = getErrorMessage(errors.response.status);

    return (
      <div>
        <div>{title}</div>
        <div>{content}</div>
        <WrappedComponent {...props} />
      </div>
    );
  };
}
```

아래와 같이 FallbackRender에서는 해당 컴포넌트에서 필요한 UI 로직만 작성하였습니다. 

```jsx
export default function CommentFallbackRender({ resetErrorBoundary }: any) {
  return (
    <>
      <div>
        Comment 데이터를 못불러오는 에러가 발생했습니다.
        <button onClick={resetErrorBoundary}>다시 시도해주세요.</button>
      </div>
    </>
  );
}
```

```jsx
export default function PhotoFallbackRender({ resetErrorBoundary }: any) {
  return (
    <>
      <div>
        Photo 데이터를 못불러오는 에러가 발생했습니다.
        <button onClick={resetErrorBoundary}>다시 시도해주세요.</button>
      </div>
    </>
  );
}
```

위와 같이 작성 후 ErrorBoundary에서 고차컴포넌트를 fallbackRender props로 전달해줍니다. 

```jsx
const WithPhotoFallbackRender = WithError(PhotoFallbackRender);

<ErrorBoundary
  // ErrorBoundary에서 Capture된 에러를 초기화시켜주기 위해 reset을 호출한다.
  // Reset the state of your app so the error doesn't happen again
  onReset={reset}
  // Error가 났을때 보여줄 UI를 넘겨준다. 이때 , resetErrorBoundary를 넘겨줘서 데이터를 받아오기 위해 다시 시도한다.
  fallbackRender={({ error, resetErrorBoundary }) => (
    <WithPhotoFallbackRender resetErrorBoundary={resetErrorBoundary} errors={error} />
  )}
>
  {children}
</ErrorBoundary>
```