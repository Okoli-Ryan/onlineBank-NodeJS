import { useState } from "react";

const UseForm = () => {
  const [data, setData] = useState({});

  const setFormData = (e, tag) => {
    setData((prev) => {
      return {
        data: { ...prev.data, [tag]: e.toLowerCase().trim() },
      };
    });
  };

  return { data, setFormData };
};

export default UseForm;
