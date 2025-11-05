# async/await


`async/await` là cú pháp để **làm việc với Promise** theo style tuần tự (synchronous-looking) nhưng vẫn là **bất đồng bộ, không chặn event loop**.

- `async function f(){...}` trả về một `Promise`.
- Trong `async` function, dùng `await promise` sẽ **tạm dừng thực thi bên trong hàm đó** cho đến khi `promise` resolve, nhưng **không** chặn toàn bộ Node.js — các callback, I/O khác vẫn chạy bình thường trên event loop.

Ví dụ trực quan:

```tsx
async function demo(){
  console.log('A');
  await new Promise(r => setTimeout(r, 1000)); // chờ 1s nhưng không block toàn cục
  console.log('B'); // in sau 1s
}
demo();
console.log('C'); // in ngay lập tức sau 'A'

```

Kết quả: `A` → `C` → (1s) → `B`.

**Mục đích / lợi ích chính:**

- Viết code bất đồng bộ dễ đọc hơn (giống code tuần tự).
- Tránh callback-hell / nhiều `.then()` lồng nhau.
- Dễ xử lý lỗi bằng `try/catch`.
- Giúp khởi tạo các tài nguyên cần chờ (DB, server) tuần tự trong `bootstrap` nhưng không block server-process.

**Lưu ý:** `await` chỉ “tạm dừng” hàm hiện tại — nếu bạn muốn chạy nhiều promise song song, hãy tạo promise trước rồi `await Promise.all([...])` để không phải chờ tuần tự.