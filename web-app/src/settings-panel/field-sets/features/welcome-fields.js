import permissionFields from '../permissions-fields';
import cooldownFields from '../cooldown-fields';
import customSourceFields from '../custom-source-fields';

const welcomeFields = [
    {
        label: 'Welcome', id: 'options',
        fields: [
            {id: 'saveCommand', label: 'Save Command', type: 'text'},
            {id: 'showCommand', label: 'Show Command', type: 'text'}
        ]
    },
    permissionFields, cooldownFields, customSourceFields];
export default welcomeFields;

