process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const db = require("../db");

let testCompany;

beforeEach(async () => {
  const result = await db.query(
    `INSERT INTO companies (code, name, description) VALUES ('mac', 'Macintosh', 'Tech')
        RETURNING *`
  );

  testCompany = result.rows[0];
});

afterEach(async () => {
  await db.query(`DELETE FROM companies`);
});

afterAll(async () => {
  await db.end();
});

describe("GET /companies", function () {
  test("Get a list wtih one company", async () => {
    const res = await request(app).get("/companies");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ companies: [testCompany] });
  });
});

describe("GET /companies/:code", function () {
  test("Get a single company", async () => {
    const res = await request(app).get(`/companies/${testCompany.code}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ company: testCompany });
  });
  test("Responds with 404 for invalid code", async () => {
    const res = await request(app).get(`/companies/asdfasdf`);
    expect(res.statusCode).toBe(404);
  });
});

describe("POST /companies", () => {
  test("Create a single company", async function () {
    const res = await request(app)
      .post("/companies")
      .send({ comp_code: "eaze", name: "Eaze", description: "Delivery" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
      company: { comp_code: "eaze", name: "Eaze", description: "Delivery" },
    });
  });
});
