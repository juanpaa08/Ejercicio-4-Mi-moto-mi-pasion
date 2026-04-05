function buildHtml() {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Moto Parts Marketplace</title>
    <style>
      :root {
        --bg: #f5efe2;
        --panel: rgba(16, 33, 49, 0.92);
        --panel-soft: rgba(255, 248, 234, 0.86);
        --ink: #13263a;
        --ink-soft: #506171;
        --line: rgba(19, 38, 58, 0.14);
        --accent: #e76f2f;
        --accent-deep: #c14e17;
        --highlight: #f2c14e;
        --success: #1f8f63;
        --shadow: 0 24px 60px rgba(14, 27, 40, 0.18);
        --radius-xl: 28px;
        --radius-lg: 20px;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        min-height: 100vh;
        font-family: "Trebuchet MS", "Gill Sans", sans-serif;
        color: var(--ink);
        background:
          radial-gradient(circle at top left, rgba(242, 193, 78, 0.55), transparent 28%),
          radial-gradient(circle at 85% 15%, rgba(231, 111, 47, 0.22), transparent 24%),
          linear-gradient(160deg, #f7f1e3 0%, #e8ded0 48%, #d7d2ca 100%);
      }

      .page {
        width: min(1180px, calc(100% - 32px));
        margin: 0 auto;
        padding: 32px 0 48px;
      }

      .hero {
        background: linear-gradient(135deg, rgba(12, 27, 42, 0.96), rgba(26, 54, 79, 0.94));
        color: #fff7e8;
        border-radius: var(--radius-xl);
        padding: 32px;
        box-shadow: var(--shadow);
        overflow: hidden;
        position: relative;
      }

      .hero::after {
        content: "";
        position: absolute;
        inset: auto -80px -80px auto;
        width: 260px;
        height: 260px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(242, 193, 78, 0.46), transparent 66%);
      }

      .eyebrow {
        letter-spacing: 0.22em;
        text-transform: uppercase;
        font-size: 0.72rem;
        color: #f2c14e;
        margin-bottom: 10px;
      }

      h1 {
        margin: 0;
        font-family: Georgia, "Palatino Linotype", serif;
        font-size: clamp(2.2rem, 5vw, 4.3rem);
        line-height: 0.98;
        max-width: 10ch;
      }

      .hero p {
        max-width: 58ch;
        color: rgba(255, 247, 232, 0.84);
        font-size: 1.04rem;
        line-height: 1.65;
      }

      .hero-strip {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-top: 22px;
      }

      .hero-pill {
        border: 1px solid rgba(255, 255, 255, 0.18);
        background: rgba(255, 255, 255, 0.08);
        border-radius: 999px;
        padding: 10px 14px;
        font-size: 0.92rem;
      }

      .grid {
        display: grid;
        grid-template-columns: 1.05fr 1.25fr;
        gap: 24px;
        margin-top: 24px;
      }

      .card {
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow);
        border: 1px solid rgba(255, 255, 255, 0.32);
      }

      .card-light {
        background: var(--panel-soft);
        backdrop-filter: blur(8px);
      }

      .card-dark {
        background: linear-gradient(180deg, rgba(255, 251, 243, 0.95), rgba(250, 242, 226, 0.9));
      }

      .section {
        padding: 24px;
      }

      .section h2 {
        margin: 0 0 8px;
        font-family: Georgia, "Palatino Linotype", serif;
        font-size: 1.55rem;
      }

      .muted {
        margin: 0;
        color: var(--ink-soft);
        line-height: 1.6;
      }

      .form {
        margin-top: 20px;
        display: grid;
        gap: 14px;
      }

      label {
        font-size: 0.86rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--ink-soft);
      }

      input,
      select {
        width: 100%;
        margin-top: 6px;
        border: 1px solid var(--line);
        border-radius: 16px;
        padding: 14px 16px;
        font: inherit;
        color: var(--ink);
        background: rgba(255, 255, 255, 0.88);
      }

      input:focus,
      select:focus {
        outline: 2px solid rgba(231, 111, 47, 0.18);
        border-color: rgba(231, 111, 47, 0.46);
      }

      .row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }

      button {
        border: 0;
        border-radius: 999px;
        padding: 14px 18px;
        font: inherit;
        font-weight: 700;
        cursor: pointer;
        transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;
      }

      button:hover {
        transform: translateY(-1px);
      }

      .primary {
        background: linear-gradient(135deg, var(--accent), var(--accent-deep));
        color: #fff8ef;
        box-shadow: 0 14px 28px rgba(193, 78, 23, 0.24);
      }

      .secondary {
        background: rgba(19, 38, 58, 0.08);
        color: var(--ink);
      }

      .toolbar {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 18px;
      }

      .filter-chip {
        background: rgba(19, 38, 58, 0.08);
        color: var(--ink);
      }

      .filter-chip.active {
        background: var(--ink);
        color: #fff5ea;
      }

      .status {
        min-height: 24px;
        margin-top: 14px;
        color: var(--success);
        font-weight: 600;
      }

      .status.error {
        color: #b32d2d;
      }

      .list {
        margin-top: 22px;
        display: grid;
        gap: 14px;
      }

      .item {
        background: rgba(255, 255, 255, 0.88);
        border: 1px solid rgba(19, 38, 58, 0.08);
        border-radius: 18px;
        padding: 16px 18px;
        display: grid;
        gap: 8px;
        transform: translateY(10px);
        opacity: 0;
        animation: reveal 360ms ease forwards;
      }

      .item-top {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        align-items: baseline;
      }

      .item-name {
        font-weight: 700;
        font-size: 1.05rem;
      }

      .price {
        color: var(--accent-deep);
        font-weight: 800;
      }

      .meta {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        color: var(--ink-soft);
        font-size: 0.92rem;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        padding: 6px 10px;
        border-radius: 999px;
        background: rgba(242, 193, 78, 0.22);
        color: #735000;
        font-weight: 700;
      }

      .empty {
        padding: 26px;
        text-align: center;
        border: 1px dashed rgba(19, 38, 58, 0.18);
        border-radius: 18px;
        color: var(--ink-soft);
      }

      @keyframes reveal {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @media (max-width: 900px) {
        .grid {
          grid-template-columns: 1fr;
        }

        .row {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <main class="page">
      <section class="hero">
        <div class="eyebrow">Local Serverless Demo</div>
        <h1>Moto Parts Marketplace</h1>
        <p>
          Publish motorcycle parts, browse seeded inventory by category, and test the same
          Lambda-style API your backend already exposes. This page runs on top of the local
          serverless stack and talks to the existing DynamoDB-backed endpoints.
        </p>
        <div class="hero-strip">
          <div class="hero-pill">Lambda-style handlers</div>
          <div class="hero-pill">DynamoDB Local</div>
          <div class="hero-pill">Live create + query flow</div>
        </div>
      </section>

      <section class="grid">
        <article class="card card-light section">
          <h2>Publish a New Part</h2>
          <p class="muted">Use the same POST endpoint the backend already exposes. Successful submissions refresh the live list instantly.</p>

          <form class="form" id="create-form">
            <label>
              Part Name
              <input id="nombre" name="nombre" type="text" placeholder="Akrapovic full exhaust" required />
            </label>

            <div class="row">
              <label>
                Category
                <select id="tipo" name="tipo" required>
                  <option value="motor">motor</option>
                  <option value="frenos">frenos</option>
                  <option value="suspension">suspension</option>
                  <option value="escape">escape</option>
                </select>
              </label>

              <label>
                Price
                <input id="precio" name="precio" type="number" min="0.01" step="0.01" placeholder="145.00" required />
              </label>
            </div>

            <button class="primary" type="submit">Create part</button>
            <div class="status" id="form-status"></div>
          </form>
        </article>

        <article class="card card-dark section">
          <h2>Explore Inventory</h2>
          <p class="muted">Filter by category, inspect current DynamoDB Local records, and verify end-to-end behavior in the browser.</p>

          <div class="toolbar" id="filters">
            <button class="filter-chip active" data-tipo="motor" type="button">motor</button>
            <button class="filter-chip" data-tipo="frenos" type="button">frenos</button>
            <button class="filter-chip" data-tipo="suspension" type="button">suspension</button>
            <button class="filter-chip" data-tipo="escape" type="button">escape</button>
            <button class="secondary" id="reload-btn" type="button">Reload</button>
          </div>

          <div class="status" id="list-status"></div>
          <div class="list" id="partes-list"></div>
        </article>
      </section>
    </main>

    <script>
      const filters = Array.from(document.querySelectorAll('[data-tipo]'));
      const listNode = document.getElementById('partes-list');
      const listStatusNode = document.getElementById('list-status');
      const formStatusNode = document.getElementById('form-status');
      const formNode = document.getElementById('create-form');
      const reloadButton = document.getElementById('reload-btn');
      let currentTipo = 'motor';

      function getBasePath() {
        return window.location.pathname.replace(/\\/app\\/?$/, '');
      }

      function endpoint(path) {
        return getBasePath() + path;
      }

      function setActiveFilter(tipo) {
        currentTipo = tipo;
        filters.forEach((button) => {
          button.classList.toggle('active', button.dataset.tipo === tipo);
        });
      }

      function renderItems(items) {
        if (!items.length) {
          listNode.innerHTML = '<div class="empty">No parts found for this category yet. Try publishing one from the form.</div>';
          return;
        }

        listNode.innerHTML = items
          .map((item, index) => \`
            <article class="item" style="animation-delay: \${index * 80}ms">
              <div class="item-top">
                <div class="item-name">\${item.nombre}</div>
                <div class="price">$ \${Number(item.precio).toFixed(2)}</div>
              </div>
              <div class="meta">
                <span class="badge">\${item.tipo}</span>
                <span>ID: \${item.id}</span>
              </div>
              <div class="meta">Created: \${new Date(item.creadoEn).toLocaleString()}</div>
            </article>
          \`)
          .join('');
      }

      async function loadParts(tipo) {
        listStatusNode.className = 'status';
        listStatusNode.textContent = 'Loading inventory...';

        try {
          const response = await fetch(endpoint('/partes?tipo=' + encodeURIComponent(tipo)));
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Could not load parts.');
          }

          renderItems(data);
          listStatusNode.textContent = 'Loaded ' + data.length + ' part(s) for "' + tipo + '".';
        } catch (error) {
          listStatusNode.className = 'status error';
          listStatusNode.textContent = error.message;
          listNode.innerHTML = '<div class="empty">The inventory could not be loaded.</div>';
        }
      }

      filters.forEach((button) => {
        button.addEventListener('click', () => {
          setActiveFilter(button.dataset.tipo);
          loadParts(currentTipo);
        });
      });

      reloadButton.addEventListener('click', () => loadParts(currentTipo));

      formNode.addEventListener('submit', async (event) => {
        event.preventDefault();
        formStatusNode.className = 'status';
        formStatusNode.textContent = 'Creating part...';

        const body = {
          nombre: document.getElementById('nombre').value,
          tipo: document.getElementById('tipo').value,
          precio: Number(document.getElementById('precio').value)
        };

        try {
          const response = await fetch(endpoint('/partes'), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Could not create part.');
          }

          formStatusNode.textContent = 'Part created: ' + data.nombre;
          formNode.reset();
          document.getElementById('tipo').value = data.tipo;
          setActiveFilter(data.tipo);
          await loadParts(data.tipo);
        } catch (error) {
          formStatusNode.className = 'status error';
          formStatusNode.textContent = error.message;
        }
      });

      setActiveFilter(currentTipo);
      loadParts(currentTipo);
    </script>
  </body>
</html>`;
}

async function handler() {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8'
    },
    body: buildHtml()
  };
}

module.exports = {
  handler
};
