"use client";
import { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { Triangle } from "react-loader-spinner";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import SplineViewer from "./AvatarViewer";

const Store = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 0,
  });

  const items1 = [
    {
      _id: "1",
      name: "Stylish Shirt",
      raw_price: "$30",
      current_price: "$25",
      currency: "USD",
      likes_count: 150,
      images: [
        "https://rajubhaihargovindas.com/12337-large_default/japs-brown-pure-cotton-formal-shirt.jpg",
      ],
    },
    {
      _id: "2",
      name: "Casual T-shirt",
      raw_price: "$20",
      current_price: "$15",
      currency: "USD",
      likes_count: 75,
      images: [
        "https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/7/h/m/m-allu-arjun-paravadi-original-imagkqnfaecfecsf.jpeg?q=70&crop=false",
      ],
    },
    {
      _id: "3",
      name: "Stylish Shirt",
      raw_price: "$30",
      current_price: "$25",
      currency: "USD",
      likes_count: 150,
      images: [
        "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRiQd4-on0uTuRQCVoTLiN67XJQWP3AvGA7ePF6PpvNtJlN_P-Yhfb0mAjJiIYhZP_L__w2-vGSFn_019S6vJvud11dTmM2&usqp=CAY",
      ],
    },
    {
      _id: "4",
      name: "Stylish Shirt",
      raw_price: "$30",
      current_price: "$25",
      currency: "USD",
      likes_count: 150,
      images: [
        "https://cdn.linenclub.com/media/catalog/product/cache/41d32663a01600992c99bcd3aa36f0e1/c/o/comshck08270-g4_0_1.jpg",
      ],
    },
    {
      _id: "5",
      name: "Stylish Shirt",
      raw_price: "$30",
      current_price: "$25",
      currency: "USD",
      likes_count: 150,
      images: [
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRHLNWzhItqkceTbgtibO2SayDdYdZJ2Z3-WLvOFYPFfWN0eILhGuLC6rRea4DyNR8Wdv1OMaxWexl3HH4JyNUOTd_hPsk3OD2YXuS04vCHlE-zUqrsw0HDKQ&usqp=CAE",
      ],
    },
    {
      _id: "6",
      name: "Stylish Shirt",
      raw_price: "$30",
      current_price: "$25",
      currency: "USD",
      likes_count: 150,
      images: [
        "https://imgs.search.brave.com/4X-W3zOzV1BPh-OTGxRlRBoEso4-ww_uGSOwojI1zb0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjEzU1BscjhUTkwu/anBn",
      ],
    },
  ];

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

  // Handle item selection
  const handleSelectItem = (item) => {
    setLoading(true);
    setSelectedItem(item);
    setTimeout(() => {
      setLoading(false);
      alert("Your outfit is ready!");
    }, 2000); // Simulate a delay for processing
  };

  return (
    <div className="w-full relative h-[92vh] p-4">
      <h1 className="font-semibold text-2xl px-5 mb-5">Choose an outfit</h1>
      <ul className="w-full flex flex-wrap gap-4 h-[75%] overflow-y-auto px-5">
        {items1.length > 0 ? (
          items1.map((item) => (
            <li
              key={item._id}
              className={`shadow flex flex-col justify-center items-center p-4 rounded-xl w-[15rem] cursor-pointer ${
                selectedItem?._id === item._id ? "border-2 border-black" : ""
              }`}
              onClick={() => handleSelectItem(item)}
            >
              {item.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`img-${index}`}
                  width={150}
                  height={150}
                  className="mb-2"
                />
              ))}
              <p className="text-sm mt-2"> {item.name}</p>
              <div className="flex justify-between w-full my-2">
                <p className="text-orange-400 flex font-bold gap-2">
                  <span className="line-through font-bold text-black">
                    {item.raw_price}
                  </span>
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

      {loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
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

      {selectedItem && !loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center ">
          <div className="bg-white p-4 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl mb-4 font-bold">{selectedItem.name}</h3>
            <div className="flex justify-center mb-4">
              <SplineViewer />
            </div>
            <p className="text-lg mt-4">
              <span className="line-through">{selectedItem.raw_price}</span>{" "}
              <span className="font-bold">{selectedItem.current_price}</span>{" "}
              {selectedItem.currency}
            </p>
            <p className="text-red-400 mt-2 flex items-center">
              <FavoriteIcon sx={{ color: "#FFB6C1" }} />{" "}
              {selectedItem.likes_count}
            </p>
            <div className="flex justify-between items-center mt-4">
              <p className="text-green-500">Available in your size!</p>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => setSelectedItem(null)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Store;
