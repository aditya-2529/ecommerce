const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
    category: String!
    stock: Int
    imageUrl: String
  }
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    token: String
    orders: [Order!]
  }
  type Order {
    id: ID!
    products: [Product!]
    total: Float!
    createdAt: String!
    status: String
  }
  type Cart {
    id: ID!
    user: String!
    products: [Product!]
    total: Float!
  }
  type Query {
    getUsers: [User!]
    getProducts(category: String, page: Int, limit: Int): [Product!]
    getProductById(id: ID!): Product
    getAllProduct: [Product!]
    getUserOrders(userId: ID!): [Order!]
    getCart(userId: String!): Cart
  }
  type Mutation {
    register(username: String!, email: String!, age: String!, password: String!): User
    login(email: String!, password: String!): User
    addToCart(userId: String!, productId: String!, total: Int!): Cart
    createCart(userId: String!): Cart
    placeOrder(userId: ID!): Order
    createProduct(name: String!, description: String,price: Float!,category: String!,stock: Int,imageUrl: String): Product
  }
`);

module.exports = schema;