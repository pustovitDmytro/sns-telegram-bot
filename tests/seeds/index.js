import awsConfirmation from './aws-confirmation';
import awsEvents from './aws-events';
import telegramUpdates from './telegram-updates';

export {
    telegramUpdates,
    awsConfirmation,
    awsEvents
};

export default {
    telegramUpdates,
    awsConfirmation,
    awsEvents
};

export function generateTgCommand(command) {
    const tgCommand = telegramUpdates[1];

    return {
        ...tgCommand,
        message : {
            ...tgCommand.message,
            text : command
        }
    };
}
