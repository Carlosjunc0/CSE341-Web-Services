const mongodb = require('mongodb');
const getDb = require('../data/database').getDb;
const ObjectId = mongodb.ObjectId;

const DATABASE_NAME = 'Project';
const COLLECTION_NAME = 'Contacts';

const getAllContacts = async (req, res) => {
    try {
        const client = getDb();
        const db = client.db(DATABASE_NAME);
        const collection = db.collection(COLLECTION_NAME);
        const contacts = await collection.find().toArray();
        res.status(200).json(contacts);
    } catch (error) {
        console.error('Error getting contacts:', error);
        res.status(500).json({
            error: 'Failed to fetch contacts',
            details: error.message
        });
    }
};

const getContactById = async (req, res) => {
    try {
        const contactId = req.params.id;
        if (!ObjectId.isValid(contactId)) {
            console.log('Invalid ID format');
            return res.status(400).json({ error: 'Invalid contact ID format' });
        }

        const client = getDb();
        const db = client.db(DATABASE_NAME);
        const collection = db.collection(COLLECTION_NAME);
        const contact = await collection.findOne({ _id: new ObjectId(contactId) });

        if (!contact) {
            console.log('Contact not found');
            return res.status(404).json({ error: 'Contact not found' });
        }

        console.log('Contact found:', contact);
        res.status(200).json(contact);

    } catch (error) {
        console.error('Error getting contact:', error);
        res.status(500).json({
            error: 'Failed to fetch contact',
            details: error.message
        });
    }
};

module.exports = {
    getAllContacts,
    getContactById
};