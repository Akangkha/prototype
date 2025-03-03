import connectToDatabase from "../../lib/mongodb";
import Item from "../../model/store";

export default async function handler(req, res) {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case "GET":
      try {
        const { page = 1, limit = 10 } = req.query;
        const pageNumber = parseInt(page, 10);
        const pageLimit = parseInt(limit, 10);
        const skip = (pageNumber - 1) * pageLimit;

        if (pageNumber < 1 || pageLimit < 1) {
          return res
            .status(400)
            .json({
              success: false,
              message: "Page and limit must be greater than 0",
            });
        }

        const items = await Item.find({}).skip(skip).limit(pageLimit);

        const totalItems = await Item.countDocuments({});
        const totalPages = Math.ceil(totalItems / pageLimit);

        res.status(200).json({
          success: true,
          data: items,
          pagination: {
            page: pageNumber,
            limit: pageLimit,
            totalItems,
            totalPages,
          },
        });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false, message: "Method not allowed" });
      break;
  }
}
