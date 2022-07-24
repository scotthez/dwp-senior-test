const sinon = require('sinon');

const mockRouter = sinon.stub({
  post: () => true,
});

require('../../src/pairtest/routes/tickets')(mockRouter);

describe('Testing routes', () => {
  const expectedPOSTRoutes = 1;
  it(`Should set up ${expectedPOSTRoutes} POST routes`, () => {
    sinon.assert.callCount(mockRouter.post, 1);
  });
});
