import getErrorMessage from './getErrorMessage';

export default function PhotoFallbackRender({ error, resetErrorBoundary }: any) {
  // 정의해놓은 HTTP Error Status를 넘겨줘서 FallbackRender에 넘겨준다.
  const { title, content }: any = getErrorMessage(error.response.request.status);

  return (
    <>
      <div>{title}</div>
      <div>{content}</div>
      <div>
        Photo 데이터를 못불러오는 에러가 발생했습니다.
        <button onClick={() => resetErrorBoundary()}>다시 시도해주세요.</button>
      </div>
    </>
  );
}
