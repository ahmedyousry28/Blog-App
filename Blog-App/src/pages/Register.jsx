import { useContext, useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import CustomInput from "../components/CustomInput";
import { registerSchema } from "../validation";
import CustomButton from "../components/CustomButton";
import CustomTitle from "../components/CustomTitle";
import { UserContext } from "../providers/userProvider";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { login } = useContext(UserContext);
  const [validationErr, setValidationErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = handleValidation(formData);
    if (!isValid) return;
    handleRegister();
  };
  const handleValidation = (data) => {
    const result = registerSchema.safeParse(data);
    if (!result.success) {
      const errors = result.error.format();
      setValidationErr({
        firstName: errors.firstName?._errors?.[0] || "",
        lastName: errors.lastName?._errors?.[0] || "",
        email: errors.email?._errors?.[0] || "",
        password: errors.password?._errors?.[0] || "",
        confirmPassword: errors.confirmPassword?._errors?.[0] || "",
      });
      return false;
    }
    setValidationErr({});
    return true;
  };
  const handleRegister = async () => {
    const dataToSend = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_DB_URL}/register`,
        dataToSend,
      );

      toast.success("user registered successfully !");
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
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(newFormData);
  };
  return (
    <div className="h-[calc(100vh-75px)] flex flex-col items-center justify-center">
      <div className="bg-blue-100  w-full md:w-2xl p-6 rounded-md">
        <CustomTitle title={"register"} />
        <form onSubmit={handleSubmit} className="card text-primary-content">
          <CustomInput
            name={"firstName"}
            labelTitle={"First Name"}
            value={formData.firstName}
            handleChange={handleChange}
            validationErr={validationErr}
          />
          <CustomInput
            name={"lastName"}
            labelTitle={"Last Name"}
            value={formData.lastName}
            handleChange={handleChange}
            validationErr={validationErr}
          />

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

          <CustomInput
            name={"confirmPassword"}
            labelTitle={"Confirm Password"}
            value={formData.confirmPassword}
            handleChange={handleChange}
            type="password"
            validationErr={validationErr}
          />

          <CustomButton isLoading={isLoading} title="Submit" />
        </form>
        <p className="capitalize mt-1 text-blue-800">
          have already an account?
          <Link className="underline mx-1 font-medium" to={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
