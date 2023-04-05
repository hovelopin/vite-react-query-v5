import { Suspense } from 'react';
import Comment from '../components/Comment';
import Photo from '../components/Photo';
import CommentErrorBoundary from '../query/error/boundary/CommentErrorBoundary';
import PhotoErrorBoundary from '../query/error/boundary/PhotoErrorBoundary';
import CircularProgress from '@mui/material/CircularProgress';

export default function Home() {
  return (
    <>
      <div
        style={{
          display: 'flex',
        }}
      >
        <PhotoErrorBoundary>
          <Suspense
            fallback={
              <>
                <CircularProgress />
                <div>Photo Suspense</div>
              </>
            }
          >
            <Photo />
          </Suspense>
        </PhotoErrorBoundary>
        <CommentErrorBoundary>
          <Suspense
            fallback={
              <>
                <CircularProgress />
                <div>Comment Suspense</div>
              </>
            }
          >
            <Comment />
          </Suspense>
        </CommentErrorBoundary>
      </div>
    </>
  );
}
