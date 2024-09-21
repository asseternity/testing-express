const request = require('supertest');
const express = require('express');
const app = express();
const prisma = require('./prismaClient');
const indexRoute = require('./routes/indexRoute');

app.use(express.urlencoded({ extended: true }));
app.use('/', indexRoute);

// test logic
test("index route works", done => {
    request(app)
        .get('/')
        .expect("Content-Type", /json/)
        .expect({ name: "someName" })
        .expect(200, done);
});

test("test route works", done => {
    request(app)
        .post('/test')
        .type('form')
        .send({ item: 'hey' })
        .then(() => {
            request(app)
                .get('test')
                .expect({ array: ['hey'] }, done);
        });
});

// test DB

// seed data
beforeAll(async () => {
    // Clear existing data
    await prisma.comment.deleteMany();
    await prisma.post.deleteMany();    
    // Seed posts
    const post1 = await prisma.post.create({
        data: {
            text: "First post",
            author: "Author One",
            added: new Date(),
        },
    });
    const post2 = await prisma.post.create({
        data: {
            text: "Second post",
            author: "Author Two",
            added: new Date(),
        },
    });
    // Seed comments
    await prisma.comment.createMany({
        data: [
            {
                author: "Commenter One",
                text: "First comment on post 1",
                post_id: post1.id,
            },
            {
                author: "Commenter Two",
                text: "First comment on post 2",
                post_id: post2.id,
            },
        ],
    });
});

// test db
test("index route works", done => {
    request(app)
        .get('/post/1')
        .expect({ text: "First post" })
        .expect(200, done);
});
