---mysql ,postgres--
--Danh sách Hotels của user đó
SELECT h.name as hotel, h.address, h.description, AVG(e.star) as Star
FROM hotels AS h
RIGHT JOIN evaluates AS e ON e.id_hotels = h.id_hotels
WHERE h.id_users = 3
GROUP BY h.id_hotels, h.name, h.address, h.description
HAVING h.description LIKE '%hiện đại%'
ORDER BY AVG(e.star)
LIMIT 10 OFFSET 0;


--  Danh sách phòng của một hotels 
SELECT r.name, r.type, r.status, r.price, r.floor
FROM rooms as r
where r.id_hotels = 3 and r.type like 'Single'
order by price
LIMIT 10 OFFSET 0

---mongo----
--:-Danh sách Hotels của user đó
db.hotels.aggregate([
  {
    $match: {
      id_users: 1,
      description: { $regex: "Khách sạn tiện nghi", $options: "i" }
    }
  },
  {
    $lookup: {
      from: "evaluates",
      localField: "_id",
      foreignField: "id_hotels",
      as: "evaluations"
    }
  },
  {
    $unwind: {
      path: "$evaluations",
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $group: {
      _id: {
        hotelName: "$name",
        address: "$address",
        description: "$description"
      },
      hotelStar: { $avg: "$evaluations.star" }
    }
  },
  {
    $sort: { hotelStar: -1 }
  },
  {
    $limit: 10
  },
  {
    $project: {
      _id: 0,
      hotel: "$_id",
      hotelStar: 1
    }
  }
]).pretty();
--ý 2--Danh sách phòng của một hotels 
db.rooms.find({
  id_hotels: 1,
  type: { $regex: "Single" }
}).sort({ price: 1 }).limit(10).skip(0);