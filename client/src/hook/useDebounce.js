import { useEffect, useState } from "react";
const useDebounce = (query) => {
  const [debouceQuery, setDebouceQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouceQuery(query);
    }, 500);
    return () => clearTimeout(handler);
  }, [debouceQuery, setDebouceQuery, query]);

  return debouceQuery;
};

export default useDebounce;
