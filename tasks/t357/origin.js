// Builds a tree structure from a list of pages, organizing them into folders and pages. Generated with ChatGPT because I was too lazy to bother writing my own.

// 将一个平面的页面（或文件夹）数组转换为具有层级结构的树形数据结构
export default function (pages) {
  const map = new Map();
  const tree = [];

  // Initialize map with each page and prepare a items array
  pages.forEach((page) => {
    map.set(page.id, { ...page, items: [] });
  });

  // Populate tree structure
  pages.forEach((page) => {
    if (page.parentFolder) {
      // Attach page to its parent's items array
      const parent = map.get(page.parentFolder);
      if (parent) {
        parent.items.push(map.get(page.id));
      }
    } else {
      // Root level pages (no parent)
      tree.push(map.get(page.id));
    }
  });

  return tree;
}