import permissionFields from '../permissions-fields';
import cooldownFields from '../cooldown-fields';
import customSourceFields from '../custom-source-fields';

const quizFields = [
    {
        label: 'Media Options', id: 'options',
        fields: [
            {id: 'defaultCost', label: 'Cost', type: 'number'},
            {id: 'defaultVolume', label: 'Volume (from 0 to 1)', type: 'number'},
            {
                id: 'items', label: 'Media Items', type: 'array',
                fields: [
                    {id: 'command', label: 'Command', type: 'text'},
                    {id: 'url', label: 'url', type: 'text'},
                    {id: 'volumeOverride', label: 'Volume', type: 'number'},
                    {id: 'costOverride', label: 'Cost', type: 'text'},
                    {id: 'sourceOverride', label: 'Source', type: 'text'}
                ]
            }
        ]
    }, {
        label: 'Loyalty', id: 'loyalty',
        fields: [
            {id: 'streamElements', label: 'Use StreamElements Loyalty', type: 'checkbox'},
            {id: 'streamlabs', label: 'Use StreamLabs Loyalty', type: 'checkbox'},
            {id: 'nativePower', label: 'Use Native Loyalty Power', type: 'checkbox'},
            {id: 'nativeLove', label: 'Use Native Loyalty Love', type: 'checkbox'}]
    },
    permissionFields, cooldownFields, customSourceFields];
export default quizFields;

