const express = require('express');
const nedb = require('nedb-promises');
const cors = require('cors');

const app = express();
const port = 4000;

// Setup NeDB database
const db = nedb.create({ filename: 'myfile.jsonl', autoload: true });

app.use(express.static('public'));
app.use(cors());

// Get and increment hit count (keeping your "-page" naming format)
app.get('/hits/:pageId', async (req, res) => {
    const pageId = req.params.pageId; // Uses "home-page", "page1.html-page", etc.

    let pageData = await db.findOne({ pageId });

    if (pageData) {
        // Increment hit count
        pageData.hits += 1;
        await db.update({ pageId }, { $set: { hits: pageData.hits } });
    } else {
        // Create new entry if not found
        pageData = { pageId, hits: 1 };
        await db.insert(pageData);
    }

    res.send(pageData.hits.toString());
});


app.all('*', (req, res) => {
    res.send('This page does not exist');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
