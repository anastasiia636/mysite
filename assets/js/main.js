console.log("Учебный портал загружен");
alert("MAIN.JS UPDATED v2");

(() => {
    // ====== Исходные фразы ======
    const latin = [
      "Consuetudo est altera natura",
      "Nota bene",
      "Nulla calamitas sola",
      "Per aspera ad astra"
    ];
  
    const translations = [
      "Привычка - вторая натура",
      "Заметьте хорошо!",
      "Беда не приходит одна",
      "Через тернии к звёздам"
    ];
  
    const pairs = latin.map((text, i) => ({
      latin: text,
      ru: translations[i] ?? ""
    }));
  
    // ====== DOM ======
    const btnShow = document.getElementById("btnShowPhrase");
    const btnRecolor = document.getElementById("btnRecolor");
    const btnRestart = document.getElementById("btnRestartPhrases");
    const out = document.getElementById("phrasesOutput");
  
    const btnCreate = document.getElementById("btnCreateListItem");
    const list = document.getElementById("phrasesList");
  
    // если мы не на tasks-странице — выходим
    if (!btnShow || !btnRecolor || !btnRestart || !out || !btnCreate || !list) return;
  
    // ====== Независимые очереди ======
    let orderA = [];
    let cursorA = 0;
    let clickCountA = 0;     // чтобы чередовать class1/class2
    let boldEnabled = false; // тумблер для "Перекрасить"
  
    let orderB = [];
    let cursorB = 0;
  
    // ====== init/reset ======
    function resetAll() {
      // очистить выводы
      out.innerHTML = "";
      list.innerHTML = "";
  
      // заново перемешать две независимые очереди
      orderA = [...pairs.keys()];
      orderB = [...pairs.keys()];
      shuffle(orderA);
      shuffle(orderB);
  
      // сбросить счётчики
      cursorA = 0;
      cursorB = 0;
      clickCountA = 0;
  
      // выключить жирность (по умолчанию)
      boldEnabled = false;
      btnRecolor.textContent = "Перекрасить";
    }
  
    resetAll();
  
    // ====== 4.1 Показать фразу ======
    btnShow.addEventListener("click", () => {
      if (cursorA >= orderA.length) {
        alert("Фразы закончились");
        return;
      }
  
      clickCountA += 1;
  
      const idx = orderA[cursorA];
      cursorA += 1;
  
      const pair = pairs[idx];
  
      const row = document.createElement("div");
      row.classList.add("phrase-row");
      row.classList.add(clickCountA % 2 === 0 ? "class1" : "class2");
  
      row.innerHTML = `
        <div><strong>${escapeHtml(pair.latin)}</strong></div>
        <div>${escapeHtml(pair.ru)}</div>
      `;
  
      out.appendChild(row);
  
      // если жирность включена — применяем её сразу и к новым строкам
      if (boldEnabled) applyBoldToEvenRows(true);
    });
  
    // ====== 4.1 Перекрасить (тумблер) ======
    btnRecolor.addEventListener("click", () => {
      boldEnabled = !boldEnabled;
      applyBoldToEvenRows(boldEnabled);
  
      // можно подсказать состоянием текста кнопки
      btnRecolor.textContent = boldEnabled ? "Перекрасить (выкл.)" : "Перекрасить";
    });
  
    function applyBoldToEvenRows(isOn) {
      const rows = out.querySelectorAll(".phrase-row");
      rows.forEach((el, i) => {
        const humanIndex = i + 1; // 1..n
        if (humanIndex % 2 === 0) {
          el.style.fontWeight = isOn ? "700" : "";
        }
      });
    }
  
    // ====== 4.1 Начать сначала ======
    btnRestart.addEventListener("click", () => {
      resetAll();
    });
  
    // ====== 4.2 Создать пункт списка (НЕЗАВИСИМО) ======
    btnCreate.addEventListener("click", () => {
      if (cursorB >= orderB.length) {
        alert("Фразы закончились");
        return;
      }
  
      const idx = orderB[cursorB];
      cursorB += 1;
  
      const pair = pairs[idx];
  
      const li = document.createElement("li");
      li.textContent = pair.latin;
  
      const ul = document.createElement("ul");
      const li2 = document.createElement("li");
      li2.textContent = pair.ru;
  
      ul.appendChild(li2);
      li.appendChild(ul);
      list.appendChild(li);
    });
  
    // ===== utils =====
    function shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  
    function escapeHtml(s) {
      return String(s)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }
  })();
  