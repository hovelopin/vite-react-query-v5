import { Suspense } from 'react';
import Comment from '../components/Comment';
import Photo from '../components/Photo';
import CommentErrorBoundary from '../query/error/boundary/CommentErrorBoundary';
import PhotoErrorBoundary from '../query/error/boundary/PhotoErrorBoundary';

export default function Home() {
  return (
    <>
      <div
        style={{
          display: 'flex',
        }}
      >
        <PhotoErrorBoundary>
          <Suspense fallback={<div>Photo loading...</div>}>
            <Photo />
          </Suspense>
        </PhotoErrorBoundary>
        <CommentErrorBoundary>
          <Suspense fallback={<div>Comment loading...</div>}>
            <Comment />
          </Suspense>
        </CommentErrorBoundary>
      </div>
    </>
  );
}
