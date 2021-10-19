class Search {
  // 1. describe and create/initial our object
  constructor() {
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
    this.searchField = document.getElementById('search-term');

    this.events();
    this.isOverlayOpen = false;
    this.typingTimer;
  }

  // 2. events
  events() {
    this.openButton.addEventListener("click", this.openOverlay.bind(this));
    this.closeButton.addEventListener("click", this.closeOverlay.bind(this))
    document.addEventListener('keydown', this.keyPressDispatcher.bind(this));
    this.searchField.addEventListener('keydown', this.typingLogic.bind(this))
  }

  // 3. methods (function, action...)

  /**
   * 
   * @param {KeyboardEvent} event 
   */
  typingLogic(event) {
    if(typeof this.typingTimer === 'number') clearTimeout(this.typingTimer)
    this.typingTimer = setTimeout(() => {
      console.log(event.key)
    }, 2000)
  }

  /**
   * 
   * @param {KeyboardEvent} event 
   */
  keyPressDispatcher(event) {
    if(event.code === 'KeyS' && !this.isOverlayOpen) {
      this.openOverlay();
    }
    if(event.code === 'Escape' && this.isOverlayOpen) {
      this.closeOverlay();
    }
  }

  /**
   * @package
   */
  openOverlay() {
    this.searchOverlay.classList.add("search-overlay--active");
    document.body.classList.add('body-no-scroll');
    console.log('open ran');
    this.isOverlayOpen = true;
  }

  closeOverlay() {
    this.searchOverlay.classList.remove("search-overlay--active");
    document.body.classList.remove('body-no-scroll');
    console.log('close ran');
    this.isOverlayOpen = false
  }
}

export default Search;
