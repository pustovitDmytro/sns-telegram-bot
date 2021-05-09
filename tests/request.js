import { supertest } from 'rest-chronicle';
import { load } from './Test';

const nodeApp = load('app').default;

export default supertest(nodeApp);
