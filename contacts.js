import fs from "fs/promises"
import path from "path"
import {nanoid} from "nanoid"

const contactsPath = path.resolve("./", "db/contacts.json")
export const listContacts = async () => {
    const contactsString = await fs.readFile(contactsPath, {encoding: "utf-8"})

    try {
        const contactsArray = JSON.parse(contactsString)

        return contactsArray
    } catch (e) {
        console.log(`${e.name}: ${e.message}`.red)
        console.log(`Check ${path.basename(contactsPath)} format`.blue)

        return []
    }
}

export const getContactById = async contactId => {
    const contacts = await listContacts()
    const contact = contacts.find(contact => contact.id === contactId)

    return contact || null
}

export const removeContact = async contactId => {
    const contacts = await listContacts()
    const contact = contacts.find(contact => contact.id === contactId)

    if (contact) {
        const newContacts = contacts.filter(contact => contact.id !== contactId)
        await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2))

        return contact
    }

    return null
}

export const addContact = async (name, email, phone) => {
    const contacts = await listContacts()
    const contact = {
        id: nanoid(), name, email, phone,
    }

    contacts.push(contact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))

    return contact
}