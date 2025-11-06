| Thành phần | Vai trò |
| --- | --- |
| **Passport** | Là “framework xác thực” (authentication framework) cho Node.js. Nó hỗ trợ nhiều kiểu login khác nhau qua các **strategy**. |
| **Strategy** | Là **chiến lược xác thực cụ thể** – ví dụ “LocalStrategy” (dùng email/password), “JwtStrategy” (dùng token), “GoogleStrategy”, v.v. |
| **AuthGuard('local')** | Là lớp gác cổng (guard) sẽ tự động **kích hoạt strategy tương ứng** trước khi chạy controller. |

> 👉 Mỗi strategy chỉ lo một nhiệm vụ: “Làm sao xác minh user này là ai?”
> 

### **Cụ thể về Local Strategy**

- LocalStrategy = strategy dùng cho **login bằng email & password**.
- Khi có request đến `/auth/login`:
    1. Guard sẽ kích hoạt **LocalStrategy.validate(email, password)**.
    2. Hàm này gọi **AuthService.verifyUser()** để kiểm tra DB.
    3. Nếu hợp lệ → trả về user (Passport sẽ gắn vào `req.user`).
    4. Nếu sai → ném lỗi `UnauthorizedException`.

=> Như vậy **Strategy** = “định nghĩa cách xác minh danh tính người dùng”.

4.1.SignJWT