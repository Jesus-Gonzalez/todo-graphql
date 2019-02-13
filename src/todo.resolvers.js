const CREATE_TODO = 'todo:createTodo'

const resolvers = pubsub => ({
  Query: {
    getTodos: async (_, __, { dataSources }) =>
      dataSources.todosAPI.getTodos()
  },

  Mutation: {
    createTodo: async (_, { name }, { dataSources }) => {
      const todo = await dataSources.todosAPI.create(name)
      pubsub.publish(CREATE_TODO, { todoCreated: todo })
      if (todo === null) return
      return todo
    },

    toggleCompletedTodo: async (_, todo, { dataSources }) =>
      dataSources.todosAPI.toggleCompleted(todo),

    renameTodo: async (_, todo, { dataSources }) =>
      dataSources.todosAPI.rename(todo),

    deleteTodo: async (_, todo, { dataSources }) =>
      dataSources.todosAPI.delete(todo)
  },

  Subscription: {
    todoCreated: {
      subscribe: () => pubsub.asyncIterator([CREATE_TODO]),
    }
  }
})

module.exports = resolvers
