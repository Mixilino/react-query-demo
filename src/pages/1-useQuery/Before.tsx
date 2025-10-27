// generate sample component that fetches 10 post per page but in useEffect
import React from "react";
import type { Post } from "../../mocks";
import { Button } from "@mui/material";

export default function Before() {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<Error | null>(null);

  const [page, setPage] = React.useState<number>(1);
  const [limit] = React.useState<number>(10);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/posts?page=${page}&limit=${limit}`);
        const data = await response.json();
        setPosts(data.posts);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page, limit]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Button onClick={() => { setPage((prev) => prev + 1); setIsLoading(true); }}>
        Load More
      </Button>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </>
  );
}
