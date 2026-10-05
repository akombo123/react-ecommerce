import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

async function fetchPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  return response.json();
}

async function createPost(newPost) {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(newPost),
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });

  return response.json();
}

function OptimisticQueryExample() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isLoadData, setIsLoadData] = useState(false);

  const {
    data: posts = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    enabled: isLoadData,
  });

  const {
    mutate,
    isPending,
    isError,
    error: mutationError,
  } = useMutation({
    mutationFn: createPost,
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previousPosts = queryClient.getQueryData(["posts"]);

      queryClient.setQueryData(["posts"], (oldPosts = []) => [
        ...oldPosts,
        {
          id: Date.now(),
          title: newPost.title,
          body: newPost.body,
          userId: 1,
        },
      ]);

      return { previousPosts };
    },
    onError: (_error, _newPost, context) => {
      queryClient.setQueryData(["posts"], context?.previousPosts ?? []);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleCreatePost = () => {
    if (!title.trim() || !body.trim()) return;

    mutate({ title, body, userId: 1 });
    setTitle("");
    setBody("");
  };

  return (
    <div className="section">
      <h2>4. Optimistic Updates</h2>
      <p>
        This example shows how to immediately update the UI before the server
        confirms the mutation.
      </p>

      <button onClick={() => setIsLoadData(true)}>Load Posts</button>
      <button onClick={() => refetch()}>Refetch Posts</button>

      <div className="form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>

      <button onClick={handleCreatePost} disabled={isPending}>
        {isPending ? "Posting..." : "Create Post Optimistically"}
      </button>

      {isLoading && <p>Loading posts...</p>}
      {error && <p>Error: {error.message}</p>}
      {isError && <p>Error: {mutationError.message}</p>}

      {posts.map((post) => (
        <div className="card" key={post.id}>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default OptimisticQueryExample;
