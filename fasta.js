class CustomLink extends HTMLElement {
    constructor() {
      super();
  
      // Attach a shadow DOM to the element.
      const shadow = this.attachShadow({ mode: 'open' });
  
      // Create a link element.
      const link = document.createElement('a');
      link.href = this.getAttribute('href');
      link.textContent = this.textContent;
  
      // Style the link.
      const style = document.createElement('style');
      style.textContent = `
        a {
          color: blue;
          text-decoration: underline;
          cursor: pointer;
        }
      `;
  
      // Append the link and style to the shadow DOM.
      shadow.appendChild(style);
      shadow.appendChild(link);
  
      // Add an event listener to handle clicks.
      link.addEventListener('click', (event) => this.handleClick(event));
    }
  
    handleClick(event) {
      const href = this.getAttribute('href');
      if (!href.startsWith('http')) {
        // Prevent the default link behavior.
        event.preventDefault();
        this.loadContent(href);
      }
    }
  
    loadContent(href) {
      fetch(href)
        .then(response => response.text())
        .then(html => {
          // Simulate loading new content into the main content area.
          document.getElementById('content').innerHTML = html;
          window.history.pushState({}, '', href);
        })
        .catch(err => console.error('Failed to load content', err));
    }
  }
  
  // Register the custom element.
  customElements.define('fasta', CustomLink);
  