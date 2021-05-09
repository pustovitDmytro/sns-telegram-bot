import supertest from 'supertest';
import { load } from './Test';

const nodeApp = load('app').default;

supertest.agent(nodeApp);

export default supertest.agent(nodeApp);
