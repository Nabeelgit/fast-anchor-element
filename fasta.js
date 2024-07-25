class FastA extends HTMLElement {
  constructor() {
    super();
    const link = document.createElement('a');
    link.href = this.getAttribute('href');
    link.textContent = this.textContent;
    this.attachShadow({ mode: 'open' }).appendChild(link);
    link.addEventListener('click', (event) => this.handleClick(event));
  }

  handleClick(event) {
    const href = this.getAttribute('href');
    if (!href.startsWith('http') && !href.startsWith('//')) {
      event.preventDefault();
      this.loadContent(href);
    }
  }

  loadContent(href) {
    fetch(href)
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const newDocument = parser.parseFromString(html, 'text/html');
        document.documentElement.innerHTML = newDocument.documentElement.innerHTML;
        window.history.pushState({}, '', href);
        // Re-run the script to ensure FastA elements are initialized
        const script = document.createElement('script');
        script.src = 'fasta.js';
        document.body.appendChild(script);
      })
      .catch(err => console.error('Failed to load content', err));
  }
}

// Only define the custom element if it hasn't been defined yet
if (!customElements.get('fast-a')) {
  customElements.define('fast-a', FastA);
}