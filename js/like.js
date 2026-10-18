/* ============================================================
   文章点赞（本地版）— 每篇文章独立计数，localStorage 记状态
   点赞 +1 / 再点取消，刷新不丢；跨设备不共享（静态站无后端）
   ============================================================ */
(function () {
  if (window.__blogLikeLoaded) return;
  window.__blogLikeLoaded = true;

  // 只在文章页挂载
  var container = document.getElementById('article-container');
  var postBox = document.getElementById('post');
  if (!container || !postBox) return;

  var key = 'blog-like:' + location.pathname;
  var liked = false;
  var count = 0;
  try {
    liked = localStorage.getItem(key + ':liked') === '1';
    count = parseInt(localStorage.getItem(key + ':count') || '0', 10) || 0;
  } catch (e) {}

  var box = document.createElement('div');
  box.id = 'blog-like';
  box.innerHTML =
    '<button class="like-btn" aria-label="点赞">' +
    '<span class="like-heart">♡</span>' +
    '<span class="like-text">点赞</span>' +
    '<span class="like-count">0</span>' +
    '</button>' +
    '<div class="like-hint">喜欢就点个赞吧～</div>';

  // 插到版权卡片之前，没有则插到文章容器之后
  var copyright = postBox.querySelector('.post-copyright');
  if (copyright) copyright.parentNode.insertBefore(box, copyright);
  else container.parentNode.insertBefore(box, container.nextSibling);

  var btn = box.querySelector('.like-btn');
  var heart = box.querySelector('.like-heart');
  var countEl = box.querySelector('.like-count');

  function render() {
    countEl.textContent = count;
    btn.classList.toggle('liked', liked);
    heart.textContent = liked ? '♥' : '♡';
    box.querySelector('.like-text').textContent = liked ? '已赞' : '点赞';
  }

  btn.addEventListener('click', function () {
    liked = !liked;
    count += liked ? 1 : -1;
    if (count < 0) count = 0;
    try {
      localStorage.setItem(key + ':liked', liked ? '1' : '0');
      localStorage.setItem(key + ':count', String(count));
    } catch (e) {}
    render();
    // 点赞瞬间的心跳动画
    btn.classList.remove('pop');
    void btn.offsetWidth;
    btn.classList.add('pop');
  });

  render();
})();
