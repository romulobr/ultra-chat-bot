import React from 'react';
import {connect} from 'react-redux';
import actionsFor from './settings-actions';
import SettingsForm from './settings-form';
import styles from './settings-panel.module.scss';

const deepmerge = require('deepmerge');

class SettingsPanel extends React.Component {
    render() {
        const {error, id, save, fetch, enabled, fieldSets, data} = this.props;
        return (
            <div className={styles.settingsPanel}>
                <h2>{this.props.error}</h2>
                <SettingsForm className={styles.settingsForm}
                              fieldSets={fieldSets}
                              id={id}
                              onSave={save}
                              onFetch={fetch}
                              enabled={!error && enabled}
                              error={JSON.stringify(error)}
                              data={data}
                              onData={() => {
                                  console.log('got data')
                              }
                              }/>
            </div>
        );
    }
}

function connectedSettingsFor(id, fieldSets, extraIds) {
    const actions = actionsFor(id);

    function mapStateToProps(state) {
        let newProps = {
            id,
            fieldSets,
            ...state[id]
        };
        if (extraIds) {
            const objectsToMerge = [newProps];
            extraIds.forEach(extraId => {
                objectsToMerge.push(state[extraId]);
            });
            deepmerge.all(objectsToMerge);
            console.log('new props', newProps);
        }
        return newProps;
    }

    const mapDispatchToProps = dispatch => {
        return {
            save: (options) => {
                dispatch(actions.save(options))
            },
            fetch: () => {
                dispatch(actions.fetch())
            }
        };
    };

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(SettingsPanel);
}

export default connectedSettingsFor;
