const express = require("express");
const ExpressError = require("../expressError");
const router = express.Router();
const db = require("../db");
const slugify = require("slugify");

router.get("/", async function (req, res, next) {
  try {
    const results = await db.query(
      `SELECT code, name, description FROM companies`
    );
    return res.json({ companies: results.rows });
  } catch (err) {
    return next(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    const { code, name, description } = req.body;
    const slugify_code = slugify(code, {
      replacement: "_",
      lower: true,
    });
    const results = await db.query(
      `INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING *`,
      [slugify_code, name, description]
    );
    return res.status(201).json(results.rows[0]); //Add Status 201 for created
  } catch (err) {
    return next(err);
  }
});

router.get("/:code", async function (req, res, next) {
  try {
    let code = req.params.code;

    const compResult = await db.query(
      `SELECT code, name, description
           FROM companies
           WHERE code = $1`,
      [code]
    );

    const invResult = await db.query(
      `SELECT id
           FROM invoices
           WHERE comp_code = $1`,
      [code]
    );

    if (compResult.rows.length === 0) {
      throw new ExpressError(`No company code: ${code}`, 404);
    }

    const company = compResult.rows[0];
    const invoices = invResult.rows;

    company.invoices = invoices.map((invoice) => invoice.id);

    return res.send(company);
  } catch (err) {
    return next(err);
  }
});

router.patch("/:code", async function (req, res, next) {
  try {
    const { code } = req.params;
    const { name, description } = req.body;
    const results = await db.query(
      `UPDATE companies SET name=$1, description=$2 WHERE code=$3 RETURNING *`,
      [name, description, code]
    );
    return res.send(results.rows[0]);
  } catch (err) {
    return next(err);
  }
});

router.delete("/:code", async function (req, res, next) {
  try {
    const results = await db.query(`DELETE FROM companies WHERE code=$1`, [
      req.params.code,
    ]);
    return res.json({ status: "Deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
