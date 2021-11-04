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
      deleteNote.addEventListener('click', this.deleteNote)
    })

  }

  deleteNote() {
    alert('you clicked delete');
  }

  // Methods will go here
}

export default MyNotes