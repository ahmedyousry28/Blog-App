import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { postSchema } from "../validation";
import { UserContext } from "../providers/userProvider";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import PageContainer from "./PageContainer";

const PostForm = () => {
  const data = useContext(UserContext);
  const {
    userData: { user },
  } = data;
  const { id: userId, firstName, lastName } = user;
  const { id } = useParams();
  const mode = id === "new" ? "new" : "edit";
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    userId,
    author: `${firstName} ${lastName}`,
    title: "",
    description: "",
    imageUrl: "",
  });
  useEffect(() => {
    if (mode === "edit") {
      const getPostData = async () => {
        try {
          const { data } = await axios.get(
            `${import.meta.env.VITE_DB_URL}/posts/${id}`,
          );
          setFormData((prev) => ({ ...prev, ...data }));
        } catch (error) {
          console.dir(error);
          setError("some thing went wrong !");
        }
      };

      getPostData();
    }
  }, [id, mode]);
  const navigate = useNavigate();

  const [validationErr, setValidationErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = handleValidation(formData);
    if (!isValid) return;
    handlePost();
  };
  const handleValidation = (data) => {
    const result = postSchema.safeParse(data);
    if (!result.success) {
      const errors = result.error.format();
      setValidationErr({
        title: errors.title?._errors?.[0] || "",
        description: errors.description?._errors?.[0] || "",
        imageUrl: errors.imageUrl?._errors?.[0] || "",
      });
      return false;
    }
    setValidationErr({});
    return true;
  };
  const handlePost = async () => {
    try {
      setIsLoading(true);
      if (mode === "new") {
        await axios.post(`${import.meta.env.VITE_DB_URL}/posts`, formData);
        toast.success("post added successfully !");
      } else {
        await axios.put(`${import.meta.env.VITE_DB_URL}/posts/${id}`, formData);
        toast.success("post edited successfully !");
      }
      navigate("/");
    } catch (error) {
      toast.error(
        error.response.data ||
          error.response.data.message ||
          "some thing went wrong .. please try again later !",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(newFormData);
  };

  if (error) return <PageContainer>{error || "Invalid Post Id"}</PageContainer>;

  return (
    <form
      onSubmit={handleSubmit}
      className="card bg-[#f6f2e9] text-primary-content w-full md:w-2xl p-6 mx-4"
    >
      <CustomInput
        name={"title"}
        labelTitle={"Title"}
        value={formData.title}
        handleChange={handleChange}
        validationErr={validationErr}
      />
      <CustomInput
        name={"description"}
        labelTitle={"Description"}
        value={formData.description}
        handleChange={handleChange}
        validationErr={validationErr}
      />
      <CustomInput
        name={"imageUrl"}
        labelTitle={"Image Url"}
        value={formData.imageUrl}
        handleChange={handleChange}
        validationErr={validationErr}
      />

      <CustomButton
        isLoading={isLoading}
        title={mode === "new" ? "Add Post" : "Edit Post"}
      />
    </form>
  );
};

export default PostForm;
