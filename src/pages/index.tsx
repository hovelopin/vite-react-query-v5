import Comment from '../components/Comment';
import Photo from '../components/Photo';
import useCommentQuery from '../query/useCommentQuery';
import usePhotoQuery from '../query/usePhotoQuery';

export default function Home() {
  const { data: photoList } = usePhotoQuery();
  const { data: commentList } = useCommentQuery();

  return (
    <>
      <div
        style={{
          display: 'flex',
        }}
      >
        <Photo data={photoList} />
        <Comment data={commentList} />
      </div>
    </>
  );
}
