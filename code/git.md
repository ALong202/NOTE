# Lệnh git

## Tạo nhánh mới
```js
git checkout -b UI-Auth-Middleware
```
## Làm code, rồi commit
```
git add .
git commit -m "UI auth middleware"
```
## Push nhánh đó lên GitHub
```
git push -u origin UI-Auth-Middleware
```
## (Khi hoàn tất, merge vào main)
```
git checkout main
git merge UI-Auth-Middleware
git push origin main
```

## Xem tất cả nhánh local
```
git branch
```

Ví dụ kết quả:
```
* main
  UI-Auth-Middleware
  feature/login
```

* là nhánh bạn đang đứng (hiện tại).

Các nhánh khác là nhánh local có trong máy bạn.

##  Xem tất cả nhánh trên remote (GitHub)
```
git branch -r
```

Ví dụ:
```
origin/HEAD -> origin/main
origin/main
origin/UI-Auth-Middleware
```
##  Xem cả local và remote
```
git branch -a
```

Ví dụ:
```
* main
  UI-Auth-Middleware
  remotes/origin/main
  remotes/origin/UI-Auth-Middleware
```
##  (Tuỳ chọn) Làm mới danh sách nhánh từ GitHub

Nếu bạn muốn đảm bảo danh sách remote là mới nhất:
```
git fetch --all --prune
```

## Xóa các file và thư mục thừa ở root
rm -rf node_modules package.json package-lock.json
