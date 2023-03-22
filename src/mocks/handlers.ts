import { rest } from 'msw';

import { userFixture } from '../hooks/global/Authorization/__fixtures__/user.fixture';
import { inspectionHandlers } from './routes/operations/inspections.route';

export const handlers = [
  rest.post('https://api.stage.io/api/login', (_req, res, ctx) => {
    console.log('hihihihihi');

    return res(ctx.json({ status: 'success', data: userFixture }));
  }),
  ...inspectionHandlers,
];
