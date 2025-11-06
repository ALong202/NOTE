## TÓM TẮT TỪNG BƯỚC + MỤC ĐÍCH

| Bước | Nội dung chính | Mục đích / Giải thích |
| --- | --- | --- |
| **1️⃣ Giới thiệu Passport & JWT** | Passport cho phép tạo nhiều **authentication strategy** (chiến lược xác thực) khác nhau – ví dụ: local (email/password), Google, JWT, v.v. | Mỗi strategy là một module riêng giúp linh hoạt đổi phương thức xác thực. JWT được dùng để cấp token cho user và xác minh token ở các request sau. |
| **2️⃣ Cài đặt các gói cần thiết** | Chạy lệnh:  `bash npm install @nestjs/passport passport passport-local @nestjs/jwt passport-jwt`   và types tương ứng (`@types/passport-jwt`, `@types/passport-local`). | Cài tất cả dependency để NestJS có thể tích hợp với Passport và JWT. |
| **3️⃣ Tạo module Auth** | Sử dụng CLI: `nest generate module auth`  → rồi tạo thêm controller và service tương ứng (`auth.controller.ts`, `auth.service.ts`). | Tách logic xác thực riêng vào **auth module**, giúp tổ chức code rõ ràng và tái sử dụng được. |
| **4️⃣ Tạo strategy đầu tiên – Local Strategy** | Tạo thư mục `strategies/` và file `local.strategy.ts`. Class `LocalStrategy` extends `PassportStrategy(Strategy)` từ `passport-local`. | Local strategy nhận **email và password** từ request login, kiểm tra hợp lệ và trả về user. |
| **5️⃣ Override usernameField** | Trong constructor của `LocalStrategy`, gọi `super({ usernameField: 'email' })`. | Mặc định Passport dùng `username`, ta đổi thành `email` để khớp với dữ liệu của mình. |
| **6️⃣ Viết hàm `validate()`** | Passport sẽ tự động gọi `validate(username, password)` khi có request. | Nhiệm vụ của `validate()` là xác thực credentials: kiểm tra email có tồn tại, và password có khớp không. |
| **7️⃣ Tạo hàm `verifyUser()` trong `AuthService`** | Trong `AuthService`, thêm `async verifyUser(email, password)`. Gọi `userService.getUser({ email })` và so sánh mật khẩu bằng `bcrypt.compare()`. | Xử lý xác thực thực tế – nếu user không tồn tại hoặc mật khẩu sai → ném lỗi `UnauthorizedException`. |
| **8️⃣ Thêm hàm `getUser()` trong `UserService`** | `async getUser(where: Prisma.UserWhereUniqueInput)` → dùng `prisma.user.findUniqueOrThrow({ where })`. | Cho phép lấy user theo email từ DB. Giúp `AuthService` có thể xác minh user tồn tại. |
| **9️⃣ Xuất `UserService` từ `UserModule` và import vào `AuthModule`** | Trong `user.module.ts`, thêm `exports: [UserService]`. Trong `auth.module.ts`, import `UserModule`. | Để `AuthService` có thể inject `UserService` và gọi hàm `getUser()`. |
| **🔟 Bổ sung logic bcrypt compare và lỗi Unauthorized** | Nếu `bcrypt.compare()` trả về `false` → ném lỗi `UnauthorizedException('Credentials are not valid')`. | Tăng tính bảo mật: không nói rõ “email sai” hay “password sai”. |
| **11️⃣ Kết nối LocalStrategy và AuthService** | Trong `LocalStrategy.validate()`, gọi `this.authService.verifyUser(email, password)` và return user nếu hợp lệ. | Trả về user object. Passport sẽ tự động gắn user này vào `req.user`. |
| **12️⃣ Đăng ký LocalStrategy trong `AuthModule`** | Thêm vào `providers: [AuthService, LocalStrategy]`. | Để NestJS biết LocalStrategy là injectable provider. |
| **13️⃣ Tạo `LocalAuthGuard` trong thư mục `guards/`** | Class `LocalAuthGuard` extends `AuthGuard('local')`. | “Guard” giúp áp dụng strategy vào route – nó tự kích hoạt validate() trước khi controller chạy. |
| **14️⃣ Sử dụng guard trong `AuthController`** | `ts @Post('login') @UseGuards(LocalAuthGuard) login() { ... }` | Khi POST `/auth/login`, guard chạy validate(), xác thực user, rồi controller mới được chạy. |
| **15️⃣ Test bằng Postman** | - Gửi POST `/users` để tạo user mới.- Gửi POST `/auth/login` với email/password. | Kiểm tra flow hoạt động: trả về 201 khi login đúng, 401 khi sai. |
| **16️⃣ Kiểm thử lỗi** | Thử email không tồn tại, hoặc sai mật khẩu. | Đều trả về `401 Unauthorized`, chứng minh guard hoạt động đúng. |
| **17️⃣ Chuẩn bị cho phần JWT** | Kết luận: local strategy đã chạy ok → tiếp theo sẽ cài đặt JWT để tạo và xác thực token. | JWT sẽ giúp lưu trạng thái đăng nhập giữa các request, không cần gửi lại mật khẩu. |

---

## 🧠 Tổng quan luồng xử lý sau khi hoàn thành phần này

```
POST /auth/login
       ↓
LocalAuthGuard  (kích hoạt Passport LocalStrategy)
       ↓
LocalStrategy.validate(email, password)
       ↓
AuthService.verifyUser(email, password)
       ↓
UserService.getUser({ email })
       ↓
bcrypt.compare()
       ↓
✅ Nếu hợp lệ → trả về user (được gắn vào req.user)
❌ Nếu sai → UnauthorizedException (401)

```

---

## ✅ Kết quả sau phần video này

- Đã có **đăng nhập bằng email/password hoạt động**.
- Dữ liệu kiểm tra qua database, có hash password.
- Có guard (`LocalAuthGuard`) bảo vệ route login.
- Chuẩn bị sang phần 2: **tạo JWT và xác thực token cho các request tiếp theo**.

