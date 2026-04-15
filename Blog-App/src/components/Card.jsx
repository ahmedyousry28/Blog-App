import React, { useContext, useState } from "react";
import { UserContext } from "../providers/userProvider";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router";

const Card = ({
  userId,
  title,
  imageUrl,
  description,
  author,
  id: postId,
  handleDelete,
}) => {
  const { userData } = useContext(UserContext);
  const user = userData?.user;
  const id = user?.id;
  const [loading, setLoading] = useState(false);
  const deletePost = async (postId) => {
    setLoading(true);
    try {
      await handleDelete(postId);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card md:card-side bg-base-100 shadow-sm w-ull">
      <figure>
        <img
          src={imageUrl}
          alt="Album"
          className="w-full h-60 object-center object-fill md:object-cover md:w-50 "
        />
      </figure>
      <div className="card-body flex-1">
        <h2 className="card-title text-2xl">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-between w-full">
          <span className="text-base capitalize bg-base-200 p-2 rounded-2xl inline">
            {author}
          </span>
          {id === userId && (
            <div>
              <Link to={`/post/${postId}`} className="btn btn-primary mx-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </Link>
              <button
                disabled={loading}
                className="btn"
                onClick={() => deletePost(postId)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#ff0000"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
