const { writeFile } = require('fs').promises;
const readFile = require('../src/readApi');

const path = 'src/talker.json';

const updateTalkers = async (id, update) => {
    const talkers = await readFile();
    const talkerToUpdate = talkers.find((t) => t.id === (id));
    if (talkerToUpdate) {
        const withoutTalker = talkers.filter((t) => t.id !== (id)); 
        const updatedTalkers = [...withoutTalker, { id, ...update }];
        await writeFile(path, JSON.stringify(updatedTalkers));
    }
    return { id, ...update };
};

module.exports = { 
updateTalkers };