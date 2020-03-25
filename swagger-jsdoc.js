const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "DC Bot web server",
      version: "1.0.0",
      description:
        "Functional API for connecting DC Bot",
      license: {
        name: "MIT",
        url: "https://choosealicense.com/licenses/mit/"
      },
    },    
  },
  apis: ['./models/user.js', './routes/twitter.js']
};

module.exports = options;