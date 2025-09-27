import React from "react";

export default class SongCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDragging: false,
            draggedTo: false
        }
    }
    handleDragStart = (event) => {
        event.dataTransfer.setData("song", event.target.id);
        this.setState(prevState => ({
            isDragging: true,
            draggedTo: prevState.draggedTo
        }));
    }
    handleDragOver = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: true
        }));
    }
    handleDragEnter = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: true
        }));
    }
    handleDragLeave = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: false
        }));
    }
    handleDrop = (event) => {
    event.preventDefault();
    const targetId = event.currentTarget.id; // <- use currentTarget, not target
    let targetIndex = parseInt(targetId.substring(targetId.indexOf("-") + 1)); // 1-based
    let sourceId = event.dataTransfer.getData("song");
    let sourceIndex = parseInt(sourceId.substring(sourceId.indexOf("-") + 1)); // 1-based
        
        this.setState(prevState => ({
            isDragging: false,
            draggedTo: false
        }));

        // ASK THE MODEL TO MOVE THE DATA
    this.props.moveCallback(sourceIndex, targetIndex);
    }

    getItemNum = () => {
        return this.props.id.substring("song-card-".length);
    }

    render() {
        const { song } = this.props;
        let num = this.getItemNum();
        console.log("num: " + num);
        let itemClass = "song-card";
        if (this.state.draggedTo) {
            itemClass = "song-card-dragged-to";
        }
        return (
            <div
                id={'song-' + num}
                className={itemClass}
                onDragStart={this.handleDragStart}
                onDragOver={this.handleDragOver}
                onDragEnter={this.handleDragEnter}
                onDragLeave={this.handleDragLeave}
                onDrop={this.handleDrop}
                onDoubleClick={(e) => {
                    e.stopPropagation();
                    this.props.editCallback(this.getItemNum() - 1);
                }}
                draggable="true"
            >
                <span>{num}. </span>
                <a href={song.youTubeId} className="song-card-title">{song.title}</a>
                <span> ({song.year})</span>
                <span> by</span>
                <span className="song-card-artist"> {song.artist}</span>
                <input
                    type="button"
                    className="toolbar-button song-card-button"
                    value="⎘"
                    onClick={(e) => {
                        e.stopPropagation();
                        this.props.duplicateCallback(this.getItemNum()-1)
                    }}
                />
                <input
                    type="button"
                    className="toolbar-button song-card-button"
                    value="&#x2715;"
                    onClick={(e) => {
                        e.stopPropagation();
                        this.props.removeCallback(this.getItemNum() - 1);
                    }}
                />
            </div>
        )
    }
}