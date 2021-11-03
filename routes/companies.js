const express = require("express");
const ExpressError = require("../expressError");
const router = express.Router();
const db = require("../db");

router.get("/", async (err, req, res, next) => {
  try {
    const { code } = req.params;
    const companies = await db.query(`SELECT * FROM companies`);
    if (companies.length === 0) {
      throw new ExpressError(`Can't find company with code ${code}`, 404);
    }
    return res.json({ companies: companies.rows });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
