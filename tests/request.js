import supertest from 'supertest';
import nodeApp from 'src/app';

supertest.agent(nodeApp);

export default supertest.agent(nodeApp);
