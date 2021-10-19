class Search {
  // 1. describe and create/initial our object
  constructor() {
    /**
     * @type {HTMLDivElement}
     */
    this.resultsDiv = document.getElementById("search-overlay__results");
    /**
     * @type {HTMLSpanElement}
     */
    this.openButton = document.querySelector(".search-trigger");
    /**
     * @type {HTMLButtonElement}
     */
    this.closeButton = document.querySelector(".search-overlay__close");
    /**
     * @type {HTMLDivElement}
     */
    this.searchOverlay = document.querySelector(".search-overlay");

    /**
     * @type {HTMLInputElement}
     */
    this.searchField = document.getElementById("search-term");

    this.events();
    this.isOverlayOpen = false;
    this.typingTimer;
    this.previousValue;
    this.isSpinnerVisible = false;
  }

  // 2. events
  events() {
    this.openButton.addEventListener("click", this.openOverlay.bind(this));
    this.closeButton.addEventListener("click", this.closeOverlay.bind(this));
    document.addEventListener("keydown", this.keyPressDispatcher.bind(this));
    this.searchField.addEventListener("keyup", this.typingLogic.bind(this));
  }

  // 3. methods (function, action...)

  /**
   *
   * @param {KeyboardEvent} event
   */
  typingLogic(event) {
    if (this.searchField.value === "") {
      this.resultsDiv.innerHTML = "";
      this.isSpinnerVisible = false;
      this.previousValue = "";
      return;
    }

    if (this.searchField.value === this.previousValue) return;

    if (typeof this.typingTimer === "number") clearTimeout(this.typingTimer);
    if (!this.isSpinnerVisible) {
      this.resultsDiv.innerHTML = '<div class="spinner-loader"></div>';
      this.isSpinnerVisible = true;
    }
    this.typingTimer = setTimeout(this.getResults.bind(this), 2000);
    this.previousValue = this.searchField.value;
  }

  getResults() {
    this.isSpinnerVisible = false;
    this.resultsDiv.innerHTML = "Imagine real search results here...";
  }

  /**
   *
   * @param {KeyboardEvent} event
   */
  keyPressDispatcher(event) {
    if (
      event.code === "KeyS" &&
      !this.isOverlayOpen &&
      !document.querySelector("input:focus, textarea:focus")
    ) {
      this.openOverlay();
    }
    if (event.code === "Escape" && this.isOverlayOpen) {
      this.closeOverlay();
    }
  }

  /**
   * @package
   */
  openOverlay() {
    this.searchOverlay.classList.add("search-overlay--active");
    document.body.classList.add("body-no-scroll");
    console.log("open ran");
    this.isOverlayOpen = true;
  }

  closeOverlay() {
    this.searchOverlay.classList.remove("search-overlay--active");
    document.body.classList.remove("body-no-scroll");
    console.log("close ran");
    this.isOverlayOpen = false;
  }
}

export default Search;
