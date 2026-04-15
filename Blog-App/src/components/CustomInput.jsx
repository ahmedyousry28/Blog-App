import ErrorMsg from "./ErrorMsg";

const CustomInput = ({
  name,
  labelTitle,
  value,
  handleChange,
  type = "text",
  validationErr,
}) => {
  return (
    <>
      <div className=" flex flex-col gap-1 my-2">
        <label htmlFor={name} className="text-blue-700">
          {labelTitle}
        </label>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => handleChange(e)}
          className="input mb-0 outline-0 w-full text-black"
        />
      </div>
      {validationErr?.[name] && <ErrorMsg msg={validationErr[name]} />}
    </>
  );
};

export default CustomInput;
