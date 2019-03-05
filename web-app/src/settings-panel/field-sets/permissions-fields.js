const permissionsFields = {
    label: 'Permissions', id: 'permissions', fields: [
        {id: 'simpleCommands', label: 'SimpleCommands (No !)', type: 'checkbox'},
        {id: 'allowNormalUsers', label: 'Allow Normal Users', type: 'checkbox'},
        {id: 'allowVips', label: 'Allow Vips', type: 'checkbox'},
        {id: 'allowModerators', label: 'Allow Moderators', type: 'checkbox'},
        {id: 'allowSubscribersMembers', label: 'Allow Subscribers/Members', type: 'checkbox'}
    ]
};
export default permissionsFields;
