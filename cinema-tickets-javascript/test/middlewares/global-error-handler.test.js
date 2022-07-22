
const sandbox = require("sinon").createSandbox();
const chai = require('chai');
const chaiHttp = require('chai-http');
const InternalServerError = require("../../src/pairtest/lib/errors/InternalServerError");
const { expect, assert } = chai;
chai.use(chaiHttp);

describe("Global Error Handler Tests", () => {
  let { app } = require("../../src/app");

  afterEach(() => {
    sandbox.restore();
  });

  it(`Test 404 is returned from unknown route`, async () => {
    const result = await chai.request(app).get('/not-found');
    expect(result.status).to.eq(404);
  });

  it(`Test purchase that fails validation so returns 400`, async () => {
    const result = await chai.request(app).post('/purchase').send({ accountId: 0 });
    console.log(result);
    expect(result.status).to.eq(400);
  });


  it(`Test 500 is returned from unknown route`, async () => {
    const express = require("express");
    const app500 = express();
    app500.get('/500', (req,res,next)=> {
      next(new InternalServerError("Test"))
    });
    require("../../src/pairtest/middlewares/global-error-handler")(app500);
    app500.listen(process.env.PORT+1, () => {});
    const result = await chai.request(app500).get('/500');
    expect(result.status).to.eq(500);
  });



});