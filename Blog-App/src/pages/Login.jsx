import { useContext, useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { loginSchema } from "../validation";
import CustomTitle from "../components/CustomTitle";
import { UserContext } from "../providers/userProvider";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [validationErr, setValidationErr] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = handleValidation(formData);
    if (!isValid) return;
    handleRegister();
  };
  const handleValidation = (data) => {
    const result = loginSchema.safeParse(data);
    if (!result.success) {
      const errors = result.error.format();
      setValidationErr({
        email: errors.email?._errors?.[0] || "",
        password: errors.password?._errors?.[0] || "",
      });
      return false;
    }
    setValidationErr({});
    return true;
  };

  const handleRegister = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_DB_URL}/login`,
        formData,
      );
      toast.success("user login successfully !");
      login(data);
    } catch (error) {
      toast.error(
        error.response.data.message ||
          error.response.data ||
          "some thing went wrong !",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="h-[calc(100vh-75px)] flex flex-col items-center justify-center">
      <div className="bg-blue-100  w-full md:w-2xl p-6 rounded-md">
        <CustomTitle title={"Login"} />
        <form onSubmit={handleSubmit} className="card text-primary-content ">
          <CustomInput
            name={"email"}
            labelTitle={"email"}
            value={formData.email}
            handleChange={handleChange}
            validationErr={validationErr}
          />
          <CustomInput
            name={"password"}
            labelTitle={"password"}
            value={formData.password}
            handleChange={handleChange}
            type="password"
            validationErr={validationErr}
          />

          <CustomButton isLoading={isLoading} title={"Login"} />
        </form>
        <p className="capitalize mt-1 text-blue-800">
          Don’t have an account?
          <Link className="underline mx-1 font-medium" to={"/register"}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
