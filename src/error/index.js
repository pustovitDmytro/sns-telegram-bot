import X from './X';

export default X;

export class TG_ERROR extends X {
    code = 'TELEGRAM_API_ERROR'

    message = this.payload.message
}


export class ACTION_NOT_PERMITTED extends X {
    message = 'user not permitted for this action'
}

export class VALIDATION_FAILED extends X {
    message = 'validation failed'

    fields = this.payload
}
