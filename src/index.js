const { ApolloServer, gql, PubSub } = require('apollo-server');
const pubsub = new PubSub();

const { TodoAPI } = require('./todo.api')
const todoResolvers = require('./todo.resolvers')(pubsub)

const typeDefs = gql`
  type Todo {
    id: String
    name: String
    completed: Boolean
    lastModificationDate: String
  }

  input ToggleCompletedTodoInput {
    id: String
    completed: Boolean
  }

  input RenameTodoInput {
    id: String
    name: String
  }

  type Query {
    getTodos: [Todo]
  }

  type Mutation {
    createTodo(name: String): Todo
    toggleCompletedTodo(todo: ToggleCompletedTodoInput): String
    renameTodo(todo: RenameTodoInput): String
    deleteTodo(id: String): String
  }

  type Subscription {
    todoCreated: Todo
  }
`;

const resolvers = {
  Query: {
    ...todoResolvers.Query
  },
  Mutation: {
    ...todoResolvers.Mutation
  },
  Subscription: {
    ...todoResolvers.Subscription
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    todosAPI: new TodoAPI()
  })
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
