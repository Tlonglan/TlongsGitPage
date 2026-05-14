document.addEventListener('DOMContentLoaded', function () {
  const BUTTON_ICON = '☰';
  const CLOSE_ICON = '✕';

  // 1. 尝试从原生 TOC 克隆（保留该功能）
  let tocList = null;
  const nativeTocNav = document.querySelector('.hextra-toc');
  if (nativeTocNav) {
    const nativeTocUl = nativeTocNav.querySelector('ul');
    if (nativeTocUl && nativeTocUl.children.length > 0) {
      tocList = nativeTocUl.cloneNode(true);
    }
  }

  // 2. 如果没有可用的原生目录，则从页面标题动态生成
  if (!tocList) {
    const headings = document.querySelectorAll('h2, h3, h4, h5, h6');
    if (headings.length === 0) return; // 完全没有标题，不创建按钮

    tocList = document.createElement('ul');
    headings.forEach(heading => {
      const text = heading.textContent.trim();
      if (!text) return; // 跳过空标题

      let id = heading.id;
      if (!id) {
        // 如果标题没有 id，自动生成一个基于内容的 id
        id = text
          .replace(/\s+/g, '-')
          .replace(/[^\w\u4e00-\u9fff-]/g, '') // 保留字母、数字、汉字和连字符
          .toLowerCase();
        // 兜底：若生成后为空，用随机数
        if (!id) id = 'heading-' + Math.random().toString(36).substr(2, 9);
        heading.id = id; // 把生成的 id 赋给标题元素，确保锚点跳转有效
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

    // 如果过滤后一个有效标题都没有，就不创建按钮
    if (tocList.children.length === 0) return;
  }

  // 3. 创建 UI（遮罩、面板、按钮）
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

  // 窗口大小变化时，若原生 TOC 重新出现（桌面端），自动关闭悬浮面板
  window.addEventListener('resize', () => {
    if (nativeTocNav && nativeTocNav.offsetParent !== null) {
      hideTOC();
    }
  });
});