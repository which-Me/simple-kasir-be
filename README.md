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
 "password": "",
 "confirm_password": ""
 }

localhost:3000/api/user/login POST
 body: {
 "email": "",
 "password": ""
 }

localhost:3000/api/barang/ POST

localhost:3000/api/barang/byId POST
 body: {
 "kode_barang": ""
 }

localhost:3000/api/barang/create POST
 body: {
 "nama_barang": "",
 "stock": "",
 "harga": "",
 "diskon": ""
 }

localhost:3000/api/barang/update POST
 body:{
 "kode_barang": "",
 "nama_barang": "",
 "stock": "",
 "harga": "",
 "diskon": ""
 }

localhost:3000/api/barang/delete POST
 body:{
 "kode_barang": ""
}

localhost:3000/api/barang/addStock POST
 body:{
 "kode_barang": "",
 "stock":
}

localhost:3000/api/barang/order/create POST
 body:{
 "kode_barang": "",
 "jumlah_barang": ,
 "jumlah_bayar":
}

localhost:3000/api/barang/order/delete POST
 body:{
 "id_penjualan": ""
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

mar 11, 22:29

> - Added create order conttroler
> - Changes Endpoint Route
> - Fixs stored procedure order

mar 15, 11:33

> - Added delete order controller
> - Add delete order stored procedure

mar 15, 14:52

> - Added update & add stock controller
> - fixs response
