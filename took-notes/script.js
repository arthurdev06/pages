document.addEventListener("DOMContentLoaded", function () {
  const submitNewNote = document.querySelector("#submit-button");
  const noteContent = document.querySelector("#new-note");
  const clearNotesButton = document.querySelector("#clear-notes-button");
  //Coisa
  function addNote() {
    const noteText = noteContent.value;

    if (noteText.trim() !== "") {
      const currentDate = new Date();
      const timestamp = currentDate.toLocaleString();

      saveNoteToLocalStorage({ title: timestamp, content: noteText });

      noteContent.value = "";

      displayNotes();
    }
  }

  submitNewNote.addEventListener("click", addNote);

  function saveNoteToLocalStorage(note) {
    let notes = [];

    if (localStorage.getItem("notes")) {
      notes = JSON.parse(localStorage.getItem("notes"));
    }

    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  function clearAllNotes() {
    localStorage.removeItem("notes");

    displayNotes();
  }

  clearNotesButton.addEventListener("click", clearAllNotes);

  function displayNotes() {
    const notes = JSON.parse(localStorage.getItem("notes"));
    const notesContainer = document.querySelector(".notes-container");

    notesContainer.innerHTML = "";

    if (notes && notes.length > 0) {
      notes.forEach((note) => {
        const noteElement = document.createElement("div");

        noteElement.innerHTML = `<details class="note-content">
        <summary class="note-title">${note.title}  </summary><p class="note-real-content">${note.content}<p/> 
        </details>`;

        notesContainer.appendChild(noteElement);
      });
    }
  }
});
