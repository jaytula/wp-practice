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

  getResults() {
    /**
     *
     * @param {'post' | 'pages'} postType
     * @returns {Promise<{link: string, title: {rendered: string}}[]>}
     */
    const fetchData = async (postType) => {
      const searchParams = new URLSearchParams();
      searchParams.set("search", this.searchField.value);
      const response = await fetch(
        `${
          universityData.root_url
        }/wp-json/wp/v2/${postType}?${searchParams.toString()}`
      );
      return response.json();
    };

    const fetchAll = async () => {
      const [allPosts, allPages] = await Promise.all([
        fetchData("posts"),
        fetchData("pages"),
      ]);

      return [...allPosts, ...allPages];
    };

    fetchAll()
      .then((posts) => {
        const listItems = posts.map(
          (item) => `<li><a href="${item.link}">${item.title.rendered}</a></li>`
        );
        this.resultsDiv.innerHTML = `
      <h2 class="search-overlay__section-title">General Information</h2>
      ${
        posts.length
          ? `<ul class="link-list min-list">`
          : "<p>No general information matches that search</p>"
      }
        ${listItems.join("")}
      ${posts.length ? "</ul>" : ""}
      `;
        this.isSpinnerVisible = false;
      })
      .catch((err) => {
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
