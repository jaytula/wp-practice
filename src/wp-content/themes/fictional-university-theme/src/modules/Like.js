class Like {
  constructor() {
    this.events();
  }

  events() {
    /** @type {NodeListOf<HTMLSpanElement>} */
    const likeBoxes = document.querySelectorAll(".like-box");

    for (let likeBox of likeBoxes) {
      likeBox.addEventListener("click", this.ourClickDispatcher.bind(this));
    }
  }

  // methods

  /** @type {(e: MouseEvent) => void} */
  ourClickDispatcher(event) {
    /** @type {HTMLElement} */
    const target = event.target;
    /** @type {HTMLElement} */
    const likeBox = target.closest('.like-box');
    if (likeBox.getAttribute("data-exists") === "yes") {
      this.deleteLike();
    } else {
      this.createLike();
    }
  }

  createLike() {
    console.log("createLike()");
  }

  deleteLike() {
    console.log("deleteLike()");
  }
}

export default Like;
