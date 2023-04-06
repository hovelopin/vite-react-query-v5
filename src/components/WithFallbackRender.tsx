export default function WithFallbackRender(Component: any) {
  const WithFallbackRenderComponent = ({ errors, ...props }: any) => {
    return <Component errors={errors} {...props} />;
  };

  return WithFallbackRenderComponent;
}
