import useCommentQuery from '../query/useCommentQuery';

export default function Comment() {
  const { data: commentList } = useCommentQuery();

  return (
    <div>
      {commentList?.data.map((el: any, idx: number) => {
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
