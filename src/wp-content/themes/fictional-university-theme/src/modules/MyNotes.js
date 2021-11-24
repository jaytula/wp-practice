class MyNotes {
  constructor() {
    this.events();
  }

  events() {
    /**
     * @type {NodeListOf<HTMLSpanElement>}
     */
    const deleteNotes = document.querySelectorAll(".delete-note");

    document.getElementById('my-notes').addEventListener('click', (event) => {
      /**
       * @type {HTMLSpanElement}
       */
      const target = event.target;
      const parent = target.parentElement;

      if(target.classList.contains('delete-note')) {
        this.deleteNote(parent);
      } else if(target.classList.contains('edit-note')) {
        this.editNote(parent);
      } else if(target.classList.contains('update-note')) {
        this.updateNote(parent);
      }
    })

    document
      .querySelector(".submit-note")
      .addEventListener("click", this.createNote);
  }

  createNote() {
    /**
     * @type {HTMLInputElement}
     */
    const titleInput = document.querySelector(".new-note-title");
    /**
     * @type {HTMLTextAreaElement}
     */
    const bodyInput = document.querySelector(".new-note-body");

    const body = {
      title: titleInput.value,
      content: bodyInput.value,
      status: 'publish',
    };

    fetch(`${universityData.root_url}/wp-json/wp/v2/note`, {
      method: "POST",
      headers: {
        "X-WP-Nonce": universityData.nonce,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if('code' in data) {
          throw new Error(data.message);
        }
        /**
         * @type {number}
         */
        const id = data.id;

        titleInput.value = '';
        bodyInput.value = '';
        const newListItem = document.createElement('li');
        newListItem.setAttribute('data-id', id.toString())

        const newTitleInput = document.createElement('input');
        newTitleInput.classList.add('note-title-field');
        newTitleInput.setAttribute('type', 'text');
        newTitleInput.setAttribute('readonly', 'readonly')
        newTitleInput.value = body.title;

        const newEditNoteSpan = document.createElement('span');
        newEditNoteSpan.classList.add('edit-note')
        newEditNoteSpan.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i> Edit';

        const newDeleteNoteSpan = document.createElement('span');
        newDeleteNoteSpan.classList.add('delete-note');
        newDeleteNoteSpan.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i> Delete';

        const newTextArea = document.createElement('textarea');
        newTextArea.setAttribute('readonly', 'readonly');
        newTextArea.classList.add('note-body-field');
        newTextArea.value = body.content;

        const newSaveSpan = document.createElement('span');
        newSaveSpan.classList.add('update-note', 'btn', 'btn--small', 'btn--blue');
        newSaveSpan.innerHTML = '<i class="fa fa-arrow-right" aria-hidden="true"></i> Save'

        newListItem.appendChild(newTitleInput);
        newListItem.appendChild(newEditNoteSpan);
        newListItem.appendChild(newDeleteNoteSpan);
        newListItem.appendChild(newTextArea);
        newListItem.appendChild(newSaveSpan);

        document.getElementById('my-notes').prepend(newListItem);
      })
      .catch((err) => {
        if(err.message === 'You have reached your note limit.') {
          document.querySelector('.note-limit-message').classList.add('active');
        }
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

    console.log({ body });

    fetch(`${universityData.root_url}/wp-json/wp/v2/note/${id}`, {
      method: "POST",
      headers: {
        "X-WP-Nonce": universityData.nonce,
        "Content-Type": "application/json",
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

        if(data.userNoteCount < 5) {
          document.querySelector('.note-limit-message').classList.remove('active');
        }
      })
      .catch((err) => {
        console.log("sorry", err);
      });
  }

  // Methods will go here
}

export default MyNotes;
