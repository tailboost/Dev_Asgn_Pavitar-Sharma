import { createContext, useState } from "react";

export const BlogContext = createContext();

const BlogContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const contextValue = {
    searchTerm,
    setSearchTerm,
  };

  return (
    <BlogContext.Provider value={contextValue}>{children}</BlogContext.Provider>
  );
};

export default BlogContextProvider;
