import { useRouter } from 'next/router';
import * as React from 'react';

export interface DetailPostPageProps {}

export default function DetailPostPage(props: DetailPostPageProps) {
  const router = useRouter();
  console.log('🚀 ~ file: [postId].tsx ~ line 8 ~ DetailPostPage ~ router', router);
  return (
    <div>
      <h1>Post Detai Page</h1>
      <p>Query: {JSON.stringify(router.query)}</p>
    </div>
  );
}
