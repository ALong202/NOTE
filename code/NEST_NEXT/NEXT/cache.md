# Hiểu cơ bản về “Cache” trong Next.js

### 🔹 Cache là gì?

Khi bạn dùng `fetch()` để lấy dữ liệu từ API, Next.js **tự động lưu kết quả vào cache trên server**.

→ Lần sau nếu bạn gọi lại cùng request đó, Next.js **sẽ không fetch lại từ API**, mà **dùng dữ liệu đã cache** sẵn.

➡ Điều này giúp:

- Giảm số lượng request đến API → nhanh hơn.
- Tối ưu tài nguyên server → ít tốn chi phí.

---

## ⚙️ 2. Next.js mở rộng `fetch()` như thế nào?

Trong Next.js, `fetch` không chỉ là API của trình duyệt — nó được **mở rộng thêm các tùy chọn đặc biệt** cho cache.

Ví dụ:

```tsx
await fetch("https://api.example.com/products", {
  next: { revalidate: 60 },
});
```

Ở đây:

- `next: { revalidate: 60 }` nghĩa là:
  → Mỗi **60 giây**, dữ liệu cache sẽ được **làm mới tự động** (refetch từ API).

---

## 🔁 3. Các cách “Revalidate” trong Next.js

### Cách 1. **Tự động theo thời gian (`revalidate`)**

Khai báo khi fetch:

```tsx
await fetch(`${API_URL}/products`, {
  next: { revalidate: 60 }, // sau 60s sẽ refetch lại
});
```

Phù hợp cho dữ liệu **thay đổi chậm** (vd: tin tức, danh mục sản phẩm).

---

### Cách 2. **Theo tag — “On-Demand Revalidation”**

Cách này mạnh hơn và hay dùng trong app thực tế (như CRUD).

Bạn có thể **đặt tên tag** cho mỗi request, sau đó khi có thay đổi dữ liệu, bạn gọi hàm để **revalidate cache theo tag**.

### Bước 1️⃣ – Fetch với `tags`

```tsx
// util/fetch.ts
export const get = async <T,>(path: string, tags?: string[]) => {
  const res = await fetch(`${API_URL}/${path}`, {
    next: { tags }, // gắn tag cho request
  });
  return res.json() as T;
};
```

### Bước 2️⃣ – Gọi `get()` với tag

```tsx
// products.ts
const products = await get<Product[]>("products", ["products"]);
```

Lúc này cache cho danh sách sản phẩm được gắn tag là `"products"`.

### Bước 3️⃣ – Khi tạo sản phẩm mới → revalidate

```tsx
import { revalidateTag } from "next/cache";

export async function createProduct(formData: FormData) {
  const res = await post("products", formData);
  revalidateTag("products"); // 🔥 làm mới cache
  return res;
}
```

→ Khi bạn thêm 1 sản phẩm mới, Next.js sẽ:

1. Gửi request tạo sản phẩm lên server.
2. Sau đó, **revalidate tag `products`**, tức là xóa cache cũ của danh sách sản phẩm.
3. Lần render kế tiếp → fetch lại dữ liệu mới nhất.

---

## 🧠 4. Một điểm quan trọng

> ❗ Cache chỉ hoạt động ở các Server Components,
>
> Còn trong **Server Actions** (như `createProduct`) thì **fetch sẽ không cache**.

→ Nghĩa là: chỉ những nơi “hiển thị dữ liệu” (component render dữ liệu) mới được cache,

còn “hành động cập nhật dữ liệu” thì không.

---

## 🧮 5. Tổng luồng hoạt động minh họa

1. **Lúc load trang** → `getProducts()` fetch dữ liệu, gắn tag `"products"` → dữ liệu cache lại.
2. **Người dùng tạo sản phẩm mới** → gọi `createProduct()`.
3. Sau khi tạo thành công → `revalidateTag("products")`.
4. Cache `"products"` bị làm mới → Next.js refetch lại danh sách sản phẩm mới nhất.
5. Giao diện tự động hiển thị sản phẩm vừa thêm. ✅

---

## 🧰 6. Kết luận

| Mục đích                   | Cách dùng                                     | Ví dụ                     |
| -------------------------- | --------------------------------------------- | ------------------------- |
| Cache dữ liệu tự động      | `fetch(..., { next: { revalidate: 60 }})`     | Re-fetch mỗi 60s          |
| Cache theo tag (tùy chỉnh) | `fetch(..., { next: { tags: ['products'] }})` | Dễ revalidate linh hoạt   |
| Revalidate thủ công        | `revalidateTag('products')`                   | Khi CRUD xong thì refetch |
                                                                                                      