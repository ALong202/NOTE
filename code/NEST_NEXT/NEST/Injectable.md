# Injectable()

## “DI” nghĩa là gì?

**DI = Dependency Injection**

→ Dịch nôm na là: **"Tiêm phụ thuộc"**.

### 💬 Giải thích đơn giản:

- Khi một class cần dùng đến “một class khác”, thay vì **tự mình tạo mới**, nó **được NestJS tiêm sẵn** cho.
- Nhờ vậy code của bạn **đỡ phụ thuộc cứng**, dễ **test**, **thay đổi**, và **mở rộng**.

---

### 🔧 Ví dụ:

Không dùng DI:

```tsx
class UsersService {
  private db = new DatabaseService(); // 👈 Tự tạo ra

  getUsers() {
    return this.db.query('SELECT * FROM users');
  }
}

```

Nếu sau này bạn đổi sang `MongoService`, bạn phải sửa code bên trong class này.

---

Dùng DI (cách của NestJS):

```tsx
@Injectable()
class UsersService {
  constructor(private db: DatabaseService) {} // 👈 Được “tiêm” vào
}

```


→ NestJS sẽ **tự tạo** (hoặc tái sử dụng) 1 instance `DatabaseService` và **truyền vào** constructor này cho bạn.

Bạn **không cần new** bằng tay nữa.

## “DI Container” là gì?

DI Container (hay còn gọi là **IoC Container** – *Inversion of Control Container*)

👉 là **“bộ quản lý tất cả các đối tượng” (provider)** mà NestJS có thể tiêm vào.

Bạn có thể tưởng tượng nó như **một cái kho chứa các dịch vụ (Service)**.

Mỗi khi bạn cần dùng, NestJS **tra trong kho**, thấy có thì lấy ra dùng, chưa có thì **tạo mới** rồi lưu lại.


---

### 📦 Minh họa:

Giả sử bạn có các class:

```tsx
ConfigService
DatabaseService
LoggerService
UserService

```

→ NestJS sẽ **đăng ký tất cả vào DI Container**.

Bạn chỉ cần ghi trong class khác:

```tsx
constructor(private config: ConfigService, private logger: LoggerService) {}

```

→ NestJS sẽ:

1. Mở “kho DI Container”.
2. Thấy `ConfigService` và `LoggerService` đã có.
3. Lấy ra, **tiêm vào constructor** cho bạn.

Bạn **không cần tự new, không cần biết cách tạo**, chỉ việc **xài** 😄


## Sơ đồ dòng chảy của `@Injectable()` trong NestJS
```
+----------------------------+
|        bootstrap()         |      ← index.ts khởi chạy app
|  (NestFactory.create(...)) |
+-------------+--------------+
              |
              v
+----------------------------+
|        AppModule           |      ← định nghĩa root module
|  imports, controllers,     |
|  providers: [AppService]   |
+-------------+--------------+
              |
              v
+----------------------------+
|  Dependency Injection      |      ← NestJS tạo “DI Container”
|  Container (IOC Container) |
+-------------+--------------+
              |
              quét decorator
              ↓          ↓
+-----------------+ +-----------------+
|  @Controller()  | |  @Injectable()  |      ← AppController / AppService
|  AppController  | |  AppService     |
+-----------------+ +-----------------+
        |                  |
        | inject AppService|
        v                  |
+-----------------------------------+
|  AppController(appService)        |
|  this.appService.getHello()       |
+-----------------------------------+
|
```
