const fs = require("fs");
const path = require("path");

const rootDir = __dirname;
const outputFile = path.join(rootDir, "index.md");

const ignoreDirs = [".git", ".vscode", "node_modules", ".idea", ".obsidian"];

// 🔹 Lấy tiêu đề từ file markdown
function getTitle(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const match = content.match(/^#\s+(.*)/m);
    if (match) return match[1].trim();
  } catch {
    /* bỏ qua lỗi đọc */
  }
  return path.basename(filePath, ".md");
}

// 🔹 Duyệt thư mục và tạo cây
function buildTree(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  const result = [];

  for (const item of items) {
    if (ignoreDirs.includes(item.name)) continue;

    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      result.push({
        type: "dir",
        name: item.name,
        children: buildTree(fullPath),
      });
    } else if (
      item.isFile() &&
      item.name.endsWith(".md") &&
      item.name !== "index.md"
    ) {
      result.push({
        type: "file",
        name: item.name,
        title: getTitle(fullPath),
        path: path.relative(rootDir, fullPath).replace(/\\/g, "/"),
      });
    }
  }

  // Sắp xếp: thư mục trước, file sau
  result.sort((a, b) => {
    if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
    return a.name.localeCompare(b.name, "en", { numeric: true });
  });

  return result;
}



// 🔹 Render Markdown dạng notebook (vẫn có <details>)
function renderTree(nodes, depth = 0) {
  const lines = [];
  const indent = "  ".repeat(depth);

  const sectionIcons = ["📘", "📗", "📙", "📒", "📔"];
  const fileIcon = "🪶";

  for (const node of nodes) {
    if (node.type === "dir") {
      const icon = sectionIcons[Math.min(depth, sectionIcons.length - 1)];
      const hasSubdir = node.children.some((c) => c.type === "dir");

      // Nếu là thư mục cấp 0 (cùng cấp code, Other, …)
      if (depth === 0) {
        lines.push(` ${icon} **${node.name}**`);
        lines.push(renderTree(node.children, depth + 1));
        continue;
      }

      // Nếu thư mục chỉ có file con → dùng <details> để ẩn/hiện
      if (!hasSubdir) {
        lines.push(`${indent}<details markdown="1">`);
        lines.push(`${indent}  <summary>${icon} ${node.name}</summary>\n`);
        lines.push(renderTree(node.children, depth + 1));
        lines.push(`${indent}</details>`);
      } else {
        // Nếu có thư mục con → hiển thị dạng danh mục
        lines.push(`${indent}- ${icon} **${node.name}**`);
        lines.push(renderTree(node.children, depth + 1));
      }
    } else if (node.type === "file") {
      lines.push(`${indent}- ${fileIcon} [${node.title}](<./${node.path}>)`);

    }
  }

  return lines.join("\n");
}

// 🔹 Chỉ lấy các thư mục cấp 1 (loại trừ file lẻ)
const topLevelDirs = fs
  .readdirSync(rootDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !ignoreDirs.includes(d.name))
  .map((d) => d.name);

// 🔹 Tạo Markdown cho từng thư mục cấp 1
let content = `# 📚 Notebook Index

> *Tổng hợp các ghi chú học tập và tài liệu tham khảo.*  

---

`;

for (const dir of topLevelDirs) {
  const dirTree = buildTree(path.join(rootDir, dir));
  content += `- 📘 **${dir}**\n`;
  content += renderTree(dirTree, 1);
  content += "\n";
}

content += `
---

🕓 *Cập nhật: ${new Date().toLocaleTimeString(
  "vi-VN"
)} ${new Date().toLocaleDateString("vi-VN")}*
`;

fs.writeFileSync(outputFile, content, "utf8");
console.log(
  "✅ Đã tạo/cập nhật index.md với giao diện note style đẹp và đồng nhất."
);
