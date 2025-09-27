import { jsTPS_Transaction } from "jstps"

/**
 * DeleteSong_Transaction
 * 
 * This class represents a transaction that deletes a song
 * in the playlist. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 */
export default class RemoveSong_Transaction extends jsTPS_Transaction {
    /**
     * Initializes this object such that it can both do and undo the transaction
     * 
     */
    constructor(initApp, initIndex, initSong) {
        super();
        this.app = initApp;
        this.index = initIndex;
        this.song = initSong;
    }

    /**
     * Executed when this transaction is first done or redone.
     */
    executeDo() {
        this.app.removeSong(this.index);
    }

    /**
     * Executed when this transaction is undone.
     */
    executeUndo() {
        this.app.createSong(this.index, this.song);
    }
}