const express = require("express");
const ExpressError = require("../expressError");
const router = express.Router();
const db = require("../db");

// router.get("/", async function (req, res, next) {
//   try {
//     const result = await db.query(
//       `SELECT code, name
//            FROM companies
//            ORDER BY name`
//     );

//     return res.json({ companies: result.rows });
//   } catch (err) {
//     return next(err);
//   }
// });

// router.get("/", async function (err, req, res, next) {
//   try {
//     const { code } = req.params;
//     const companies = await db.query(`SELECT * FROM companies`);
//     if (companies.length === 0) {
//       throw new ExpressError(`Can't find company with code ${code}`, 404);
//     }
//     return res.json({ companies: companies.rows });
//   } catch (err) {
//     return next(err);
//   }
// });

module.exports = router;
