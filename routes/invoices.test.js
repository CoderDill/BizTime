process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const db = require("../db");

let testInvoice;
beforeEach(async () => {
  const result = await db.query(
    `INSERT INTO invoices (comp_Code, amt, paid, paid_date) VALUES ('apple', 100, false, null)
        RETURNING *`
  );
  testInvoice = result.rows[0];
});

afterEach(async () => {
  await db.query(`DELETE FROM invoices`);
});

afterAll(async () => {
  await db.end();
});

describe("GET /invoices", function () {
  test("Get a list wtih one invoice", async () => {
    const res = await request(app).get("/invoices");
    expect(res.statusCode).toBe(200);
  });
});
