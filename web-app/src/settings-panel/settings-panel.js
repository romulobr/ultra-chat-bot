import React from 'react';
import {connect} from 'react-redux';
import actionsFor from './settings-actions';
import SettingsForm from './settings-form';
import {Alert} from "@smooth-ui/core-sc/dist/smooth-ui-core-sc";

class SettingsPanel extends React.Component {
    render() {
        const {error, id, save, fetch, enabled, fieldSets, data} = this.props;
        return (
            <>
                {this.props.error && <Alert variant="danger">{JSON.stringify(this.props.error)}</Alert>}
                <SettingsForm fieldSets={fieldSets}
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
            </>
        );
    }
}

function connectedSettingsFor(id, fieldSets, extraIds) {
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
