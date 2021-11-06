class MyNotes {
  constructor() {
    this.events();
  }

  events() {
    /**
     * @type {NodeListOf<HTMLSpanElement>}
     */
    const deleteNotes = document.querySelectorAll(".delete-note");

    deleteNotes.forEach((deleteNote) => {
      /**
       * @type {HTMLLIElement}
       */
      const parent = deleteNote.parentElement;
      deleteNote.addEventListener("click", this.deleteNote.bind(this, parent));
      parent
        .querySelector(".edit-note")
        .addEventListener("click", this.editNote.bind(this, parent));

      parent
        .querySelector(".update-note")
        .addEventListener("click", this.updateNote.bind(this, parent));
    });
  }

  /**
   *
   * @param {HTMLLIElement} liElement
   */
  editNote(liElement) {
    const id = liElement.getAttribute("data-id");

    if (liElement.getAttribute("data-state") === "editable") {
      this.makeNoteReadonly(liElement);
    } else {
      this.makeNoteEditable(liElement);
    }
  }

  /**
   *
   * @param {HTMLLIElement} liElement
   */
  updateNote(liElement) {
    const id = liElement.getAttribute("data-id");

    /**
     * @type {HTMLInputElement}
     */
    const noteTitleField = liElement.querySelector(".note-title-field");
    /**
     * @type {HTMLTextAreaElement}
     */
    const noteBodyField = liElement.querySelector(".note-body-field");

    const body = {
      title: noteTitleField.value,
      content: noteBodyField.value,
    };

    console.log({body});

    fetch(`${universityData.root_url}/wp-json/wp/v2/note/${id}`, {
      method: "POST",
      headers: {
        "X-WP-Nonce": universityData.nonce,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.makeNoteReadonly(liElement);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   *
   * @param {HTMLLIElement} liElement
   */
  makeNoteEditable(liElement) {
    /**
     * @type {HTMLInputElement}
     */
    const noteTitleField = liElement.querySelector(".note-title-field");
    /**
     * @type {HTMLTextAreaElement}
     */
    const noteBodyField = liElement.querySelector(".note-body-field");
    /**
     * @type {HTMLSpanElement}
     */
    const editNoteSpan = liElement.querySelector(".edit-note");
    const updateNoteButton = liElement.querySelector(".update-note");

    noteTitleField.removeAttribute("readonly");
    noteBodyField.removeAttribute("readonly");
    noteTitleField.classList.add("note-active-field");
    noteBodyField.classList.add("note-active-field");
    updateNoteButton.classList.add("update-note--visible");
    editNoteSpan.innerHTML =
      '<i class="fa fa-times" aria-hidden="true"></i> Cancel';
    liElement.setAttribute("data-state", "editable");
  }

  /**
   *
   * @param {HTMLLIElement} liElement
   */
  makeNoteReadonly(liElement) {
    /**
     * @type {HTMLInputElement}
     */
    const noteTitleField = liElement.querySelector(".note-title-field");
    /**
     * @type {HTMLTextAreaElement}
     */
    const noteBodyField = liElement.querySelector(".note-body-field");
    /**
     * @type {HTMLSpanElement}
     */
    const editNoteSpan = liElement.querySelector(".edit-note");
    const updateNoteButton = liElement.querySelector(".update-note");

    noteTitleField.setAttribute("readonly", "readonly");
    noteBodyField.setAttribute("readonly", "readonly");
    noteTitleField.classList.remove("note-active-field");
    noteBodyField.classList.remove("note-active-field");
    updateNoteButton.classList.remove("update-note--visible");
    editNoteSpan.innerHTML =
      '<i class="fa fa-pencil" aria-hidden="true"></i> Edit';
    liElement.removeAttribute("data-state");
  }
  /**
   *
   * @param {HTMLLIElement} liElement
   */
  deleteNote(liElement) {
    const id = liElement.getAttribute("data-id");

    fetch(`${universityData.root_url}/wp-json/wp/v2/note/${id}`, {
      method: "DELETE",
      headers: {
        "X-WP-Nonce": universityData.nonce,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        liElement.remove();
        console.log("success", data);
      })
      .catch((err) => {
        console.log("sorry", err);
      });
  }

  // Methods will go here
}

export default MyNotes;
