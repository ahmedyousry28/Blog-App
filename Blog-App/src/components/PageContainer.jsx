const PageContainer = ({ className = "", children }) => {
  return (
    <div
      className={`h-[calc(100vh-72px)] bg-white w-full text-red-500 flex items-center justify-center text-xl ${className}`}
    >
      {children}
    </div>
  );
};

export default PageContainer;
