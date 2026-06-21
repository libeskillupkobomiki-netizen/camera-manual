/* ═══════════════════════════════════════════════
   tabs.js — タブ切り替え
   URLハッシュでタブ状態を保持する
═══════════════════════════════════════════════ */

(function () {
  'use strict';

  /* タブID一覧 */
  const TABS = [
    'digital-slr',    // ①デジタル一眼レフ
    'mirrorless',     // ②ミラーレス
    'prime',          // ③単焦点レンズ
    'standard-zoom',  // ④標準ズーム
    'tele-zoom',      // ⑤高倍率ズーム
    'compact',        // ⑥コンデジ
    'film-slr',       // ⑦フィルム一眼レフ
    'film-compact',   // ⑧フィルムコンパクト
    'mf-lens',        // ⑨マニュアルレンズ
  ];

  const DEFAULT_TAB = TABS[0];

  /**
   * ハッシュからタブIDを取得する
   * 存在しないIDの場合はデフォルトを返す
   */
  function getTabFromHash() {
    const hash = location.hash.replace('#', '');
    return TABS.includes(hash) ? hash : DEFAULT_TAB;
  }

  /**
   * 指定したタブをアクティブにする
   */
  function activateTab(tabId) {
    /* ボタン */
    document.querySelectorAll('.tab-bar button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    /* パネル */
    document.querySelectorAll('.tab-panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === tabId);
    });

    /* ページトップへスクロール（タブ切り替え時のみ） */
    const tabBar = document.querySelector('.tab-bar');
    if (tabBar) {
      const offset = document.querySelector('.site-header')?.offsetHeight || 0;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }

  /**
   * タブボタンのクリックイベント
   */
  function onTabClick(e) {
    const tabId = e.currentTarget.dataset.tab;
    if (!tabId) return;
    history.pushState(null, '', '#' + tabId);
    activateTab(tabId);
  }

  /**
   * ブラウザの戻る・進むボタン対応
   */
  window.addEventListener('popstate', () => {
    activateTab(getTabFromHash());
  });

  /**
   * 初期化
   */
  function init() {
    /* タブボタンにイベントを登録 */
    document.querySelectorAll('.tab-bar button').forEach(btn => {
      btn.addEventListener('click', onTabClick);
    });

    /* 現在のハッシュに応じてタブを表示 */
    activateTab(getTabFromHash());
  }

  /* DOMContentLoaded 後に初期化 */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
