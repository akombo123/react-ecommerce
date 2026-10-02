import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

async function fetchPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  return response.json();
}

function MutationExample() {
  const [post, setPost] = useState([]);
  const [isLoadData, setIsLoadData] = useState(false);

  const {
    data: posts,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    enabled: isLoadData,
  });

  return (
    <div className="section">
      <h2>1. Intro and Setup</h2>
      <p>
        This is a simple example of using React Query to fetch data from a REST
        API.
      </p>
      <button onClick={() => setIsLoadData(true)}>Load Data</button>
      <button onClick={() => refetch()}>Refetch Data</button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {posts &&
        posts.map((post) => (
          <div className="card" key={post.id}>
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>
        ))}
    </div>
  );
}

export default MutationExample;
