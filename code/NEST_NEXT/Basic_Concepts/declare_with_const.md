# Các kiểu khai báo biến/hàm/đối tượng với `const`

| Cú pháp | Nghĩa |
| --- | --- |
| `const a = 5;` | Biến thường, giá trị cố định |
| `const arr = [];` | Khởi tạo mảng |
| `const obj = {};` | Khởi tạo object |
| `const {x, y} = obj;` | Destructuring object (rút gọn biến từ object) |
| `const [a, b] = arr;` | Destructuring array |
| `const a = b();` | Gán giá trị trả về từ hàm `b()` |
| `const a = b({ name: "An" });` | Gọi hàm `b()` với tham số object |
| `const a = async () => {...}` | Khai báo hàm async (trả về Promise) |
| `const a = () => {...}` | Khai báo hàm thường (arrow function) |
| `const a: Type = {...}` | Khai báo biến có kiểu TypeScript |
| `const a: Type = c({...})` | Gán kết quả từ hàm `c()` với kiểu TypeScript |

---

### 💡 Ví dụ minh họa tất cả:

```typescript
interface User {
  name: string;
  age: number;
}

const user: User = { name: "An", age: 20 };  // object + type
const users: User[] = [user];                // mảng
const { name } = user;                       // destructuring
const [firstUser] = users;                   // destructuring mảng

const sayHi = () => console.log("Hi!");      // hàm thường
const getUser = async () => user;            // hàm async
const newUser = getUser();                   // gọi hàm
```
