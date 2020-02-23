import awsConfirmation from './aws-confirmation';
import awsEvents from './aws-events';
import telegramUpdates from './telegram-updates';

// for tests
telegramUpdates[0].message.new_chat_member.id = +process.env.BOT_ID;

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
