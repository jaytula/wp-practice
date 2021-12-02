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
    fetch(`/wp-json/university/v1/manageLike`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    })
  }

  deleteLike() {
    fetch(`/wp-json/university/v1/manageLike`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(data => {
          console.log(data);
      }).catch(err => {
          console.log(err);
      })
  }
}

export default Like;
