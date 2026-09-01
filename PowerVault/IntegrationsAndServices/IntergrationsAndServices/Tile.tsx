import * as React from "react";

interface TileProps {
    title: string;
    iconName: string
}

class Tile extends React.Component<TileProps> {
    render() {
        return <div>
            {this.props.title}
        </div>
    }
}

export default Tile;