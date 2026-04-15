import PostForm from "../components/PostForm";

const Post = () => {
  return (
    <div className="h-[calc(100vh-65px)] bg-[url('https://media.istockphoto.com/id/478719701/photo/open-diary-book-old-accessories-and-postcards.jpg?s=612x612&w=0&k=20&c=kyqHTTU7W5w3vGEhfGSEI5fbzcAivMfvx_H7cGCpvjo=')] bg-cover bg-center flex items-center justify-center">
      <PostForm />
    </div>
  );
};

export default Post;
