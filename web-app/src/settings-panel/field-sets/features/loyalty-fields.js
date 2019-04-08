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
            {id: 'showIcons', label: 'Show Icons', type: 'checkbox'},
            {id: 'icon', label: 'Icon Image or URL', type: 'text'},
            {id: 'playAudio', label: 'Play Audio', type: 'checkbox'},
            {id: 'audio', label: 'Audio File or URL', type: 'text'},
            {id: 'audioVolume', label: 'Audio Volume', type: 'number'},
        ]
    }, permissionFields, cooldownFields, customSourceFields];
export default loyaltyFields;

