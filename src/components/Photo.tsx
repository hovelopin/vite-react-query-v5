export default function Photo({ data }: any) {
  return (
    <div>
      {data?.data.map((el: any, idx: number) => {
        return (
          <div key={idx}>
            <div>{el.id}</div>
            <div>{el.title}</div>
            <div>{el.url}</div>
            <img src={el.thumbnailUrl} />
          </div>
        );
      })}
    </div>
  );
}
