require("dotenv").config();

const express = require("express");
const app = express();

// Parse incoming requests request bodys
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes 
require("./pairtest/routes/tickets")(app);

// Global Error Handler
require("./pairtest/middlewares/global-error-handler")(app);

// Start the server on HTTP for now would be HTTPS in real life app
app.listen(process.env.PORT || 3000, () => {
    console.log(`Application is listening on port ${process.env.PORT || 3000}`);
});

export { app };