import {listContacts, getContactById, removeContact, addContact} from "./contacts.js"
import {Command} from "commander"
import colors from "colors"

const program = new Command()

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone")
program
    .parse(process.argv)

const argv = program.opts()
const invokeAction = ({action, id, name, email, phone}) => {
    switch (action) {
        case "list":
            return listContacts().then(res => console.log(colors.green(res)))

        case "get":
            return getContactById(id).then(res => console.log(colors.green(res)))

        case "add":
            return addContact(name, email, phone).then(res =>
                console.log(colors.green(JSON.stringify(res, null, 2))))

        case "remove":
            return removeContact(id).then(res => console.log(colors.red(res)))

        default:
            console.log("Unknown action type!".yellow)
    }

}

invokeAction(argv)