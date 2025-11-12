# Toán tử Spread (...) trong JavaScript / TypeScript

### Ý nghĩa:

Toán tử `...` có hai chức năng chính:

| Ngữ cảnh | Tên gọi | Mục đích |
| --- | --- | --- |
| Trong **object / array literal** | **Spread operator** | **Trải (sao chép) các phần tử hoặc thuộc tính** |
| Trong **parameter list** | **Rest parameter** | **Gộp nhiều đối số thành một mảng** |

---

### 🔹 1. Spread trong **Object**

Dùng để **sao chép hoặc gộp** các thuộc tính từ nhiều object.

```tsx
const user = { name: "Alice" };
const info = { age: 25, country: "VN" };

const merged = { ...user, ...info };

console.log(merged);
// 👉 { name: "Alice", age: 25, country: "VN" }

```

Nó giúp gộp nhanh mà **không làm thay đổi object gốc**.

---

### 🔹 2. Spread trong **Array**

```tsx
const arr1 = [1, 2];
const arr2 = [3, 4];
const merged = [...arr1, ...arr2]; // [1, 2, 3, 4]

```

---

### 🔹 3. Rest parameter (cũng dùng `...` nhưng ngược lại)

Dùng trong **hàm** để **gom nhiều đối số thành mảng**.

```tsx
function sum(...nums: number[]) {
  return nums.reduce((a, b) => a + b, 0);
}

sum(1, 2, 3, 4); // 10

```

Ở đây:

- `nums` là `[1, 2, 3, 4]`
- Dấu `...` này gọi là **rest parameter**, không phải spread.

---

### 🔹 4. Kết hợp Spread với hàm bất đồng bộ (trong ví dụ của bạn)

```tsx
headers: { ...(await getHeaders()) }

```

Giả sử:

```tsx
await getHeaders() // trả về { Authorization: "Bearer token" }

```

Thì:

```tsx
{ ...(await getHeaders()) }

```

→ Tương đương `{ Authorization: "Bearer token" }`.

Nếu bạn thêm thủ công thêm headers:

```tsx
headers: { ...(await getHeaders()), "Content-Type": "application/json" }

```

→ Kết quả gộp lại:

```tsx
{
  Authorization: "Bearer token",
  "Content-Type": "application/json"
}

```

---

## ✅ Tóm tắt

| Khái niệm | Chức năng chính | Ví dụ |
| --- | --- | --- |
| **Generic `<T>`** | Tạo hàm/class có thể làm việc với **nhiều kiểu dữ liệu** khác nhau, vẫn an toàn về type | `function echo<T>(v: T): T` |
| **Spread `...`** | Trải hoặc gộp object/array | `{ ...obj1, ...obj2 }` |
| **Rest `...`** | Gom nhiều tham số vào mảng trong hàm | `function f(...args) {}` |