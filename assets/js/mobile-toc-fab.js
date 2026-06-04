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
    // 立即将面板滚动到当前高亮项的位置
    updateActiveTocLink();
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






  // === 移动端悬浮目录高亮 ===
  function updateActiveTocLink() {
    const links = tocList.querySelectorAll('a');
    if (links.length === 0) return;

    // 获取所有 h2~h6 标题，并自动为缺少 id 的标题生成 id
    const headings = Array.from(document.querySelectorAll('h2, h3, h4, h5, h6'))
      .map(h => {
        if (!h.id) {
          let id = h.textContent.trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w\u4e00-\u9fff-]/g, '')
            .toLowerCase();
          if (!id) id = 'heading-' + Math.random().toString(36).substr(2, 9);
          h.id = id;
        }
        return h;
      })
      .filter(h => h.id);

    if (headings.length === 0) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    // 导航栏高度（可根据实际情况微调，Hextra 默认 ~64px）
    const navbarHeight = 64;
    // 视口高度的三分之一
    const viewportOffset = window.innerHeight / 3;
    const offset = navbarHeight + viewportOffset;


    let currentHeading = null;
    for (let i = headings.length - 1; i >= 0; i--) {
      if (headings[i].offsetTop <= scrollTop + offset) {
        currentHeading = headings[i];
        break;
      }
    }

    // 清除所有高亮
    links.forEach(link => link.classList.remove('fab-toc-active'));

    if (currentHeading) {
      // 先尝试直接匹配（未编码的 href）
      let activeLink = tocList.querySelector(`a[href="#${currentHeading.id}"]`);
      if (!activeLink) {
        // 若失败，遍历解码后比较
        for (const link of links) {
          const href = link.getAttribute('href');
          if (href) {
            const hash = href.substring(1);
            try {
              if (decodeURIComponent(hash) === currentHeading.id) {
                activeLink = link;
                break;
              }
            } catch (e) {
              if (hash === currentHeading.id) {
                activeLink = link;
                break;
              }
            }
          }
        }
      }
      if (activeLink) {
        activeLink.classList.add('fab-toc-active');

        if (tocContainer.classList.contains('is-visible')) {
          const linkRect = activeLink.getBoundingClientRect();
          const containerRect = tocContainer.getBoundingClientRect();
          // 计算链接在面板内容中的相对位置
          const linkTopRelative = linkRect.top - containerRect.top + tocContainer.scrollTop;
          // 目标滚动位置：使链接出现在面板高度的 1/4 处
          const targetScrollTop = linkTopRelative - tocContainer.clientHeight / 4;
          // 设置滚动，确保不超出内容范围
          tocContainer.scrollTop = Math.max(0, targetScrollTop);
        }
      }

    }
  }

  // 监听滚动事件（使用 requestAnimationFrame 节流）
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveTocLink();
        ticking = false;
      });
      ticking = true;
    }
  });

  // 初始执行一次
  updateActiveTocLink();



});


