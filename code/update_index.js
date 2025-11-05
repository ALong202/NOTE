const fs = require("fs");
const path = require("path");

const root = ".";
const output = path.join(root, "index.md");

// Hàm đệ quy lấy tất cả file .md (trừ index.md)
function walk(dir, prefix = "") {
  const files = fs.readdirSync(dir);
  let list = [];
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      list = list.concat(walk(fullPath, path.join(prefix, file)));
    } else if (file.endsWith(".md") && file !== "index.md") {
      list.push(path.join(prefix, file));
    }
  }
  return list;
}

// Lấy tiêu đề H1 của file, nếu không có thì dùng tên file
function getTitle(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const match = content.match(/^#\s+(.*)/m);
    if (match) return match[1].trim();
  } catch (err) {
    console.warn("⚠️ Không đọc được:", filePath);
  }
  return path.basename(filePath, ".md");
}

const files = walk(root);

// Khởi tạo nhóm
const groups = {
  BASIC_CONCEPTS: [],
  NESTJS: [],
  NEXTJS: [],
};

// Phân loại theo thư mục cha trực tiếp
for (const f of files) {
  const normPath = f.replace(/\\/g, "/");
  const title = getTitle(path.join(root, f));

  const parentDir = path
    .basename(path.dirname(path.join(root, f)))
    .toLowerCase();

  if (parentDir === "basic_concepts") {
    groups.BASIC_CONCEPTS.push({ path: normPath, title });
  } else if (parentDir === "nest") {
    groups.NESTJS.push({ path: normPath, title });
  } else if (parentDir === "next") {
    groups.NEXTJS.push({ path: normPath, title });
  }
}

// Tạo markdown
const lines = ["# 📚 Danh sách ghi chú\n"];

function renderGroup(name, items) {
  if (items.length === 0) return "";
  const groupName = name.replace("_", " ");
  const details = [
    `<details>`,
    `<summary><strong>${groupName}</strong></summary>\n`,
  ];
  for (const item of items) {
    details.push(`- [${item.title}](./${item.path})`);
  }
  details.push(`\n</details>\n`);
  return details.join("\n");
}

lines.push(renderGroup("BASIC_CONCEPTS", groups.BASIC_CONCEPTS));
lines.push(renderGroup("NESTJS", groups.NESTJS));
lines.push(renderGroup("NEXTJS", groups.NEXTJS));

// Ghi file
fs.writeFileSync(output, lines.join("\n"), "utf8");
console.log("✅ Đã tạo/cập nhật file index.md!");
