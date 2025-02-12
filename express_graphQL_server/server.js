const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const {buildSchema} = require('graphql');

const app = express();
const port = 4000;

const schema = buildSchema(`
    type Query{
        posts:[Post],
        comments:[Comment]
    }
        type Post{
            id:ID!
            title: String!
            description : String!
            comments:[Comment]
        }

        type Comment{
            id:ID!
            text: String!
            likes: Int
        }
    `);



const root ={
    posts:[
    {
        id:'post1',
        title:'It is a first post',
        description: 'It is a first post description',
        Comments:[{
            id:'comment1',
            text:'It is a first comment',
            likes:1
        }]
    },
    {
        id:'post2',
        title:'It is a first post',
        description: 'It is a first post description',
        Comments:[]
    }
    ],
    Comments:[
    {
        id:'comment1',
        text: 'It is a first comment',
        likes:1
    }
    ]
}

app.use('/graphql',graphqlHTTP({
    schema:schema,
    rootValue:root,
    graphiql:true
}))



app.listen(port,()=>{
    console.log('서버가 4000번 포트에서 실행중입니다')
})