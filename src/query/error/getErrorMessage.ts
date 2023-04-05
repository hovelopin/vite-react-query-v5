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
