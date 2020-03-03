// commands
const start = require("./commands/start")

module.exports = (cmd, client, msg, args) => {
    switch (cmd) {
        case 'start': return start()
    }
}