const express = require('express');
const fs = require('fs').promises;
const generateToken = require('../../utils/generateToken');
const loginValidation = require('../../middlewares/loginValidation');
const {
    // emailAndPasswordValidation,
    nameValidation,
    ageValidation,
    watchedAtValidation,
    rateValidation,
    talkValidation,
    tokenValidation,
} = require('../../middlewares/signupValidation');

const path = 'src/talker.json';

const router = express.Router();
const readApi = require('../readApi');

router.get('/talker', async (_req, res) => { 
    try {
      const content = await fs.readFile(path, 'utf8');
      const result = JSON.parse(content);
      return res.status(200).json(result);
    } catch (err) {
      console.log('Não foi possivel ler');
    }
  });

router.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const talkers = await readApi();
    const talkerById = talkers.filter((t) => t.id === Number(id));
    if (talkerById.length <= 0) {
        return res.status(404).json({
            message: 'Pessoa palestrante não encontrada',
        });
        }
        return res.status(200).json(talkerById[0]);
});

router.post('/login', loginValidation, (_req, res) => {
    const token = generateToken();

    return res.status(200).json({
        email: 'email@email.com',
        password: '123456',
        token,
    });
});

// router.post('/talker', 
// tokenValidation,
// nameValidation,
// ageValidation,
// talkValidation,
// watchedAtValidation,
// rateValidation,
// async (req, res) => {
//     const talkers = await readApi();
//     const { name, age, talk } = req.body;
//     const newTalkers = [...talkers];
//     return res.status(201).json(newTalkers);
// });

module.exports = router;