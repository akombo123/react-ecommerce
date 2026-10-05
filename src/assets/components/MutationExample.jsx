import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

async function fetchPosts(newPost) {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "post",
    body: JSON.stringify(newPost),
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });

  return response.json();
}

function MutationExample() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const {
    mutate,
    data: newPost,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: fetchPosts,
  });
  return (
    <div className="section">
      <h2>3. Mutation Example</h2>
      <p>This is a simple example of using React Query to mutate data.</p>
      <div className="form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        ``
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <button onClick={() => mutate({ title, body, userId: 1 })}>
        Create Post
      </button>
      {isPending && <p>Creating post...</p>}
      {isError && <p>Error: {error.message}</p>}
      {newPost && (
        <div className="card">
          <h4>{newPost.title}</h4>
          <p>{newPost.body}</p>
        </div>
      )}
    </div>
  );
}

export default MutationExample;
