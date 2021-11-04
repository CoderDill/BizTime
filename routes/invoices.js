const express = require("express");
const ExpressError = require("../expressError");
const router = express.Router();
const db = require("../db");

router.get("/", async function (req, res, next) {
  try {
    const results = await db.query(`SELECT * FROM invoices`);
    return res.json({ invoices: results.rows });
  } catch (err) {
    return next(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    const { comp_code, amt } = req.body;
    const results = await db.query(
      `INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) RETURNING *`,
      [id, comp_code, amt, paid, add_date, paid_date]
    );
    if (results.rowCount === 0) {
      throw new ExpressError("ID not found", 404);
    }
    return res.status(201).json(results.rows[0]); //Add Status 201 for created
  } catch (err) {
    return next(err);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const result = await db.query(`SELECT * FROM invoices WHERE id = $1`, [id]);
    if (result.rowCount === 0) {
      throw new ExpressError("ID not found", 404);
    }
    return res.json({ invoices: result.rows });
  } catch (err) {
    return next(err);
  }
});

router.patch("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const { amt } = req.body;
    const results = await db.query(
      `UPDATE invoices SET amt=$1 WHERE id=$2 RETURNING *`,
      [amt, id]
    );
    if (results.rowCount === 0) {
      throw new ExpressError("ID not found", 404);
    }
    return res.send(results.rows[0]);
  } catch (err) {
    return next(err);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    const results = await db.query(`DELETE FROM invoices WHERE id=$1`, [
      req.params.id,
    ]);
    return res.json({ status: "Deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
