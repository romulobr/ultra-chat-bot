import permissionFields from '../permissions-fields';
import cooldownFields from '../cooldown-fields';
import customSourceFields from '../custom-source-fields';

const newsFields = [
    {
        label: 'News Options', id: 'options',
        fields: [
            {id: 'playAudio', label: 'Play Audio', type: 'checkbox'},
            {id: 'audioUrl', label: 'Audio (file in media folder or internet url)', type: 'text'},
            {id: 'getLinkCommand', label: 'Get Link command', type: 'text'},
            {id: 'fetchIntervalInMinutes', label: 'Refresh news every X (minutes)', type: 'number'},
            {id: 'showIntervalInMinutes', label: 'Show news every X (minutes)', type: 'number'},
            {id: 'maximumDescriptionSize', label: 'Maximum description size (characters)', type: 'number'},
            {id: 'screenTime', label: 'Time on screen (seconds)', type: 'number'},
            {
                id: 'newsFeeds', label: 'RSS News Feeds', type: 'array',
                fields: [
                    {id: 'url', label: 'Feed URL', type: 'text'},
                    {id: 'encoding', label: 'Character encoding', type: 'text'}
                ]
            }
        ]
    },permissionFields, cooldownFields, customSourceFields];
export default newsFields;
