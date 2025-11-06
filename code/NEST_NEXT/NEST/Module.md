# Cấu trúc 1 module hoàn chỉnh trong NestJS

Khi bạn chạy:

```bash
nest generate module users
nest generate service users
nest generate controller users

```

NestJS sẽ tạo ra cấu trúc như sau:

```js
src/
└── users/
    ├── users.controller.ts   👈 Xử lý request/response
    ├── users.service.ts      👈 Xử lý logic nghiệp vụ
    ├── users.module.ts       👈 Đăng ký & liên kết các thành phần
    └── dto/                  👈 (Thư mục tuỳ chọn) chứa các file DTO
        └── create-user.dto.ts

```

---

## 🔹 Giải thích từng phần chi tiết:

### 1. **`users.module.ts` — module định nghĩa phạm vi**

```tsx
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],  // Controller mà module này cung cấp
  providers: [UsersService],       // Service mà module này quản lý
  exports: [UsersService],         // (tuỳ chọn) Cho phép module khác dùng service này
})
export class UsersModule {}

```

👉 `@Module()` giống như “**hộp chứa**” gom controller + service liên quan.

Nếu bạn có `AppModule`, nó sẽ `import` `UsersModule` vào.

---

### 2. **`users.controller.ts` — xử lý request từ client**

```tsx
import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
}

```

✅ Vai trò:

- Nhận **HTTP request** (POST, GET, PUT, DELETE…)
- Gọi **service** để xử lý logic
- Trả về **response JSON** cho client

---

### 3. **`users.service.ts` — xử lý nghiệp vụ (business logic)**

```tsx
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users = [];

  createUser(dto: CreateUserDto) {
    this.users.push(dto);
    return { message: 'User created', user: dto };
  }

  getAllUsers() {
    return this.users;
  }
}

```

✅ Vai trò:

- Thực hiện **logic nghiệp vụ thật sự**
- Làm việc với **database, API, file, cache…**
- Được **inject vào controller** qua `constructor()`

---

### 4. **(Tuỳ chọn) `dto/` — định nghĩa dữ liệu đầu vào**

```tsx
export class CreateUserDto {
  name: string;
  email: string;
}

```

✅ Vai trò:

- Mô tả và validate dữ liệu đầu vào (`body`, `query`, `params`)
- Giúp code dễ hiểu, dễ kiểm soát hơn

---

## 🧠 Tóm gọn mô hình:

| Thành phần | Decorator | Vai trò chính |
| --- | --- | --- |
| **Module** | `@Module()` | Gom nhóm Controller + Service liên quan |
| **Controller** | `@Controller()` | Nhận request, trả response |
| **Service** | `@Injectable()` | Xử lý logic nghiệp vụ, có thể được inject |
| **DTO** | *(class thường)* | Định nghĩa & validate dữ liệu đầu vào |

---

## 🔁 Mối quan hệ tổng quát:

```
Client → Controller → Service → (DB hoặc API)
           ↑             ↓
          DTO         @Injectable()
           ↓
        Module quản lý tất cả

```