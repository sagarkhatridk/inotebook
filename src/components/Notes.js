import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import { AddNote } from "./AddNote";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom"

export const Notes = (props) => {
  const context = useContext(noteContext);
  let history = useHistory()
  const ref = useRef(null);
  const refClose = useRef(null);
  const { notes, getNotes, editNote } = context;
  
  const [note, setNote] = useState({id:"", etitle:"", edescription:"", etag:"default"})
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }else{
      history.push("/login")
    }

    // eslint-disable-next-line
  }, []);

  const updataNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag})
    
  };

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag)
    setNote({etitle:"", edescription:"", etag:""})
    refClose.current.click();
    props.showAlert("Updated Successfully", "success")
}

const onChange = (e) => {
    setNote({...note, [e.target.name]:e.target.value})

}

  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <h1>Your Notes</h1>
      <button
      style={{display:"none"}}
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="etitle">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    placeholder="Title"
                    onChange={onChange}
                    value={note.etitle}
                    minLength={5}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edescription">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    placeholder="description"
                    onChange={onChange}
                    value={note.edescription}
                    minLength={5}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="etag">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    placeholder="tag"
                    onChange={onChange}
                    value={note.etag}
                  />
                </div>
                <br />
    
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <div className="container mx-2">
          {notes.length === 0 && "Add Your First Note!"}
        </div>
        {notes.map((note, index) => {
          return <NoteItem key={index} updateNote={updataNote} showAlert={props.showAlert} note={note} />;
        })}
      </div>
    </>
  );
};
