import {listContacts, getContactById, removeContact, addContact} from "./contacts.js"
import {Command} from "commander"

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
            listContacts().then(res => console.log(res))
            break;

        case "get":
            getContactById(id).then(res => console.log(res))
            break;

        case "add":
            addContact(name, email, phone).then(res => console.log(res))
            break;

        case "remove":
            removeContact(id).then(res => console.log(res))
            break;

        default:
            console.warn("\x1B[31mUnknown action type!");
    }

}

invokeAction(argv)