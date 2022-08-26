const express = require('express');
const fs = require('fs').promises;

const path = 'src/talker.json';

const router = express.Router();

router.get('/', async (_req, res) => { 
    try {
      const content = await fs.readFile(path, 'utf8');
      const result = JSON.parse(content);
      return res.status(200).json(result);
    } catch (err) {
      console.log('Não foi possivel ler');
    }
  });

module.exports = router;