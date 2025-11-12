# generic type parameter trong TypeScript

### Khái niệm:

`<T>` là **tham số kiểu (type parameter)** — giống như một **biến đại diện cho kiểu dữ liệu**, chứ không phải cho giá trị.

Nó giúp **hàm hoặc class linh hoạt hơn**, có thể làm việc với **nhiều kiểu dữ liệu khác nhau** mà vẫn giữ được **kiểm tra kiểu (type checking)** của TypeScript.

---

### 🔹 Ví dụ cơ bản

Không dùng generic:

```tsx
function echoString(value: string): string {
  return value;
}

echoString("Hello"); // OK
// echoString(123); ❌ lỗi vì chỉ nhận string

```

→ Nhược điểm: chỉ dùng được cho `string`.

---

Dùng **generic**:

```tsx
function echo<T>(value: T): T {
  return value;
}

echo("Hello"); // T là string → trả về string
echo(123);     // T là number → trả về number

```

Ở đây:

- `T` đại diện cho **kiểu của tham số truyền vào**.
- TypeScript sẽ **tự suy luận (infer)** kiểu của `T`.

---

### 🔹 Ví dụ thực tế trong API

```tsx
async function getData<T>(url: string): Promise<T> {
  const res = await fetch(url);
  return res.json() as T;
}

// Dữ liệu trả về là mảng người dùng
interface User {
  id: number;
  name: string;
}

const users = await getData<User[]>('/api/users');

```

✅ `users` tự động được hiểu là `User[]`

→ có autocomplete, kiểm tra type, không cần ép kiểu thủ công.

---

### 🔹 Generic có thể có nhiều tham số

```tsx
function merge<A, B>(obj1: A, obj2: B): A & B {
  return { ...obj1, ...obj2 };
}

const merged = merge({ name: "John" }, { age: 25 });
// merged có kiểu: { name: string; age: number }

```

---

### 🔹 Có thể giới hạn kiểu (`extends`)

```tsx
function getLength<T extends { length: number }>(item: T) {
  return item.length;
}

getLength("Hello"); // OK
getLength([1, 2, 3]); // OK
getLength(123); // ❌ lỗi vì number không có thuộc tính length

```