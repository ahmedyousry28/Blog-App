import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useQuery = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_DB_URL}${url}`,
        );
        setData(data);
      } catch (error) {
        setError(
          error.message || "Some thing went wrong .. please try again later !",
        );
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [url]);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_DB_URL}${url}/${postId}`);
      setData((prev) => prev.filter((item) => item.id !== postId));
      toast.success("post deleted successfully !");
    } catch (error) {
      toast.error(
        error.message ||
          error.response.data.message ||
          "some thing went wrong !",
      );
    }
  };
  return { data, isLoading, error, handleDelete };
};

export default useQuery;
