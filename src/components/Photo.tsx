import usePhotoQuery from '../query/usePhotoQuery';

export default function Photo() {
  const { data: photoList } = usePhotoQuery();

  return (
    <div>
      {photoList?.data.map((el: any, idx: number) => {
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
