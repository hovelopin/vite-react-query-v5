export default function Comment({ data }: any) {
  return (
    <div>
      {data?.data.map((el: any, idx: number) => {
        return (
          <div key={idx}>
            <div>{el.id}</div>
            <div>{el.name}</div>
            <div>{el.email}</div>
            <div>{el.body}</div>
          </div>
        );
      })}
    </div>
  );
}
