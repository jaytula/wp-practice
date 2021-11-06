class MyNotes {
  constructor() {
    this.events();
  }

  events() {
    /**
     * @type {NodeListOf<HTMLSpanElement>}
     */
    const deleteNotes = document.querySelectorAll('.delete-note');

    deleteNotes.forEach(deleteNote => {
      /**
       * @type {HTMLLIElement}
       */
      const parent = deleteNote.parentElement;
      deleteNote.addEventListener('click', this.deleteNote.bind(this, parent))
      parent.querySelector('.edit-note').addEventListener('click', this.editNote.bind(this, parent));
    })

  }

  /**
   * 
   * @param {HTMLLIElement} liElement 
   */
  editNote(liElement) {
    const id = liElement.getAttribute('data-id');
    const noteTitleField = liElement.querySelector('.note-title-field');
    const noteBodyField = liElement.querySelector('.note-body-field');
    const updateNoteButton = liElement.querySelector('.update-note');

    noteTitleField.removeAttribute('readonly');
    noteBodyField.removeAttribute('readonly');

    noteTitleField.classList.add('note-active-field');
    noteBodyField.classList.add('note-active-field');
    updateNoteButton.classList.add('update-note--visible');
  }
  /**
   * 
   * @param {HTMLLIElement} liElement
   */
  deleteNote(liElement) {
    const id = liElement.getAttribute('data-id');

    fetch(`${universityData.root_url}/wp-json/wp/v2/note/${id}`, {
      method: 'DELETE',
      headers: {
        'X-WP-Nonce': universityData.nonce
      }
    }).then(res => {
      return res.json();
    }).then(data => {
      liElement.remove();
      console.log('success', data)
    }).catch(err => {
      console.log('sorry', err);
    })
  }

  // Methods will go here
}

export default MyNotes