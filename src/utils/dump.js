function formatDate(tgDate) {
    return (new Date(tgDate * 1000)).toISOString();
}

export function dumpUpdate(update) {
    return {
        id      : update.update_id,
        message : dumpMessage(update.message)
    };
}

export function dumpMessage(message) {
    if (!message) return null;
    const from = dumpSender(message.from);
    const to = dumpSender(message.chat);
    const forward = message.forward_from || message.forward_from_chat;

    if (forward) {
        from.forward = dumpSender(forward);
        from.forward.date = formatDate(message.forward_date);
    }

    return {
        id      : message.message_id,
        from,
        to,
        payload : {
            text    : message.text,
            sticker : dumpSticker(message.sticker)
        },
        date : formatDate(message.date)
    };
}

export function dumpSender(s) {
    if (!s) return null;

    return s.id > 0
        ? dumpUser(s)
        : dumpChat(s);
}


export function dumpUser(user) {
    return {
        id    : user.id,
        type  : user.is_bot ? 'BOT' : 'USER',
        name  : `${user.last_name || ''} ${user.first_name || ''}`.trim(),
        login : user.username
    };
}

const CHAT_TYPES = {
    private    : 'PRIVATE',
    group      : 'GROUP',
    supergroup : 'SUPER_GROUP',
    channel    : 'CHANNEL'
};

export function dumpChat(chat) {
    return {
        id    : chat.id,
        type  : CHAT_TYPES[chat.type],
        name  : chat.title,
        login : chat.username
    };
}

export function dumpSticker(sticker) {
    if (!sticker) return undefined;

    return {
        id     : sticker.file_id,
        width  : sticker.width,
        height : sticker.height,
        size   : sticker.file_size
    };
}
