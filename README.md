# just back-end

# -> masih dalam tahap pengerjaan

---Route---

- auth
  localhost:3000/api/user/regist POST
  body: {
  "name": "",
  "email": "",
  "password: ""
  }

  localhost:3000/api/user/login POST
  body: {
  "email": "",
  "password": ""
  }

- product
  localhost:3000/api/barang/ POST

  localhost:3000/api/barang/getDataById POST
  body: {
  "kode_barang": ""
  }

  localhost:3000/api/barang/createBarang POST
  body: {
  "nama_barang": "",
  "stock": "",
  "harga": "",
  "diskon": ""
  }

---Logs---
mar 10, 07:30 -> updating controllers, models, and migrations

mar 11, 11.37 -> big update(
details
-> add orders controller (but doesnt work yet, cause empty)
-> add order procedure
-> update timestamp, primary and other on models, and migrations
-> update user & barang controllers
-> update seeders
if i found new bug, i will fix soon.)
