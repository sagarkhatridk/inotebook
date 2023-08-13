import React, { useState } from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
export const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    props.showAlert("Note Added Successfully", "success")
    setNote({title:"", description:"", tag:""})
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container my-3 mt-4">
        <h1><b>Add Note</b></h1>
        <form>
          <div className="form-group my-3">
            <label htmlFor="title"><h4>Title</h4></label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              placeholder="Add a Title"
              onChange={onChange}
              minLength={5}
              required
              value={note.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description"><h4>Description</h4></label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              placeholder="Add a Description"
              onChange={onChange}
              minLength={5}
              required
              value={note.description}
            />
          </div>
          <div className="form-group">
            <label htmlFor="tag"><h4>Tag</h4></label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              placeholder="Add a Tag"
              onChange={onChange}
              value={note.tag}
            />
          </div>
          <br />
          <button
          disabled={note.title.length < 5 || note.description.length < 5}
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};
