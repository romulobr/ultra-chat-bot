import permissionFields from '../permissions-fields';
import cooldownFields from '../cooldown-fields';
import customSourceFields from '../custom-source-fields';

const iconsFields = [
    {
        label: 'Icons Options', id: 'options',
        fields: [
            {
                id: 'icons', label: 'Icons', type: 'array',
                fields: [
                    {id: 'words', label: 'Words', type: 'text'},
                    {id: 'image', label: 'Image: (file in media folder or internet url)', type: 'text'}
                ]
            }
        ]
    }, permissionFields, cooldownFields, customSourceFields];
export default iconsFields;
