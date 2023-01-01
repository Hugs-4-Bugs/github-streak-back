// const jsonfile = require('jsonfile');
// const simpleGit = require('simple-git');
// const moment = require('moment');

// const git = simpleGit();

// async function randomBackfill() {
//     const startDate = moment('2022-01-01');
//     const endDate = moment('2022-12-31');

//     let currentDate = startDate.clone();

//     while (currentDate.isSameOrBefore(endDate)) {
//         // 1 se 25 ke beech random commits generate karo
//         // Agar tumhe max 25 se zyada chahiye toh 25 ki jagah koi aur number likho
//         const numCommits = Math.floor(Math.random() * 25) + 1; 
        
//         console.log(`Date: ${currentDate.format('YYYY-MM-DD')} | Total Commits: ${numCommits}`);

//         for (let i = 1; i <= numCommits; i++) {
//             // Random time generate karo (0 se 23 ghante, 0 se 59 minute, 0 se 59 second)
//             const randomHour = Math.floor(Math.random() * 24).toString().padStart(2, '0');
//             const randomMinute = Math.floor(Math.random() * 60).toString().padStart(2, '0');
//             const randomSecond = Math.floor(Math.random() * 60).toString().padStart(2, '0');
            
//             // Final date string format: YYYY-MM-DDTHH:mm:ss+05:30
//             const dateString = `${currentDate.format('YYYY-MM-DD')}T${randomHour}:${randomMinute}:${randomSecond}+05:30`;

//             // data.json me change karo taaki Git commit kar sake
//             jsonfile.writeFileSync('data.json', { 
//                 date: dateString,
//                 commit_number: i,
//                 total_commits_today: numCommits
//             });

//             // Git ko batao ki commit kis date aur time pe karna hai
//             process.env.GIT_AUTHOR_DATE = dateString;
//             process.env.GIT_COMMITTER_DATE = dateString;

//             // Commit karo
//             await git.add('./*');
//             await git.commit(`Random commit ${i}/${numCommits} for ${currentDate.format('YYYY-MM-DD')}`);
//         }

//         // Agli date pe jao
//         currentDate.add(1, 'day');
//     }

//     console.log('Sabhi commits ban gaye. Ab GitHub pe push kar rahe hain...');
    
//     // Push karo (agar main branch nahi hai toh master try karega)
//     try {
//         await git.push('origin', 'main');
//         console.log('Successfully pushed to main branch!');
//     } catch (error) {
//         console.log('Main branch push fail hua, master try kar rahe hain...');
//         await git.push('origin', 'master');
//         console.log('Successfully pushed to master branch!');
//     }
    
//     console.log('Done! GitHub profile check karo 1-2 minute baad.');
// }

// randomBackfill().catch(err => console.error('Error aaya:', err));



const jsonfile = require('jsonfile');
const simpleGit = require('simple-git');
const moment = require('moment');

const git = simpleGit();

async function randomBackfill() {
    // YAHAN DATES CHANGE KARNI HAIN
    // Screenshot ke hisaab se Jan 1 se March 15 tak khali hai
    const startDate = moment('2023-01-01');
    const endDate = moment('2023-03-15');

    let currentDate = startDate.clone();

    while (currentDate.isSameOrBefore(endDate)) {
        // 1 se 25 ke beech random commits generate karo
        const numCommits = Math.floor(Math.random() * 25) + 1; 
        
        console.log(`Date: ${currentDate.format('YYYY-MM-DD')} | Total Commits: ${numCommits}`);

        for (let i = 1; i <= numCommits; i++) {
            // Random time generate karo (0 se 23 ghante, 0 se 59 minute, 0 se 59 second)
            const randomHour = Math.floor(Math.random() * 24).toString().padStart(2, '0');
            const randomMinute = Math.floor(Math.random() * 60).toString().padStart(2, '0');
            const randomSecond = Math.floor(Math.random() * 60).toString().padStart(2, '0');
            
            // Final date string format: YYYY-MM-DDTHH:mm:ss+05:30
            const dateString = `${currentDate.format('YYYY-MM-DD')}T${randomHour}:${randomMinute}:${randomSecond}+05:30`;

            // data.json me change karo taaki Git commit kar sake
            jsonfile.writeFileSync('data.json', { 
                date: dateString,
                commit_number: i,
                total_commits_today: numCommits
            });

            // Git ko batao ki commit kis date aur time pe karna hai
            process.env.GIT_AUTHOR_DATE = dateString;
            process.env.GIT_COMMITTER_DATE = dateString;

            // Commit karo
            await git.add('./*');
            await git.commit(`Random commit ${i}/${numCommits} for ${currentDate.format('YYYY-MM-DD')}`);
        }

        // Agli date pe jao
        currentDate.add(1, 'day');
    }

    console.log('Missing dates ke commits ban gaye. Ab GitHub pe push kar rahe hain...');
    
    try {
        await git.push('origin', 'main');
        console.log('Successfully pushed to main branch!');
    } catch (error) {
        console.log('Main branch push fail hua, master try kar rahe hain...');
        await git.push('origin', 'master');
        console.log('Successfully pushed to master branch!');
    }
    
    console.log('Done! GitHub profile check karo 1-2 minute baad.');
}

randomBackfill().catch(err => console.error('Error aaya:', err));