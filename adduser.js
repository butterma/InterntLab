const User = require('./model')("User");
const prompt = require('./prompt');
const timeout = require('./timeout');
(async () => {
    console.clear();
    await timeout(500);
    while (true) {
        let user = [];
        console.log();
        user[0] = await prompt("Please enter username: ");//await prompt("Please enter user's name: ");
        user[1] = await prompt('Please enter password: ');
        user[2] = await prompt('Please enter user category: 1-MANGER 2-WORKER 3-CUSTOMER 4-SUPPLIER ');
        //let admin =  await prompt('Please enter admin status: ');
        user[3] = 1;
        console.log(user);
        try {
            await User.CREATE(user);
            console.log('User created:' + user);
        } catch(err) { throw err; }
    }
})();
