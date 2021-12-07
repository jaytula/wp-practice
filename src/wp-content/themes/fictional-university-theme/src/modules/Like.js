import { universityData } from "../globals";

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
    const likeBox = target.closest(".like-box");
    if (likeBox.getAttribute("data-exists") === "yes") {
      this.deleteLike(likeBox);
    } else {
      this.createLike(likeBox);
    }
  }

  /** @type {(el: HTMLElement) => void} */
  createLike(likeBox) {
    console.log({ universityData });
    const professorId = likeBox.getAttribute("data-professor");
    const searchParams = new URLSearchParams();
    searchParams.set("professorId", professorId);

    fetch(`/wp-json/university/v1/manageLike?${searchParams.toString()}`, {
      method: "POST",
      headers: {
        "X-WP-Nonce": universityData.nonce,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('yes');
        likeBox.setAttribute("data-exists", "yes");
        const likeCount = +likeBox.querySelector('.like-count').textContent;
        likeBox.querySelector('.like-count').textContent = (likeCount + 1).toString();
        likeBox.setAttribute('data-like', data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /** @type {(el: HTMLElement) => void} */
  deleteLike(likeBox) {
    fetch(`/wp-json/university/v1/manageLike`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-WP-Nonce": universityData.nonce,
      },
      body: JSON.stringify({
        like: likeBox.getAttribute('data-like')
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        likeBox.removeAttribute("data-exists");
        const likeCount = +likeBox.querySelector('.like-count').textContent;
        likeBox.querySelector('.like-count').textContent = (likeCount - 1).toString();
        likeBox.removeAttribute('data-like');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default Like;
