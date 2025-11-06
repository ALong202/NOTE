# Lifecycle Hook là gì?

“Lifecycle Hook” (Hook vòng đời) là **hàm đặc biệt** mà NestJS tự gọi ở **một thời điểm cụ thể trong vòng đời của module hoặc service**.

Ví dụ:

- `onModuleInit()` → chạy **khi module khởi tạo xong**
- `onModuleDestroy()` → chạy **khi module bị hủy**
- `beforeApplicationShutdown()` → chạy **trước khi app tắt**

### Trong PrismaService:

```tsx
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}

```

➡️ Khi app NestJS khởi động, NestJS tự gọi `onModuleInit()`.

Ta dùng nó để:

- Kết nối sớm tới database.
- Kiểm tra DB connection trước khi xử lý request đầu tiên.

Nếu không có hàm này, Prisma vẫn **kết nối “lazy”** (khi query đầu tiên chạy), nhưng ta chủ động kết nối sớm cho an toàn hơn.