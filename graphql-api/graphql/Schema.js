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
    cartId: String!
  }
  type Order {
    id: ID!
    userId: String!
    products: [Product!]
    total: Float!
    createdAt: String!
    status: String
  }
    type product{
      product: [Product!]
      productTotal: String!
    }
  type Cart {
    id: ID!
    user: String!
    products: [product!]
    total: Float!
  }
  type Query {
    orderNow(productId: String!,userId: String!,total: Int!,createdAt: String!,status: String!): User
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
    addToCart(id: String!,userId: String!, productId: String!, total: String!,productTotal: String!): Cart
    createCart(userId: String!): Cart
    placeOrder(userId: String!,productId: String!,total: String!,createdAt: String!,status: String!): Order
    createProduct(name: String!, description: String,price: Float!,category: String!,stock: Int,imageUrl: String): Product
  }
`);

module.exports = schema;