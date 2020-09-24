const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("../app");

chai.use(chaiHttp);

describe("routing", () => {
  describe("/GET status route", () => {
    it("it should succeed", async () => {
      const res = await chai
      .request(app)
      .get(
        "/status/")
      .send();

      chai.assert.equal(res.status, 200);
      chai.assert.deepEqual(res.text, "OK!");
    });
  });
});
