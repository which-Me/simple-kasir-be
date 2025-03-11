---
## _SIMPLE KASIR BACKEND_
---

> note: this project is on proccess

#### Route List

```sh
localhost:3000/api/user/regist POST
 body: {
 "name": "",
 "email": "",
 "password": ""
 }

localhost:3000/api/user/login POST
 body: {
 "email": "",
 "password": ""
 }

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
```

---

### _Logs_

---

mar 10, 07:30

> updating controllers, models, and migrations

mar 11, 11.37

> some update & fix
> details
> -> add orders controller (but doesnt work yet, cause empty)
> -> add order procedure
> -> update timestamp, primary and other on models, and migrations
> -> update user & barang controllers
> -> update seeders
> (if i found new bug, i will fix soon.)
