import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import * as React from "react";

export interface PostPageProps {
  post: any;
}

export default function DetailPostPage(props: PostPageProps) {
  const router = useRouter();
  const { post } = props;
  console.log("🚀 ~ file: [postId].tsx ~ line 12 ~ DetailPostPage ~ post", post);
  if (router.isFallback) {
    return <div style={{ fontSize: "2em", textAlign: "center" }}> Loading ... </div>;
  }

  if (!post) return null;

  return (
    <div>
      <h1>Post Detai Page</h1>
      <p>{post.title}</p>
      <p>{post.author}</p>
      <p>{post.description}</p>
      <p>Query: {JSON.stringify(router.query)}</p>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  console.log("\nGET STATIC PATH");
  const response = await fetch("https://js-post-api.herokuapp.com/api/posts?_page=1");
  const data = await response.json();

  return {
    paths: data.data.map((post: any) => ({ params: { postId: post.id } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async (
  context: GetStaticPropsContext
) => {
  // server-side
  // build-time
  console.log("\nGET STATIC PROPS", context.params?.postId);
  const postId = context.params?.postId;
  if (!postId) return { notFound: true };

  const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`);
  const data = await response.json();
  // console.log(data);

  return {
    props: {
      post: data,
    },
    revalidate: 300,
  };
};

// revalidate: 5s
// Khi build sẽ có các bài post được render thành HTML
// Sau 5s thì sẽ tricker request
// fallback: true
