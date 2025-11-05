# Props

**Props (viết tắt của “properties”)** là **cách truyền dữ liệu từ component cha xuống component con** trong React.

- Props giúp **component có thể tái sử dụng** được (vì mỗi lần dùng có thể truyền dữ liệu khác nhau).
- Props **chỉ đọc được (read-only)** — không nên thay đổi giá trị props bên trong component con.

### 💡 Ví dụ:

```jsx
// Component con
function Welcome(props) {
  return <h1>Xin chào, {props.name}!</h1>;
}

// Component cha
function App() {
  return (
    <>
      <Welcome name="An" />
      <Welcome name="Bình" />
    </>
  );
}
```

🧠 Ở đây, `name` là một **prop**, được truyền từ `App` → `Welcome`.

---

## **Props có truyền ngược từ con lên cha được không?**

Trực tiếp **không**, nhưng **gián tiếp có thể** thông qua **callback function**.

🔸 Props chỉ truyền **1 chiều: từ cha xuống con.**

Nhưng nếu component cha truyền **một hàm** (callback) xuống cho con, thì con có thể **gọi lại hàm đó** và gửi dữ liệu lên cha.

### 💡 Ví dụ:

```jsx
import { useState } from "react";

// Component cha
function Parent() {
  const [message, setMessage] = useState("");

  const handleChildMessage = (data) => {
    setMessage(data);
  };

  return (
    <div>
      <Child sendData={handleChildMessage} />
      <p>Dữ liệu từ con: {message}</p>
    </div>
  );
}

// Component con
function Child({ sendData }) {
  return (
    <button onClick={() => sendData("Xin chào từ con!")}>
      Gửi dữ liệu lên cha
    </button>
  );
}
```

🧠 Ở đây, `sendData` là **prop** truyền từ cha xuống con,  
nhưng con lại dùng nó để “gửi dữ liệu ngược lên”.
