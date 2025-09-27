import React, { useState, useEffect } from "react";

export default function EditSongModal({
  isVisible,
  songIndex,
  currentSong,
  hideEditSongModalCallback,
  editSongCallback
}) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [year, setYear] = useState("");
  const [youTubeId, setYouTubeId] = useState("");

  useEffect(() => {
    if (currentSong) {
      setTitle(currentSong.title);
      setArtist(currentSong.artist);
      setYear(currentSong.year);
      setYouTubeId(currentSong.youTubeId);
    }
  }, [currentSong]);

  if (!isVisible || !currentSong) return null;

  const handleConfirm = () => {
    const updatedSong = {
        title: String(title).trim(),
        artist: String(artist).trim(),
        year: String(year).trim(),
        youTubeId: String(youTubeId).trim()
    };

    editSongCallback(songIndex, updatedSong);

    hideEditSongModalCallback();
  };

  const handleCancel = () => {
    hideEditSongModalCallback();
  };

  return (
    <div id="edit-song-modal" className={`modal ${isVisible ? "is-visible" : ""}`} data-animation="slideInOutTop">
      <div className="modal-root">
        <div className="modal-north">Edit Song</div>
        <div className="modal-center">
          <div id="title-prompt" className="modal-prompt">Title:</div>
          <input
            id="edit-song-modal-title-textfield"
            className="modal-textfield"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div id="artist-prompt" className="modal-prompt">Artist:</div>
          <input
            id="edit-song-modal-artist-textfield"
            className="modal-textfield"
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />

          <div id="year-prompt" className="modal-prompt">Year:</div>
          <input
            id="edit-song-modal-year-textfield"
            className="modal-textfield"
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />

          <div id="you-tube-id-prompt" className="modal-prompt">You Tube Id:</div>
          <input
            id="edit-song-modal-youTubeId-textfield"
            className="modal-textfield"
            type="text"
            value={youTubeId}
            onChange={(e) => setYouTubeId(e.target.value)}
          />
        </div>

        <div className="modal-south">
          <input
            type="button"
            id="edit-song-confirm-button"
            className="modal-button"
            value="Confirm"
            onClick={handleConfirm}
          />
          <input
            type="button"
            id="edit-song-cancel-button"
            className="modal-button"
            value="Cancel"
            onClick={handleCancel}
          />
        </div>
      </div>
    </div>
  );
}
