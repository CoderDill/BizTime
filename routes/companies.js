const express = require("express");
const ExpressError = require("../expressError");
const router = express.Router();
const db = require("../db");

router.get("/", async function (req, res, next) {
  try {
    const result = await db.query(`SELECT code, name FROM companies`);
    return res.json({ companies: result.rows });
  } catch (err) {
    return next(err);
  }
});

router.get("/:code", async function (req, res, next) {
  try {
    const { code } = req.params;
    const result = await db.query(
      `SELECT code, name, description FROM companies WHERE companies.code = $1`,
      [code]
    );
    if (result.rowCount === 0) {
      throw new ExpressError("Code not found", 404);
    }
    return res.json({ companies: result.rows });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
