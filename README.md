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

> Updating controllers, models, and migrations

mar 11, 11.37

> Some updates and fixes:
>
> - Added orders controller (currently not functional, as it's empty).
> - Added order procedure.
> - Updated timestamps, primary keys, and other fields in models and migrations.
> - Updated user and barang controllers.
> - Updated seeders.
>
> > If I find any new bugs, I will fix them soon.
