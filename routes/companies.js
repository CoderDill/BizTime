const express = require("express");
const ExpressError = require("../expressError");
const router = express.Router();
const db = require("../db");

router.get("/", async function (req, res, next) {
  try {
    const results = await db.query(`SELECT code, name, description FROM companies`);
    return res.json({ companies: results.rows });
  } catch (err) {
    return next(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    const { code, name, description } = req.body;
    const results = await db.query(
      `INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING *`,
      [code, name, description]
    );
    return res.status(201).json(results.rows[0]); //Add Status 201 for created
  } catch (err) {
    return next(err);
  }
});

router.get("/:code", async function (req, res, next) {
  try {
    const { code } = req.params;
    const results = await db.query(
      `SELECT code, name, description FROM companies WHERE companies.code = $1`,
      [code]
    );
    if (results.rowCount === 0) {
      throw new ExpressError("Code not found", 404);
    }
    return res.json({ companies: results.rows });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
