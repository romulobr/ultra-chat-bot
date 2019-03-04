import React from 'react';
import {connect} from 'react-redux';
import actionsFor from './settings-actions';

import SettingsForm from './settings-form';

class SettingsPanel extends React.Component {
    render() {
        const {error, id, save, fetch, enabled, fieldSets, data} = this.props;
        return (
            <div>
                <h2>{this.props.error}</h2>
                <SettingsForm
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

function connectedSettingsFor(id, fieldSets) {
    const actions = actionsFor(id);

    function mapStateToProps(state) {
        return {
            id,
            fieldSets,
            ...state[id]
        };
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
