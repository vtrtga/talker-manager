const express = require('express');
const fs = require('fs').promises;
const generateToken = require('../../utils/generateToken');
const loginValidation = require('../../middlewares/loginValidation');
const { updateTalkers, deleteTalkers } = require('../../utils/helpers');

const { writeFile, readFile } = fs;
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

router.delete('/talker/:id', tokenValidation, (req, res) => {
  const { id } = req.params;
  const callDelete = deleteTalkers(id);
  console.log(callDelete);
  return res.status(204).json();
});

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

router.post('/talker', 
tokenValidation,
nameValidation,
ageValidation,
talkValidation,
watchedAtValidation,
rateValidation,
 async (req, res) => {
   const talker = req.body;
   try {
     const oldTalkers = await readFile(path, 'utf8');
     const parseOldTalkers = JSON.parse(oldTalkers);
     const id = parseOldTalkers.length + 1;
     const newTalkers = [...parseOldTalkers, { id, ...talker }];
    const write = await writeFile(path, JSON.stringify(newTalkers));
    console.log(typeof write);
    return res.status(201).json({ id, ...talker });
   } catch (err) {
      res.status(400).json({
        message: err.message,
      });
     }
});

router.put('/talker/:id', 
tokenValidation,
nameValidation,
ageValidation,
talkValidation,
watchedAtValidation,
rateValidation,
 async (req, res) => {
  const { id } = req.params;
  const b = req.body;
  const update = await updateTalkers(Number(id), b);
  console.log(update);
  return res.status(200).json(update);
});

module.exports = router;