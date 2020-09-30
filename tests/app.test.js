const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("../app");

chai.use(chaiHttp);

describe("routing", () => {
  describe("/GET status route", () => {
    it("it should succeed", async () => {
      const res = await chai.request(app).get("/status/").send();

      chai.assert.equal(res.status, 200);
      chai.assert.deepEqual(res.text, "OK!");
    });
  });

  describe("/GET trains route", () => {
    it("it should succeed", async () => {
      const date = "2011-12-03T10:15:30+01:00";
      const res = await chai
        .request(app)
        .get("/trains/" + date)
        .send();

      chai.assert.equal(res.status, 200);
      chai.assert.deepEqual(res.body, [
        { time: "10:10", trainID: " Train-m02" },
        { time: "11:30", trainID: " Train-m03" },
        { time: "12:50", trainID: " Train-n01" },
      ]);
    });

    it("it should fail if there is no param provided", async () => {
      const res = await chai
        .request(app)
        .get("/trains/")
        .send();

        chai.assert.equal(res.status, 404);
    });

    it("it should fail if there parameter format is not correct", async () => {
      const date = "notadate";
      const res = await chai
        .request(app)
        .get("/trains/" + date)
        .send();

        chai.assert.equal(res.status, 400);
        chai.assert.deepEqual(res.text, "The parameter format is not correct!");
    });
  });
});
