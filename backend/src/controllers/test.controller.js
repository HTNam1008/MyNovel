'use strict'

const test=(req, res) => {
    res.json({ message: "Hello from server!" });
  }

module.exports = { test }