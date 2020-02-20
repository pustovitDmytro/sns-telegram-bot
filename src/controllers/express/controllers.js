import { system, sessions, sns, telegram } from 'src/services';
import ExpressController from '../Base/ExpressController';
import { health, router } from './custom';

const express = new ExpressController();

const awsRouter = {
    SnsSubscriptionConfirmation : sns.Confirm,
    SnsAlarmEvent               : sns.Event
};

export default express.buildController({
    system : {
        health,
        info : system.Info
    },
    sessions : {
        check : express.makeServiceRunner(
            sessions.Check,
            undefined,
            undefined,
            ExpressController.renderAsSessionMiddlevare
        ),
        checkAWS : express.makeServiceRunner(
            sessions.CheckAWS,
            req => ({
                data : req.body
            }),
            undefined,
            ExpressController.renderAsSessionMiddlevare
        )
    },
    sns : {
        event : router.bind(null, awsRouter, express)
    },
    telegram : {
        update : telegram.ProcessUpdate
    }
});
