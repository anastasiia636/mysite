console.log("Учебный портал загружен");

(() => {
    // Исходные массивы (можешь расширять)
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
  
    // Пары (латынь+перевод)
    const pairs = latin.map((text, i) => ({
      latin: text,
      ru: translations[i] ?? ""
    }));
  
    // Перемешанный порядок без повторов
    let order = [...pairs.keys()];
    shuffle(order);
  
    let clickCount = 0;      // для чёт/нечёт нажатия
    let cursor = 0;          // указатель на текущую фразу из order
  
    // Элементы
    const btnShow = document.getElementById("btnShowPhrase");
    const btnRecolor = document.getElementById("btnRecolor");
    const out = document.getElementById("phrasesOutput");
  
    const btnCreate = document.getElementById("btnCreateListItem");
    const list = document.getElementById("phrasesList");
  
    // Если мы не на странице tasks.html — просто выходим
    if (!btnShow || !btnRecolor || !out || !btnCreate || !list) return;
  
    // --- handlers ---
  
    // 4.1 Показать фразу
    btnShow.addEventListener("click", () => {
      if (cursor >= order.length) {
        alert("Фразы закончились");
        return;
      }
  
      clickCount += 1;
  
      const idx = order[cursor];
      cursor += 1;
  
      const pair = pairs[idx];
  
      const row = document.createElement("div");
      row.classList.add("phrase-row");
      row.classList.add(clickCount % 2 === 0 ? "class1" : "class2");
  
      row.innerHTML = `
        <div><strong>${escapeHtml(pair.latin)}</strong></div>
        <div>${escapeHtml(pair.ru)}</div>
      `;
  
      out.appendChild(row);
    });
  
    // 4.1 Перекрасить: у всех чётных строк (2,4,6...) сделать жирный
    btnRecolor.addEventListener("click", () => {
      const rows = out.querySelectorAll(".phrase-row");
      rows.forEach((el, i) => {
        const humanIndex = i + 1; // 1..n
        if (humanIndex % 2 === 0) el.style.fontWeight = "700";
      });
    });
  
    // 4.2 Создать пункт списка в aside (многоуровневый)
    btnCreate.addEventListener("click", () => {
      if (cursor >= order.length) {
        alert("Фразы закончились");
        return;
      }
  
      const idx = order[cursor];
      cursor += 1;
  
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
  
    // --- utils ---
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
  
