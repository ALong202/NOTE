# prisma generate
```JS
┌──────────────────────────────────────────────┐
│             prisma/schema.prisma             │
│----------------------------------------------│
│ model User {                                 │
│   id        Int @id @default(autoincrement())│
│   email     String @unique                   │
│   password  String                           │
│ }                                            │
└──────────────────────────────────────────────┘
                      │
                      ▼
                      💡 prisma generate (build time)
                      │
                      ▼
┌──────────────────────────────────────────────┐
│        node_modules/@prisma/client           │
│----------------------------------------------│
│ class PrismaClient {                         │
│   user: { findMany(), create(), ... }        │
│ }                                            │
│export type User = { id: number; email: ... } │
└──────────────────────────────────────────────┘
                      │
                      ▼
┌──────────────────────────────────────────────┐
│               app.service.ts                 │
│----------------------------------------------│
│ import { PrismaClient } from '@prisma/client'│
│ const prisma = new PrismaClient()            │
│ await prisma.user.create({ data: {...} })    │
└──────────────────────────────────────────────┘
                      │
                      ▼
┌──────────────────────────────────────────────┐
│               PostgreSQL / MySQL DB          │
│  Table: User                                 │
│  Columns: id | email | password              │
└──────────────────────────────────────────────┘
```
### 🔧 Bước 1: Bạn định nghĩa schema riêng

`prisma/schema.prisma`

```
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
}

```

---

### 🏗️ Bước 2: Bạn chạy:

```bash
pnpm prisma generate

```

→ Prisma sẽ sinh ra code trong:

```
node_modules/@prisma/client

```

Bên trong có:

- Class `PrismaClient`
- Types cho `User`, `Post`, v.v.
- Toàn bộ hàm query (CRUD, filter, relation…)

---

### ⚡ Bước 3: Dùng Prisma Client để query

```tsx
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

await prisma.user.create({
  data: { email: 'a@b.com', password: '123' },
});

```

> 👉 Ở đây, prisma.user xuất hiện được nhờ Prisma Client sinh ra từ lệnh prisma generate.
