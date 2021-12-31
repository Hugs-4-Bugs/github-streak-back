const jsonfile = require('jsonfile');
const simpleGit = require('simple-git');
const moment = require('moment');

const git = simpleGit();

async function backfill() {
    const startDate = moment('2022-01-01');
    const endDate = moment('2022-12-31');
    const dateFormat = 'YYYY-MM-DDTHH:mm:ssZ';

    let currentDate = startDate.clone();

    while (currentDate.isSameOrBefore(endDate)) {
        const dateString = currentDate.format(dateFormat);
        console.log(`Committing for date: ${dateString}`);
        
        // 1. data.json me current date likho
        jsonfile.writeFileSync('data.json', { date: dateString });
        
        // 2. Git ko batao ki commit kis date pe karna hai
        process.env.GIT_AUTHOR_DATE = dateString;
        process.env.GIT_COMMITTER_DATE = dateString;
        
        // 3. Commit karo
        await git.add('./*');
        await git.commit(`Streak backfill for ${dateString}`);
        
        // 4. Agli date pe jao
        currentDate.add(1, 'day');
    }
    
    console.log('Pushing all changes to GitHub...');
    await git.push('origin', 'main');
    console.log('Done! Sabhi commits push ho gaye.');
}

backfill().catch(err => console.error(err));