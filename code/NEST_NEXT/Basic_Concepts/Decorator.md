# 🧩 Decorator trong NestJS

**Decorator** là một *hàm đặc biệt* được dùng để **đánh dấu (annotate)** vào **class**, **phương thức**, **property** hoặc **parameter**  
nhằm **thêm metadata** hoặc **thay đổi hành vi** của chúng.

---

## 📘 Trong NestJS

Decorators được dùng để định nghĩa:

- Route (`@Controller`, `@Get`, `@Post`, …)
- Middleware
- Dependency Injection (`@Injectable`, `@Inject`, …)
- Validation (`@Body`, `@Param`, …)

---

### 🧱 Cú pháp tổng quát

```typescript
@TênDecorator()
```
