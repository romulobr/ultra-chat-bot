import permissionFields from '../permissions-fields';
import cooldownFields from '../cooldown-fields';
import customSourceFields from '../custom-source-fields';

const loyaltyFields = [
    {
        label: 'Loyalty Options', id: 'options',
        fields: [
            {id: 'pointsPerRound', label: 'Points per round', type: 'number'},
            {id: 'subscriberMultiplier', label: 'Joined/Sub Multiplier', type: 'number'},
            {id: 'roundDurationInMinutes', label: 'Round Duration (minutes)', type: 'number'},
            {id: 'enableSound', label: 'Plays sound when giving love', type: 'checkbox'},
            {id: 'sound', label: 'Sound File or URL', type: 'text'},
            {id: 'showIcon', label: 'Show Icon when giving love', type: 'checkbox'},
            {id: 'icon', label: 'Icon Image or URL', type: 'text'}
        ]
    },permissionFields, cooldownFields, customSourceFields];
export default loyaltyFields;

