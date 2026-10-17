/* ============================================================
   KOF 像素桌宠 — K' & 不知火舞
   点击角色换人 · 点击按钮切换 · 随机台词 · 骚话气泡
   ============================================================ */
(function () {
  if (window.__kofPetLoaded) return;
  window.__kofPetLoaded = true;

  var FIGHTERS = [
    {
      name: "K'",
      img: "/img/kof-kdash.gif",
      width: 110,
      lines: [
        "俺一个人就够了。",
        "まだ始まったばかりだ（还早着呢）。",
        "这题re出来了？给老子看看。",
        "燃烧起来了吗！",
        "别碰我，社恐。",
        "flag在这？俺拆了它。",
        "你在盯着我看什么？",
        "KOF '99 优胜选手在此。"
      ]
    },
    {
      name: "不知火舞",
      img: "/img/kof-mai.gif",
      width: 130,
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
    }
  ];

  // URL 参数 / localStorage 记住上次选的人
  var saved = 0;
  try { saved = parseInt(localStorage.getItem('kof-pet') || '0', 10) || 0; } catch (e) {}
  var idx = (saved >= 0 && saved < FIGHTERS.length) ? saved : 0;

  var root = document.createElement('div');
  root.id = 'kof-pet';
  root.innerHTML =
    '<button class="pet-switch" title="切换角色">▶ 换人</button>' +
    '<img class="pet-sprite" alt="kof pet">' +
    '<span class="pet-tag"></span>' +
    '<div class="pet-bubble"></div>';
  document.body.appendChild(root);

  var sprite = root.querySelector('.pet-sprite');
  var tag = root.querySelector('.pet-tag');
  var bubble = root.querySelector('.pet-bubble');
  var switchBtn = root.querySelector('.pet-switch');
  var bubbleTimer = null;

  function current() { return FIGHTERS[idx]; }

  function render() {
    var f = current();
    sprite.src = f.img;
    sprite.style.width = f.width + 'px';
    root.style.setProperty('--pet-w', f.width + 'px');
    tag.textContent = f.name;
    try { localStorage.setItem('kof-pet', String(idx)); } catch (e) {}
  }

  function say(text, ms) {
    bubble.textContent = text;
    bubble.classList.add('show');
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(function () {
      bubble.classList.remove('show');
    }, ms || 3500);
  }

  function randomLine() {
    var lines = current().lines;
    return lines[Math.floor(Math.random() * lines.length)];
  }

  function switchFighter() {
    idx = (idx + 1) % FIGHTERS.length;
    render();
    say('[' + current().name + '] ' + randomLine());
  }

  // 点击角色本体：说话 / 再点一次放必杀台词
  var clickCount = 0;
  sprite.addEventListener('click', function () {
    clickCount++;
    if (clickCount % 5 === 0) {
      var special = idx === 0
        ? '必杀· Eins Trigger —— 命中！你的pwn通了！'
        : '必杀· 超必杀忍蜂 —— 逆向成功！';
      say(special, 4200);
    } else {
      say(randomLine());
    }
  });

  switchBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    switchFighter();
  });

  render();

  // 进场打招呼
  setTimeout(function () { say('[' + current().name + '] ' + randomLine()); }, 1200);

  // 每隔 40~70 秒自言自语
  function idleChatter() {
    setTimeout(function () {
      if (!document.hidden) say(randomLine());
      idleChatter();
    }, 40000 + Math.random() * 30000);
  }
  idleChatter();
})();
