import express from 'express';
import { updates } from 'src/config';
import controllers from './controllers';

const router = express.Router();
const { sessions, system, sns, telegram } = controllers;

// system
router.get('/health', system.health);
router.get('/info', system.info);

const useWebhook = updates.mode === 'webhook';

if (useWebhook) {
    router.post(`/updates/${updates.webhook}`, telegram.update);
}

router.post('/sns/:token', sessions.checkAWS, sns.event);

export default router;
