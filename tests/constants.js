import path from 'path';

const queries = {
    tgSendMessage : '[method=POST&url=/sendMessage&api=TelegramApiClient].data',
    awsConfirm    : '[method=GET&api=AWSApiClient].url'
};

const isBuild = process.env.BUILD && [ '1', 'true' ].includes(process.env.BUILD);
const entry = process.env.ENTRY && path.resolve(process.env.ENTRY)
|| isBuild && path.resolve(__dirname, '../lib')
|| path.resolve(__dirname, '../src');

const tmpFolder = path.join(__dirname, '../tmp/tests');

export {
    tmpFolder,
    entry,
    queries
};
