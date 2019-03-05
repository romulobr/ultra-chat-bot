import permissionFields from '../permissions-fields';
import cooldownFields from '../cooldown-fields';
import customSourceFields from '../custom-source-fields';

const chickenFields = [
    {
        label: 'Chicken Options', id: 'options',
        fields: [
            {id: 'enableSound', label: 'Enable Sound', type: 'checkbox'},
            {id: 'sayCommand', label: 'Say Command', type: 'text'},
            {id: 'moveCommand', label: 'Move Command', type: 'text'}
        ]
    },
    permissionFields, cooldownFields, customSourceFields];

export default chickenFields;
