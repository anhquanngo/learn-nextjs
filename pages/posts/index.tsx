import * as React from 'react';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';

export interface PostListPageProps {
  posts: any[];
}

export default function PostListPage(props: PostListPageProps) {
  const { posts } = props;
  // dữ liệu ở cả trên client và server
  // console.log('🚀 ~ file: index.tsx ~ line 10 ~ PostListPage ~ posts', posts);
  return (
    <div>
      <h1>Post List Page</h1>;
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps<PostListPageProps> = async (
  context: GetStaticPropsContext
) => {
  // server-side
  // build-time
  console.log('static props');
  const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1');
  const data = await response.json();
  // console.log(data);

  return {
    props: {
      posts: data.data.map((x: any) => ({ id: x.id, title: x.title })),
    },
  };
};

// Để lấy dự liệu trên server ta sử dựng getStaticProps
