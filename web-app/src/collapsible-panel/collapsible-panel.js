import React from 'react';
import styles from './collapsiblePanel.module.scss';

export default class CollapsiblePanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {collapsed: !!props.collapsed};
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    toggleCollapse() {
        this.setState({collapsed: !this.state.collapsed});
    }

    render() {
        return (
            <div className={styles.collapsiblePanel + ' ' + (this.state.collapsed ? styles.collapsed : '')}>
                <div className={styles.header} onClick={this.toggleCollapse}>{this.props.title}<span className={styles.icon}> </span></div>
                <div
                    className={styles.content+ ' ' + (this.state.collapsed ? styles.hidden : '')}>{this.props.children}</div>
            </div>
        )
    }
}
