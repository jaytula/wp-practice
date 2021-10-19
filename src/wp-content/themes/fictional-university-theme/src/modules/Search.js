class Search {
  // 1. describe and create/initial our object
  constructor() {
    /**
     * @type {HTMLSpanElement}
     */
    this.openButton = document.querySelector(".search-trigger");
    console.log(this.openButton);
    /**
     * @type {HTMLButtonElement}
     */
    this.closeButton = document.querySelector(".search-overlay__close");
    /**
     * @type {HTMLDivElement}
     */
    this.searchOverlay = document.querySelector(".search-overlay");

    console.log(this.searchOverlay);
    this.events();
  }

  // 2. events
  events() {
    this.openButton.addEventListener("click", this.openOverlay.bind(this));
    this.closeButton.addEventListener("click", this.closeOverlay.bind(this));
  }

  // 3. methods (function, action...)
  openOverlay() {
    this.searchOverlay.classList.add("search-overlay--active");
  }

  closeOverlay() {
    this.searchOverlay.classList.remove("search-overlay--active");
  }
}

export default Search;
