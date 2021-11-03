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

// router.post("/", async function (req, res, next) {
//   try {
//     const { code, name, description } = req.body;
//     const results = await db.query(
//       `INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING *`,
//       [code, name, description]
//     );
//     return res.status(201).json(results.rows[0]); //Add Status 201 for created
//   } catch (err) {
//     return next(err);
//   }
// });

router.get("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const result = await db.query(`SELECT * FROM invoices WHERE id = $1`, [id]);
    return res.json({ invoices: result.rows });
  } catch (err) {
    return next(err);
  }
});

router.gpost("/", async function (req, res, next) {
  try {
  } catch (err) {
    return next(err);
  }
});

router.get("/", async function (req, res, next) {
  try {
  } catch (err) {
    return next(err);
  }
});

router.get("/", async function (req, res, next) {
  try {
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
