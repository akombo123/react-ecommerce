import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

function PostList() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=5",
      );
      return response.json();
    },
    staleTime: 1000 * 5,
    gcTime: 1000 * 5,
    // refetchOnWindowFocus: true,
    // refetchOnReconnect: true,
    // refetchInterval: 1000 * 3,
  });
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isFetching && <p>BackgroundFetching...</p>}
      {data &&
        data.map((post) => (
          <div key={post.id} className="card">
            <p>{post.title}</p>
          </div>
        ))}
    </div>
  );
}

function CachingExample() {
  const [show, setShow] = useState(true);
  const queryClient = useQueryClient();

  function invalidatePosts() {
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  }

  return (
    <div className="section">
      <h2>4. Caching Example</h2>
      <p>This is a simple example of using React Query to cache data.</p>
      <button onClick={invalidatePosts}>
        Invalidate Posts Query (Refetch Data)
      </button>
      <button onClick={() => setShow(!show)}>
        {show ? "Unmount Component" : "Mount Component"}
      </button>
      {show && <PostList />}
    </div>
  );
}

export default CachingExample;
