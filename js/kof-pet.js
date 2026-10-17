/* ============================================================
   不知火舞 桌宠（KOF XIII 官方 sprite 版）
   点击说话 · 每第 5 次触发必杀彩蛋 · 闲置自言自语
   ============================================================ */
(function () {
  if (window.__kofPetLoaded) return;
  window.__kofPetLoaded = true;

  var MAI = {
    name: '不知火舞',
    img: '/img/kof-mai.gif',
    width: 150,
    lines: [
      "いっけー！（上吧！）",
      "花蝶扇！",
      "安迪你在看这个博客吗？",
      "看什么看，快去写wp！",
      "今天的题目好难，舞酱帮你加油♪",
      "check in 完成，该挖洞了～",
      "夜深了，还在肝CTF呀？",
      "勝利のポーズ、決めた！"
    ]
  };

  var root = document.createElement('div');
  root.id = 'kof-pet';
  root.innerHTML =
    '<img class="pet-sprite" alt="不知火舞">' +
    '<span class="pet-tag"></span>' +
    '<div class="pet-bubble"></div>';
  document.body.appendChild(root);

  var sprite = root.querySelector('.pet-sprite');
  var tag = root.querySelector('.pet-tag');
  var bubble = root.querySelector('.pet-bubble');
  var bubbleTimer = null;

  sprite.src = MAI.img;
  sprite.style.width = MAI.width + 'px';
  root.style.setProperty('--pet-w', MAI.width + 'px');
  tag.textContent = MAI.name;

  function say(text, ms) {
    bubble.textContent = text;
    bubble.classList.add('show');
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(function () {
      bubble.classList.remove('show');
    }, ms || 3500);
  }

  function randomLine() {
    return MAI.lines[Math.floor(Math.random() * MAI.lines.length)];
  }

  var clickCount = 0;
  sprite.addEventListener('click', function () {
    clickCount++;
    if (clickCount % 5 === 0) {
      say('超必杀忍蜂 —— 逆向成功，flag到手！', 4200);
    } else {
      say(randomLine());
    }
  });

  // 进场打招呼
  setTimeout(function () { say(randomLine()); }, 1200);

  // 每隔 40~70 秒自言自语
  function idleChatter() {
    setTimeout(function () {
      if (!document.hidden) say(randomLine());
      idleChatter();
    }, 40000 + Math.random() * 30000);
  }
  idleChatter();
})();
