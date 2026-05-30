document.addEventListener('DOMContentLoaded', function () {
  const BUTTON_ICON = '☰';
  const CLOSE_ICON = '✕';

  // === 新增：读取页面元信息 ===
  const pageKind = document.querySelector('meta[name="hextra-page-kind"]')?.content;
  const pageType = document.querySelector('meta[name="hextra-page-type"]')?.content;
  const pageTocParam = document.querySelector('meta[name="hextra-page-toc"]')?.content;

  // === 规则：主页完全禁止 ===
  if (pageKind === 'home') return;

  // === 规则：索引页（directory-list）根据 toc 参数决定 ===
  if (pageType === 'directory-list') {
    // 只有 frontmatter 显式设置了 toc: true 时才显示
    if (pageTocParam !== 'true') return;
  }

  // === 其他页面（docs、blog等）：若 toc 为 false 则隐藏 ===
  if (pageTocParam === 'false') return;

  // 1. 尝试从原生 TOC 克隆
  let tocList = null;
  const nativeTocNav = document.querySelector('.hextra-toc');
  if (nativeTocNav) {
    const nativeTocUl = nativeTocNav.querySelector('ul');
    if (nativeTocUl && nativeTocUl.children.length > 0) {
      tocList = nativeTocUl.cloneNode(true);
    }
  }

  // 2. 如果没有原生目录，则从页面标题动态生成
  if (!tocList) {
    const headings = document.querySelectorAll('h2, h3, h4, h5, h6');
    if (headings.length === 0) return;

    tocList = document.createElement('ul');
    headings.forEach(heading => {
      const text = heading.textContent.trim();
      if (!text) return;

      let id = heading.id;
      if (!id) {
        id = text
          .replace(/\s+/g, '-')
          .replace(/[^\w\u4e00-\u9fff-]/g, '')
          .toLowerCase();
        if (!id) id = 'heading-' + Math.random().toString(36).substr(2, 9);
        heading.id = id;
      }

      const level = parseInt(heading.tagName.substring(1));
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${id}`;
      a.textContent = text;
      li.style.paddingLeft = `${(level - 2) * 12}px`;
      li.appendChild(a);
      tocList.appendChild(li);
    });

    if (tocList.children.length === 0) return;
  }

  // 3. 创建 UI
  const overlay = document.createElement('div');
  overlay.className = 'fab-toc-overlay';

  const tocContainer = document.createElement('div');
  tocContainer.className = 'fab-toc-container';
  tocContainer.innerHTML = `
    <div class="fab-toc-header">
      <span>目录</span>
      <button id="fab-toc-close" class="fab-toc-close-btn">${CLOSE_ICON}</button>
    </div>
  `;
  tocContainer.appendChild(tocList);

  const fab = document.createElement('button');
  fab.className = 'fab-toc-main-btn';
  fab.innerHTML = BUTTON_ICON;

  document.body.appendChild(overlay);
  document.body.appendChild(tocContainer);
  document.body.appendChild(fab);

  // 4. 交互逻辑
  const showTOC = () => {
    tocContainer.classList.add('is-visible');
    overlay.classList.add('is-visible');
    fab.innerHTML = CLOSE_ICON;
    document.body.style.overflow = 'hidden';
  };
  const hideTOC = () => {
    tocContainer.classList.remove('is-visible');
    overlay.classList.remove('is-visible');
    fab.innerHTML = BUTTON_ICON;
    document.body.style.overflow = '';
  };

  fab.addEventListener('click', (e) => {
    e.stopPropagation();
    tocContainer.classList.contains('is-visible') ? hideTOC() : showTOC();
  });
  overlay.addEventListener('click', hideTOC);
  const closeBtn = tocContainer.querySelector('#fab-toc-close');
  if (closeBtn) closeBtn.addEventListener('click', hideTOC);

  tocList.addEventListener('click', (e) => {
    if (e.target.closest('a')) setTimeout(hideTOC, 100);
  });

  window.addEventListener('resize', () => {
    if (nativeTocNav && nativeTocNav.offsetParent !== null) {
      hideTOC();
    }
  });
});