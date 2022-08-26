const fs = require('fs').promises;

const readApi = async () => {
    const path = 'src/talker.json';
    try {
        const contentFile = await fs.readFile(path, 'utf8');

        return JSON.parse(contentFile);
    } catch (err) {
        console.log('Não foi possivel ler', err);
    }
};

module.exports = readApi;