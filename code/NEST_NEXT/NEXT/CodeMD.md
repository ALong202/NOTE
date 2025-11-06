# H1 — Tiêu đề lớn
## H2 — Tiêu đề vừa
### H3 — Tiêu đề nhỏ

**In đậm** và *in nghiêng* và ~~gạch ngang~~.
 
---

`inline code` — đoạn code ngắn trong dòng.

> Blockquote — trích dẫn, có thể nhiều dòng
> 
> - và list trong blockquote

---

### Ô chứa code (code block)

1. Cách phổ biến — fenced code block (gợi ý ngôn ngữ để có highlight)
```javascript
// Đây là ô code (fenced) — có highlight khi để "javascript"
function add(a, b) {
  return a + b;
}
```
Cách indent 4 spaces (ít dùng hơn):
def hello():
print("Hello")


Inline code: const x = 1;



Link và hình ảnh
Link tới Google
Tạo link nội bộ (markdown link to file)

(Thêm ?raw=true nếu cần show trên một số platform)

Bảng (table)
NameTypeGhi chúvscodeeditordùng cho code + notenotionweb appđẹp, nhưng nặng hơn

Task list (checklist)


 Viết cấu trúc thư mục


 Đồng bộ với git


 Thêm badge/status



Tiêu đề nhỏ / anchor (tạo anchor bằng HTML id)
Một tiêu đề {#my-anchor}
Bạn có thể link tới #my-anchor trong cùng file (tùy renderer hỗ trợ).

Collapsible (cần hỗ trợ HTML)
<details>
  <summary>Nhấn để mở / đóng</summary>
Nội dung ẩn, có thể chứa code:
echo "hello"

</details>

Căn giữa (markdown không chuẩn — dùng HTML)
<div align="center">
Nội dung căn giữa
<img> cũng có thể đặt ở đây
</div>

Mermaid (diagram) — nếu renderer hỗ trợ (vscode: cần extension)
graph TD
  A --> B
  B --> C
  C --> A

Math / LaTeX (nếu renderer hỗ trợ)
Inline: $E = mc^2$
Block:
∫01x2dx=13\int_0^1 x^2 dx = \frac{1}{3}∫01​x2dx=31​

Footnote (nếu renderer hỗ trợ)
Đây là chú thích.1

---

Nếu bạn muốn, mình có thể:
- Tạo **template `.md`** cho workspace note (README, TOC, templates folder).
- Viết sẵn **snippet** cho VS Code (ví dụ: gõ `mdcode` -> chèn fenced block).
- Hoặc xuất thành một file `notes-template.zip` để bạn tải.

Bạn muốn mình làm tiếp phần nào?

Footnotes


Nội dung chú thích. ↩



