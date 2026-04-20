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
                    <li><a href="/pages/technical_works.html">technical works</a></li>
                    <li><a href="/pages/rabbit-hole.html">rabbit hole</a></li>
                    <li><a href="/pages/blog.html">blog</a></li>
                </ul>
            </div>
              </nav>
        `;

    // 햄버거 메뉴 동작 코드
    const hamburger = this.querySelector(".hamburger");
    const navList = this.querySelector(".nav-list");
    if (hamburger) {
      hamburger.addEventListener("click", () => {
        navList.classList.toggle("active");
      });
    }
  }
}

if (!customElements.get("main-nav")) {
  customElements.define("main-nav", MainNav);
}
