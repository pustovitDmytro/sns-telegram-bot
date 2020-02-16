import { system, sessions } from 'src/services';
import ExpressController from '../Base/ExpressController';
import { health, router } from './custom';

const express = new ExpressController();

const awsRouter = {
    SnsSubscriptionConfirmation : '',
    SnsAlarmEvent               : ''
};

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
        ),
        checkAWS : express.makeServiceRunner(
            sessions.CheckAWS,
            undefined,
            undefined,
            ExpressController.renderAsSessionMiddlevare
        )
    },
    sns : {
        event : router.bind(awsRouter, express)
    }
});
