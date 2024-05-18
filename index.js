require('dotenv').config();
const simpleGit = require('simple-git');
const jsonfile = require('jsonfile');
const moment = require('moment');

const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_URL = `https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/Hugs-4-Bugs/github-streak-back.git`;
const FILE_PATH = './data.json';
const DATE = moment().subtract(1, 'd').format();

const git = simpleGit();

async function pushChanges() {
    try {
        await git.addConfig('user.name', GITHUB_USERNAME);
        await git.addConfig('user.email', 'your_email@example.com');
        await git.add('.');
        await git.commit('Automated commit');
        await git.push('origin', 'main');
        console.log('Changes pushed successfully');
    } catch (err) {
        console.error('Error pushing changes:', err);
    }
}

function updateDataFile() {
    const data = {
        date: DATE
    };
    jsonfile.writeFile(FILE_PATH, data, (err) => {
        if (err) console.error('Error writing file:', err);
        git.add([FILE_PATH]).commit(DATE, { '--date': DATE }).push('origin', 'main', (err) => {
            if (err) console.error('Error pushing changes:', err);
        });
    });
}

pushChanges();
updateDataFile();
