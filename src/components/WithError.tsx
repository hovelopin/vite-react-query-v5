// HOC는 인자로 컴포넌트를 받고 새로운 컴포넌트를 반환합니다.

import getErrorMessage from '../query/error/getErrorMessage';

// 인자로 전달받은 컴포넌트는 출력함수에서 그대로 구현하면 됩니다.
export default function WithError(WrappedComponent: any) {
  return function WithErrorComponent({ errors, ...props }: any) {
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
