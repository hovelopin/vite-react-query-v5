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
