"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchText(searchTerm);

    if (searchTerm == "") {
      setPosts(allPosts);
    } else {
      const filteredPosts = allPosts.filter((post) =>
        post.tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setPosts(filteredPosts);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setAllPosts(data);
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const PromptCardList = ({ data, handleTagClick }) => {
    return (
      <div className="mt-16 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post.id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="feed">
      <form
        action=""
        className="relative w-full flex-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder="Search for tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
