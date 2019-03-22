import permissionFields from '../permissions-fields';
import cooldownFields from '../cooldown-fields';
import customSourceFields from '../custom-source-fields';

const iconsFields = [
    permissionFields, cooldownFields, customSourceFields,
    {
        label: 'Icons', id: 'options',
        fields: [
            {
                id: 'icons', label: 'Icons', type: 'array',
                fields: [
                    {id: 'words', label: 'Words', type: 'text'},
                    {id: 'image', label: 'Image', type: 'text'}
                ]
            }
        ]
    }];
export default iconsFields;
