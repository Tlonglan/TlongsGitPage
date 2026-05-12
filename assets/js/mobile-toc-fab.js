
document.addEventListener('DOMContentLoaded', function () {
    const BUTTON_ICON = '☰';
    const CLOSE_ICON = '✕';

    // 直接使用原生的 .hextra-toc ul
    const nativeTocNav = document.querySelector('.hextra-toc');
    if (!nativeTocNav) return;

    const nativeTocList = nativeTocNav.querySelector('ul');
    if (!nativeTocList || nativeTocList.children.length === 0) return;

    // 深克隆一份，避免操作原始 DOM 引发主题的异常
    const tocList = nativeTocList.cloneNode(true);

    // 创建遮罩和面板
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

    // 浮动按钮
    const fab = document.createElement('button');
    fab.className = 'fab-toc-main-btn';
    fab.innerHTML = BUTTON_ICON;

    document.body.appendChild(overlay);
    document.body.appendChild(tocContainer);
    document.body.appendChild(fab);

    // 交互逻辑
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

    // 点击目录链接后自动关闭
    tocList.addEventListener('click', (e) => {
        if (e.target.closest('a')) {
            setTimeout(hideTOC, 100);
        }
    });

    // 窗口大小变化时处理
    window.addEventListener('resize', () => {
        if (!isMobile()) {
            hideTOC();
            fab.style.display = 'none';
            overlay.style.display = 'none';
            tocContainer.style.display = 'none';
        } else {
            fab.style.display = 'flex';
        }
    });
});
