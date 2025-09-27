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
     */
    constructor(initApp, initIndex, initNewSong, initOldSong) {
        super();
        this.app = initApp;
        this.index = initIndex;
        this.newSong = initNewSong;
        this.oldSong = initOldSong;
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