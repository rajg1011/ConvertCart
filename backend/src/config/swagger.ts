import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ConvertCart Assignment API Documentation",
      description: "API documentation for ConvertCart Assignment",
      version: "1.0.0",
      contact: {
        name: "Raj Gupta",
        email: "rajg1110@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            id: { type: "number" },
            title: { type: "string" },
            price: { type: "number", format: "float" },
            stock_status: { type: "string", enum: ["instock", "outofstock"] },
            stock_quantity: { type: "number", nullable: true },
            category: { type: "string" },
            tags: { type: "array", items: { type: "string" } },
            on_sale: { type: "boolean" },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },  
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

const specs = swaggerJsdoc(options);

export default specs;
