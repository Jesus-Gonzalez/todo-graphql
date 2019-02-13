const { RESTDataSource } = require('apollo-datasource-rest');

class TodoAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:5000/api/todo/';
  }

  async getTodos() {
    return this.get('');
  }

  async create(name) {
    const data = await this.post('', { name });
    return data;
  }

  async toggleCompleted({ id, completed }) {
    const data = await this.put(id, { completed });
    return data.results;
  }

  async rename({ id, name }) {
    const data = await this.put(id, { name });
    return data.results;
  }

  async delete(id) {
    const data = await this.delete(id);
    return data.results;
  }
}

module.exports = { TodoAPI };
