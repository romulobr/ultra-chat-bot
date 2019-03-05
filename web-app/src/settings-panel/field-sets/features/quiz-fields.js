import permissionFields from '../permissions-fields';
import cooldownFields from '../cooldown-fields';
import customSourceFields from '../custom-source-fields';

const quizFields = [
    {
        label: 'Quiz Options', id: 'options',
        fields: [
            {id: 'intervalInMinutes', label: 'Interval Between Quizzes (minutes)', type: 'number'},
            {id: 'defaultPowerReward', label: 'Default Power Reward', type: 'number'},
            {id: 'defaultLoveReward', label: 'Default Love Reward', type: 'number'},
            {
                id: 'questions', label: 'Questions', type: 'array',
                fields: [
                    {id: 'question', label: 'Question', type: 'text'},
                    {id: 'answers', label: 'Answers, separate with comma', type: 'text'},
                    {id: 'reward', label: 'Reward in points', type: 'number'},
                    {id: 'rewardCurrency', label: 'Reward Currency if applicable (love, power)', type: 'text'}
                ]
            }
        ]
    },
    permissionFields, cooldownFields, customSourceFields];
export default quizFields;

