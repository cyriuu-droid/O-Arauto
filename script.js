(function() {
    // Atualiza visitantes com número aleatório (ilusão)
    const visitorSpan = document.getElementById('visitantes');
    const visitorSide = document.getElementById('visitorCount');
    function updateVisitors() {
        const n = Math.floor(Math.random() * 4) + 1; // 1-4
        visitorSpan.textContent = n + ' visitante' + (n > 1 ? 's' : '') + ' ativo';
        visitorSide.textContent = n;
    }
    updateVisitors();
    setInterval(updateVisitors, 15000);

    // Último acesso (data/hora atual)
    const lastAccess = document.getElementById('lastAccess');
    function updateLastAccess() {
        const now = new Date();
        const h = String(now.getHours()).padStart(2,'0');
        const m = String(now.getMinutes()).padStart(2,'0');
        lastAccess.textContent = h + ':' + m;
    }
    updateLastAccess();
    setInterval(updateLastAccess, 30000);

    // Coordenadas no post-06 mudam lentamente (efeito de instabilidade)
    const coordsEl = document.getElementById('coords');
    const bases = [
        '48°36′00.0″N 117°20′00.0″W',
        '48°36′01.2″N 117°19′58.7″W',
        '48°35′59.4″N 117°20′02.1″W',
        '48°36′00.8″N 117°19′59.3″W'
    ];
    let idx = 0;
    setInterval(() => {
        idx = (idx + 1) % bases.length;
        coordsEl.textContent = '[ coordenadas: ' + bases[idx] + ' ]';
        // Pequeno efeito de glitch na cor
        coordsEl.style.color = '#6a4a2a';
        setTimeout(() => { coordsEl.style.color = ''; }, 300);
    }, 7000);

    // Pequeno Easter egg: ao clicar duas vezes no título, muda algo
    document.querySelector('.site-name').addEventListener('dblclick', function() {
        this.textContent = 'O Arauto — Carcosa te observa';
        setTimeout(() => { this.textContent = 'O Arauto'; }, 3000);
    });

})();

// ===== TEMA CLARO/ESCURO =====
(function() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    // Verifica preferência salva
    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    let isLight = savedTheme === 'light' || (savedTheme === null && prefersLight);

    function applyTheme(light) {
        document.body.classList.toggle('light-mode', light);
        toggle.textContent = light ? '🌙' : '☀️';
        localStorage.setItem('theme', light ? 'light' : 'dark');
    }

    // Aplica tema inicial
    applyTheme(isLight);

    // Listener do botão
    toggle.addEventListener('click', function() {
        const current = document.body.classList.contains('light-mode');
        applyTheme(!current);
    });
})();