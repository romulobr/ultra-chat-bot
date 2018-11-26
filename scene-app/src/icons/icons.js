import React, {Component} from 'react';
import {connect} from 'react-redux';
import './icons.scss';
import Icon from './icon';

class Icons extends Component {

    constructor() {
        super();
        this.deleteIcon = this.deleteIcon.bind(this);
        this.state = {icons: []};
    }

    deleteIcon(icon) {
        const newIcons = [].concat(this.state.icons);
        const index = newIcons.indexOf(icon);
        if (index !== -1) {
            newIcons.splice(index, 1);
        }
        this.setState({icons: newIcons});
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {
        if (prevProps.id !== this.props.id) {
            const newIcons = [].concat(this.state.icons);

            const newIcon = {
                icon: this.props.icon,
                key: 'icon-' + this.props.icon + '-' + this.props.id,
                bottom: (Math.random() * (window.innerHeight - 200)) + 200,
                left: Math.random() * window.innerWidth,
            };
            newIcon.onComplete = () => {
                console.log('deleting icon ', this.props.id);
                this.deleteIcon(newIcon)
            };
            newIcons.push(newIcon);

            this.setState({icons: newIcons});
        }
    }

    renderIcons() {
        return this.state.icons.map((icon) =>
            (<Icon icon={icon.icon}
                   key={icon.key}
                   bottom={icon.bottom}
                   left={icon.left}
                   onComplete={icon.onComplete}
                />
            )
        )
    }

    render() {
        return (
            <div className="application icons">
                {this.renderIcons()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        ...state.icons
    };
}

export default connect(mapStateToProps)(Icons);
