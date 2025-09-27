import { jsTPS_Transaction } from "jstps"

/**
 * EditSong_Transaction
 * 
 * This class represents a transaction that edits a song
 * in the playlist. It will be managed by the transaction stack.
 * 
 * @author Alex Tran
 */
export default class EditSong_Transaction extends jsTPS_Transaction {
    /**
     * Initializes this object such that it can both do and undo the transaction
     * 
     * @param {PlaylisterModel} initModel The M in MVC for this app
     * @param {number} initIndex The index of where the song is to be created in the playlist
     * @param {PlaylistSongPrototype} initNewSong The created song.
     * @param {PlaylistSongPrototype} initOldSong The old song before editing.
     */
    constructor(initApp, initIndex, initNewSong, initOldSong) {
        super();
        this.app = initApp;
        this.index = initIndex;
        this.newSong = initNewSong.clone();
        this.oldSong = initOldSong.clone();
    }

    /**
     * Executed when this transaction is first done or redone.
     */
    executeDo() {
        this.app.editSong(this.index, this.newSong);
    }

    /**
     * Executed when this transaction is undone.
     */
    executeUndo() {
        this.app.editSong(this.index, this.oldSong);
    }
}