# Destructuring

**Destructuring object & array**  
Cả hai đều là **cách “rút gọn” để khởi tạo biến từ object hoặc array**.

---

### a. **Destructuring object**

Giả sử có object:

```jsx
const user = { name: "An", age: 25, country: "VN" };
```

Thay vì:

```jsx
const name = user.name;
const age = user.age;
```

Ta có thể viết ngắn gọn:

```jsx
const { name, age } = user;
console.log(name); // "An"
console.log(age);  // 25
```

🧠 Cú pháp `{ name, age } = user` nghĩa là:

> “Tạo 2 biến tên `name` và `age`, gán giá trị tương ứng từ object `user`”.

---

### 🧩 b. **Destructuring array**

Tương tự, nhưng dùng dấu **`[]`**:

```jsx
const arr = [10, 20, 30];
const [a, b, c] = arr;
console.log(a); // 10
console.log(b); // 20
console.log(c); // 30
```

Bạn có thể **bỏ qua phần tử**:

```jsx
const [first, , third] = arr;
console.log(first, third); // 10 30
```

Hoặc **gán giá trị mặc định**:

```jsx
const [x, y = 100] = [50];
console.log(x, y); // 50 100
```
