const swaggerJsDoc = require("swagger-jsdoc");


const swaggerOptions = {
    swaggerDefinition:{
        openapi:'3.0.0',
        info:{
            title:"Payment Gateway API",
            version:"1.0.0",
            description:"Payment Gateway API documentation"
        },
        servers:[
            {
                url:'http://localhost:4000',
                description: "Local Server"
            },
            {
                url:"https://nxtaipaymentgateway.onrender.com",
                description:"Hosted server"
            }
        ]
    },
    apis:['./routes/*.js']
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

module.exports = {swaggerSpec};