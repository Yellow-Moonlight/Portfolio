class MainNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <nav class="nav-container">
            <div class="nav-inner">
                <a class="site-title" href="/index.html">Seongjoo Moon</a>
                <button class="hamburger">☰</button>
                <ul class="nav-list">
                    <li><a href="/pages/about.html">about</a></li>
                    <li><a href="/pages/news.html">news</a></li>
                    <li><a href="/pages/works.html">works</a></li>
                    <li><a href="/pages/technical_direction.html">technical direction</a></li>
                    <li><a href="/pages/rabbit-hole.html">rabbit hole</a></li>
                    <li><a href="/pages/blog.html">blog</a></li>
                </ul>
            </div>
        </nav>
        `;
  }
}

customElements.define("main-nav", MainNav);
