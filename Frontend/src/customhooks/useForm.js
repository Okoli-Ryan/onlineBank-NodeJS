import { useState } from "react";

const UseForm = (init) => {
  const [data, setData] = useState(init);

  const setFormData = (e, tag) => {
    setData((prev) => {
      return {
        ...prev,
        [tag]: e.toLowerCase().trim(),
      };
    });
  };

  return { data, setFormData };
};

export default UseForm;
