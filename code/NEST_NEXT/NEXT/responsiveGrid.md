# Grid Responsive 

## grid: `xs={12}`, `sm={6}`, `lg={4}`

Hệ thống grid của **Material UI (MUI)** hoặc **Tailwind / Bootstrap** đều dựa trên **12 cột trên 1 hàng**.

> Coi 1 hàng (row) = 12 cột (columns)
> 

---

### 🔹 `xs={12}` nghĩa là:

> Khi màn hình nhỏ (mobile) → phần tử chiếm 12/12 cột → trọn hàng
> 
> 
> → 👉 1 sản phẩm / hàng
> 

---

### 🔹 `sm={6}` nghĩa là:

> Khi màn hình trung bình (tablet) → phần tử chiếm 6/12 cột
> 
> 
> → 👉 12 ÷ 6 = 2 sản phẩm / hàng
> 

---

### 🔹 `lg={4}` nghĩa là:

> Khi màn hình lớn (desktop) → phần tử chiếm 4/12 cột
> 
> 
> → 👉 12 ÷ 4 = 3 sản phẩm / hàng
> 

---

### 💡 Hình dung dễ hiểu:

| Kích thước màn hình | prop dùng | số cột chiếm | số sản phẩm mỗi hàng |
| --- | --- | --- | --- |
| Mobile | xs={12} | 12/12 | 1 |
| Tablet | sm={6} | 6/12 | 2 |
| Desktop | lg={4} | 4/12 | 3 |

---

### 🔸 Ví dụ trực quan:

```tsx
<Grid container spacing={3}>
  <Grid item xs={12} sm={6} lg={4}>Sản phẩm 1</Grid>
  <Grid item xs={12} sm={6} lg={4}>Sản phẩm 2</Grid>
  <Grid item xs={12} sm={6} lg={4}>Sản phẩm 3</Grid>
</Grid>

```

- **Trên mobile:** mỗi `<Grid item>` chiếm hết hàng → 3 dòng
- **Trên tablet:** mỗi item chiếm nửa hàng → 2 item mỗi hàng
- **Trên desktop:** mỗi item chiếm 1/3 hàng → 3 item / hàng