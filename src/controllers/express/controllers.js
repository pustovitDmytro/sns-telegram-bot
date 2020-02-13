import { system, sessions } from 'src/services';
import ExpressController from '../Base/ExpressController';
import { health } from './custom';

const express = new ExpressController();

export default express.buildController({
    system : {
        health,
        info : system.Info
    },
    sessions : {
        check : express.makeServiceRunner(
            sessions.Check,
            req => ({
                token : req.params.token
            }),
            undefined,
            ExpressController.renderAsSessionMiddlevare
        )
    }
});
