const express = require("express");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerModelValidator = require('swagger-model-validator');
const Router = express.Router();


const options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        version: "1.0.0",
        title: "Customer API",
        description: "Customer API Information",
        contact: {
          name: "Amazing Developer"
        },
      },
      servers: [
        { url: 'http://localhost:8081/api/v1' , description: "Development server"}
      ],
      schemes: ["http", "https"],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT"
          }
        },
        schemas: {
          User: {
            properties: {
              id: {
                type: "integer"
              },
              name: {
                type: "string"
              }
            },
            required: [
              "id",
              "name"
            ]
          }
        }
      },
      security: {
        bearerAuth: []
      },
    },
    // ['.routes/*.js']
    apis: ["server.js","app/routes/*.js"]
  };

const swaggerSpec = swaggerJSDoc(options);
swaggerModelValidator(swaggerSpec);

Router.get('/json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

Router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

exports.validateModel =  (name, model) => {
  const responseValidation = swaggerSpec.validateModel(
    name,
    model,
    false,
    true
  );
  if (!responseValidation.valid) {
    console.error(responseValidation.errors);
    throw new Error(`Model doesn't match Swagger contract`);
  }
}

exports.Router = Router;