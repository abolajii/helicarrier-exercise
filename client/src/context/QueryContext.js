import React, { createContext, useState } from "react";
export const QueryContext = createContext();

const QueryContextProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [groupData, setGroupData] = useState([]);
  const [reload, setReload] = useState(false);

  return (
    <QueryContext.Provider
      value={{ query, setQuery, groupData, setGroupData, reload, setReload }}
    >
      {children}
    </QueryContext.Provider>
  );
};

export default QueryContextProvider;
