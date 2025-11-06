**biểu thức chính quy (Regular Expression – regex)**.

Cụ thể:

```js
/((?!api|_next/static|_next/image|\.png$).)/

```

---

### 🔍 Giải thích chi tiết:

- **Dấu `/`...`/`**
    
    → Bao quanh biểu thức chính quy (cách viết kiểu JavaScript).
    
- **`(?! ... )`**
    
    → Đây là **negative lookahead**, nghĩa là “không khớp nếu phía sau là ...”.
    
- **Bên trong `(?!api|_next/static|_next/image|\.png$)`**
    
    → Nghĩa là: loại trừ (không khớp với) các chuỗi:
    
    - `"api"`
    - `"_next/static"`
    - `"_next/image"`
    - hoặc bất kỳ chuỗi nào **kết thúc bằng `.png`**
- **`.` (dấu chấm)**
    
    → Đại diện cho **bất kỳ ký tự nào** (trừ xuống dòng).
    
- **Toàn bộ `((?!...).)`**
    
    → Nghĩa là “một ký tự bất kỳ mà **phía sau nó không bắt đầu bằng** `api`, `_next/static`, `_next/image`, hoặc `.png` ở cuối chuỗi”.
    

---

### 💡 Nói dễ hiểu:

Biểu thức này thường được dùng để **lọc hoặc chặn** những request *không thuộc*:

- API (`/api`)
- Static assets (`/_next/static/...`)
- Ảnh (`/_next/image/...` hoặc `.png` file)

👉 Ví dụ, trong Next.js hoặc Express middleware, regex này thường dùng để **chỉ xử lý route động** (non-static routes), chẳng hạn:

```jsx
const regex = /((?!api|_next/static|_next/image|\.png$).)/;

```

hoặc trong `middleware.js` của Next.js:

```jsx
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

```

---

### ✅ Tóm lại:

- **Tên gọi:** Biểu thức chính quy (Regular Expression)
- **Cấu trúc đặc biệt:** sử dụng **negative lookahead `(?!...)`**
- **Chức năng:** loại trừ một số đường dẫn hoặc mẫu ký tự không mong muốn.