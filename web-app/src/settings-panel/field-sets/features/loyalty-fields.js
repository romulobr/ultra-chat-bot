import permissionFields from '../permissions-fields';
import cooldownFields from '../cooldown-fields';
import customSourceFields from '../custom-source-fields';

const loyaltyFields = [
    {
        label: 'Loyalty', id: 'options',
        fields: [
            {id: 'pointsPerRound', label: 'Points per round', type: 'number'},
            {id: 'subscriberMultiplier', label: 'Joined/Sub Multiplier', type: 'number'},
            {id: 'roundDurationInMinutes', label: 'Round Duration (minutes)', type: 'number'},
            {id: 'icon', label: 'Icon Image or URL', type: 'text'},
            {id: 'sound', label: 'Sound File or URL', type: 'text'}
        ]
    }, permissionFields, cooldownFields, customSourceFields];
export default loyaltyFields;

