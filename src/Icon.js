import React from "react";

class Icon extends React.Component {
    render() {
        return (
            <i className={this.props.condition}></i>
        )
    }
}

export default Icon;