import express from 'express';
import { updates, isTest } from 'src/config';
import controllers from './controllers';

const router = express.Router();
const { sessions, system } = controllers;

// system
router.get('/health', system.health);
router.get('/info', system.info);

const useWebhook = updates.mode === 'webhook' || isTest;

if (useWebhook) {
    router.post(`/updates/${updates.webhook}`, controllers.updates.process);
}

export default router;
