# Hook trong React

**Hook** là các **hàm đặc biệt trong React** (bắt đầu bằng tiền tố `use`) giúp bạn:

- **Thêm tính năng của React** (như state, lifecycle, context, ref, memo, …)  
- Mà **không cần dùng class component**.

---

## 🧠 Ví dụ các Hook phổ biến

| Hook | Mục đích |
|------|-----------|
| `useState` | Quản lý state (dữ liệu thay đổi theo thời gian) |
| `useEffect` | Thực thi logic phụ (gọi API, lắng nghe sự kiện, đồng bộ dữ liệu, …) |
| `useContext` | Truyền dữ liệu xuống nhiều cấp mà không cần props |
| `useRef` | Lưu trữ giá trị hoặc tham chiếu DOM, **không bị reset khi render lại** |
| `useMemo`, `useCallback` | Ghi nhớ giá trị/hàm để **tối ưu hiệu năng render** |

---

## 💡 Hiểu nôm na

Hook giúp **function component** có *“siêu năng lực”* giống **class component** trước đây,  
nhưng **code ngắn hơn, rõ ràng hơn và dễ tái sử dụng hơn**.

---

### 🧩 Ví dụ cơ bản

```tsx
import { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Bạn đã bấm ${count} lần`;
  }, [count]);

  return (
    <div>
      <p>Bạn đã bấm {count} lần</p>
      <button onClick={() => setCount(count + 1)}>Bấm tôi</button>
    </div>
  );
}

export default Counter;
```