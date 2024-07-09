"use client";
import { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { Triangle } from "react-loader-spinner";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
const Store = () => {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 0,
  });

  // Fetch data from the API
  const fetchItems = async (page = 1, limit = 10) => {
    try {
      const response = await fetch(`/api/store?page=${page}&limit=${limit}`);
      const data = await response.json();
      if (data.success) {
        setItems(data.data);
        setPagination({
          page: data.pagination.page,
          limit: data.pagination.limit,
          totalItems: data.pagination.totalItems,
          totalPages: data.pagination.totalPages,
        });
      } else {
        console.error("Failed to fetch items:", data.message);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // Fetch initial data
  useEffect(() => {
    fetchItems(pagination.page, pagination.limit);
  }, [pagination.page, pagination.limit]);

  return (
    <div className="w-full relative h-[92vh] p-4">
      <h1 className="font-semibold text-2xl px-5 mb-5">Choose an outfit</h1>
      <ul className="w-full flex flex-wrap gap-4 h-[75%] overflow-y-auto px-5">
        {items.length > 0 ? (
          items.map((item) => (
            <li
              key={item._id}
              className="shadow flex flex-col justify-center items-center p-4 rounded-xl w-[15rem]"
            >
              <img
                src="https://m.media-amazon.com/images/I/61LYRZ-uH6L._AC_UY1100_.jpg"
                alt="img"
                width={150}
                height={150}
              />
              <p className="text-sm mt-2"> {item.name}</p>
              <div className="flex justify-between w-full my-2">
                <p className="text-orange-400 flex font-bold gap-2">
                  <p className="line-through font-bold text-black">
                    {item.raw_price}
                  </p>
                  {item.current_price}
                  {item.currency}
                </p>
                <div className="flex gap-1 text-red-400">
                  <FavoriteIcon sx={{ color: "#FFB6C1" }} />
                  {item.likes_count}
                </div>
              </div>
            </li>
          ))
        ) : (
          <div className="flex justify-center items-center w-full h-full">
            <Triangle
              visible={true}
              height="80"
              width="80"
              color="#000000"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
      </ul>
      <div className="flex gap-4 absolute right-12 bottom-6 items-center">
        <button
          onClick={() =>
            setPagination((prev) => ({
              ...prev,
              page: Math.max(prev.page - 1, 1),
            }))
          }
          disabled={pagination.page === 1}
        >
          <ArrowCircleLeftIcon className="cursor-pointer " fontSize="large" />
        </button>
        <span className="font-bold ">{`Page ${pagination.page} of ${pagination.totalPages}`}</span>
        <button
          onClick={() =>
            setPagination((prev) => ({
              ...prev,
              page: Math.min(prev.page + 1, pagination.totalPages),
            }))
          }
          disabled={pagination.page === pagination.totalPages}
        >
          <ArrowCircleRightIcon className="cursor-pointer " fontSize="large" />
        </button>
      </div>
    </div>
  );
};

export default Store;
