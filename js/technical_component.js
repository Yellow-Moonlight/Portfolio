class MainNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <nav class="nav-container">
            <div class="nav-inner">
                <a class="site-title" href="https://yellow-moonlight.github.io/Portfolio/pages/technical_works.html">Seongjoo Moon Portfolio for Prototyping & Production</a>
            </div>
              </nav>
        `;

  }
}

if (!customElements.get("main-nav")) {
  customElements.define("main-nav", MainNav);
}
