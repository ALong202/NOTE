# Callback

Callback là một khái niệm không mới. Tuy nhiên, nó là một trong những khái niệm khá lằng ngoằng và dễ nhầm lẫn trong lập trình. Mình xin giới thiệu callback trong JavaScript. Lý do chọn JavaScript là vì callback trong JavaScript là đơn giản, dễ hiểu nhất. Bài viết nhắm tới đối tượng là các bạn beginner nên mình sẽ cố gắng viết đơn giản nhất có thể.

---

## **Callback là gì**

Nói một cách đơn giản: **Callback** là một **function sẽ được thực thi sau khi một function khác đã được thực thi xong** — do đó nó có tên là *callback* (“gọi lại”).

Nói một cách phức tạp hơn: trong JavaScript, **functions là objects**, do đó **nó có thể nhận tham số là function**, và cũng có thể **trả về một function**.  
Vì vậy, bất cứ function nào được truyền vào như một tham số và được gọi sau đó sẽ có tên là **callback function**.

---

## **Tại sao lại cần callbacks**

Lý do rất quan trọng là bởi vì **JavaScript là một ngôn ngữ bất đồng bộ (asynchronous)**.  
Mỗi lần thực thi, thay vì chờ đợi phản hồi, JavaScript sẽ tiếp tục thực thi các lệnh tiếp theo, đồng thời chờ đợi phản hồi từ các sự kiện khác.

Ví dụ:

```javascript
function first() {
  console.log(1);
}
function second() {
  console.log(2);
}
first();
second();
```

Kết quả:

```
// 1
// 2
```

Tất cả đều đúng như mong muốn — `first` chạy trước, `second` chạy sau.  
Nhưng nếu `first()` phải thực hiện một tác vụ **mất thời gian** (ví dụ gọi API), thì sao?

Mô phỏng bằng `setTimeout`:

```javascript
function first() {
  // Simulate a code delay
  setTimeout(function () {
    console.log(1);
  }, 500);
}
function second() {
  console.log(2);
}
first();
second();
```

Kết quả:

```
// 2
// 1
```

🧠 Mặc dù ta gọi `first()` trước, nhưng kết quả `2` lại xuất hiện trước `1`.  
JavaScript **không chờ** `first()` chạy xong — mà **chạy tiếp** `second()` ngay lập tức.

👉 Để đảm bảo code thực thi **đúng thứ tự**, ta cần dùng **callback function**.

---

## **Tạo một Callback**

Mở Chrome Developer Console (Windows: `Ctrl + Shift + J`, Mac: `Cmd + Option + J`), nhập:

```javascript
function doHomework(subject) {
  alert(`Starting my ${subject} homework.`);
}
```

Gọi hàm:

```javascript
doHomework("math");
// Alerts: Starting my math homework.
```

Giờ thêm **callback** vào làm tham số thứ 2:

```javascript
function doHomework(subject, callback) {
  alert(`Starting my ${subject} homework.`);
  callback();
}

doHomework("math", function () {
  alert("Finished my homework");
});
```

Kết quả:

```
Starting my math homework.
Finished my homework.
```

Callback function cũng có thể được định nghĩa riêng:

```javascript
function doHomework(subject, callback) {
  alert(`Starting my ${subject} homework.`);
  callback();
}

function alertFinished() {
  alert("Finished my homework");
}

doHomework("math", alertFinished);
```

Kết quả tương tự — chỉ khác cách tổ chức code.

---

## **Multiple Callback Functions**

Bạn có thể tạo ra một hàm có **nhiều callback** bằng cách truyền nhiều tham số function.  
Ví dụ với **jQuery AJAX**:

```javascript
function successCallback() {
  // Do something
}

function completeCallback() {
  // Do something
}

function errorCallback() {
  // Do something
}

$.ajax({
  url: "google.com",
  success: successCallback,
  complete: completeCallback,
  error: errorCallback,
});
```

---

## **Một vài lưu ý**

### ⚠️ 1. Callback phải là function
Nếu bạn truyền vào kiểu khác (ví dụ string, number, …), JavaScript sẽ báo lỗi:  
`TypeError: callback is not a function`.

### ⚙️ 2. Từ khóa `this` trong callback
Callback là **một hàm bình thường**, nên trong nó, `this` **không trỏ về object gốc** mà sẽ trỏ về **`window`** (trong trình duyệt).  

Ví dụ:

```javascript
const obj = {
  value: 10,
  logValue: function () {
    setTimeout(function () {
      console.log(this.value);
    }, 1000);
  },
};

obj.logValue(); // undefined
```

Vì `this` trong callback trỏ về `window`, không phải `obj`.

✅ Cách khắc phục:

- Dùng arrow function (arrow function không tạo scope riêng cho `this`):

```javascript
const obj = {
  value: 10,
  logValue: function () {
    setTimeout(() => {
      console.log(this.value);
    }, 1000);
  },
};

obj.logValue(); // 10
```
