class Search {
  // 1. describe and create/initial our object
  constructor() {
    this.addSearchHTML();

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
    this.typingTimer = setTimeout(this.getResults.bind(this), 750);
    this.previousValue = this.searchField.value;
  }

  /**
   * ResultItem object
   * @typedef {Object} ResultItem
   * @property {string} title
   * @property {string} permalink
   * @property {string} postType
   * @property {string} [authorName]
   */

  /**
   * SearchResults object
   * @typedef {Object} SearchResults
   * @property {ResultItem[]} generalInfo
   * @property {ResultItem[]} campuses
   * @property {ResultItem[]} professors
   * @property {ResultItem[]} programs
   * @property {ResultItem[]} events
   */

  getResults() {
    /**
     *
     * @returns {Promise<SearchResults>}
     */
    const fetchData = async () => {
      const searchParams = new URLSearchParams();
      searchParams.set("term", this.searchField.value);
      const response = await fetch(
        `${
          universityData.root_url
        }/wp-json/university/v1/search?${searchParams.toString()}`
      );
      return response.json();
    };

    fetchData()
      .then((results) => {
        this.resultsDiv.innerHTML = `
        <div class="row">
          <div class="one-third">
            <h2 class="search-overlay__section-title">General Information</h2>
            ${
              results.generalInfo.length
                ? `<ul class="link-list min-list">`
                : "<p>No general information matches that search</p>"
            }            
            ${results.generalInfo
              .map(
                (item) =>
                  `<li><a href="${item.permalink}">${item.title} ${
                    item.postType === "posts" ? "by " + item.authorName : ""
                  }</a></li>`
              )
              .join("")}
            ${results.generalInfo.length ? "</ul>" : ""}
          </div>
          <div class="one-third">
            <h2 class="search-overlay__section-title">Programs</h2>
            ${
              results.programs.length
                ? `<ul class="link-list min-list">`
                : `<p>No programs match that search. <a href="${
                    universityData.root_url + "/programs"
                  }">View all programs</a></p>`
            }
            ${results.programs
              .map(
                (item) =>
                  `<li><a href="${item.permalink}">${item.title}</a></li>`
              )
              .join("")}
            ${results.programs.length ? "</ul>" : ""}
            <h2 class="search-overlay__section-title">Professors</h2>
          </div>
          <div class="one-third">
            <h2 class="search-overlay__section-title">Campuses</h2>
            ${
              results.campuses.length
                ? `<ul class="link-list min-list">`
                : `<p>No campuses match that search</p> <a href="${
                    universityData.root_url + "/campuses"
                  }">View all campuses</a>`
            }
            ${results.campuses
              .map(
                (item) =>
                  `<li><a href="${item.permalink}">${item.title}</a></li>`
              )
              .join("")}
            ${results.campuses.length ? "</ul>" : ""}
            <h2 class="search-overlay__section-title">Events</h2>
          </div>
        </div>
      <h2 class="search-overlay__section-title">General Information</h2>
      
      `;
        this.isSpinnerVisible = false;
      })
      .catch((err) => {
        console.log(err);
        this.resultsDiv.innerHTML = "<p>Unexpected error</p>";
      });
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
    this.searchField.value = "";
    setTimeout(() => {
      this.searchField.focus();
    }, 301);
    this.isOverlayOpen = true;
  }

  closeOverlay() {
    this.searchOverlay.classList.remove("search-overlay--active");
    document.body.classList.remove("body-no-scroll");
    console.log("close ran");
    this.isOverlayOpen = false;
  }

  addSearchHTML() {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
    <div class="search-overlay">
      <div class="search-overlay__top">
        <div class="container">
            <i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>
            <input autocomplete="off" spellcheck="false" type="text" class="search-term" placeholder="What are you looking for?" id="search-term">
            <i class="fa fa-close search-overlay__close" aria-hidden="true"></i>
        </div>
      </div>
      <div class="container">
        <div id="search-overlay__results"></div>
      </div>
    </div>
    `
    );
  }
}

export default Search;
