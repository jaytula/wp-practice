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
      deleteNote.addEventListener('click', this.deleteNote.bind(this, deleteNote.getAttribute('data-id')))
    })

  }

  /**
   * 
   * @param {string} id 
   */
  deleteNote(id) {
    console.log({id});
    fetch(`${universityData.root_url}/wp-json/wp/v2/note/${id}`, {
      method: 'DELETE',
      headers: {
        'X-WP-Nonce': universityData.nonce
      }
    }).then(res => {
      return res.json();
    }).then(data => {
      console.log('success', data)
    }).catch(err => {
      console.log('sorry', err);
    })
  }

  // Methods will go here
}

export default MyNotes