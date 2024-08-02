---MYSQL,Postgres--
--Xem thông tin cá nhân--
use hotel_booking_system;
SELECT u.name, u.phone, u.address, u.email 
From users as u 
where id_users = 1;

--xem danh sách phòng đã được booking --
use hotel_booking_system;
SELECT r.name, r.type, r.status, r.price, r.floor 
FROM rooms as r
Left JOIN reservations as re
On r.id_rooms = re.id_rooms
where  re.id_users = 1
order by re.reservtion_date DESC
LIMIT 10 OFFSET 0;
--xem phong đã đặt theo booking __
SELECT r.name, r.type, r.status, r.price, r.floor
FROM rooms AS r
JOIN reservations AS re
ON r.id_rooms = re.id_rooms
WHERE re.id_reservations = 6;
---Xem các đánh giá của mình.--
use hotel_booking_system;
SELECT h.name , h.address, e.feedback , e.star
From hotels as h
JOIN evaluates as e
On h.id_hotels = e.id_hotels
where e.id_users = 3
---Thực hiện đặt phòng---
INSERT INTO reservations (id_Reservations, name, address, reservation_date, checkin_date, checkout_date, description, id_users, id_rooms)
VALUES (10, 'Nhuận ', '32 Đường Y', '2024-06-27', '2024-07-01', '2024-07-05', 'Du lịch', 1, 2);



--Mongodb--
--Xem thông tin cá nhân--
db.users.find(
  { _id: 1 }
);
--xem danh sách phòng đã được booking --
db.rooms.aggregate([
  {
    $lookup: {
      from: "reservations",
      localField: "_id",
      foreignField: "id_rooms",
      as: "reservation"
    }
  },
  {
    $match: {
      "reservation.id_users": 1
    }
  },
  {
    $project: {
      name: 1,
      type: 1,
      status: 1,
      price: 1,
      floor: 1,
    }
  },
  {
    $sort: {
      "reservation.reservation_date": -1
    }
  },
  {
    $limit: 10
  },
  {
    $skip: 0
  }
]);
--xem phong đã đặt theo booking
db.rooms.aggregate([
  {
    $lookup: {
      from: "reservations",
      localField: "_id",  
      foreignField: "id_rooms", 
      as: "res"
    }
  },
  {
    $match: {
      "res._id": 1
    }
  },
  {
    $project: {
      name: 1,
      type: 1,
      status: 1,
      price: 1,
      floor: 1
    }
  }
]);
---Xem các đánh giá của mình.--
db.hotels.aggregate([
  {
    $lookup: {
      from: "evaluates",
      localField: "_id",
      foreignField: "id_hotels",
      as: "evaluations"
    }
  },
  {
    $match: {
      "evaluations.id_users": 1
    }
  },
  {
    $project: {
      name: 1,     
      address: 1,  
      feedback: "$evaluations.feedback",  
      star: "$evaluations.star"
    }
  }
]);
---Thực hiện đặt phòng---
db.reservations.insertOne({
  "_id": 7,
  "name": "Trúc",
  "address": "32 Đường X",
  "reservation_date": new Date("2024-06-30"),
  "checkin_date": new Date("2024-07-02"),
  "checkout_date": new Date("2024-07-06"),
  "description": "Du lịch",
  "id_users": 1,
  "id_rooms": 2
});