const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json()); // important for forwarding JSON


// ✅ Route for User Service
app.use(
  "/api/users",
  createProxyMiddleware({
    target: "http://user-service:8085",
    changeOrigin: true,
    pathRewrite: { "^/api/users": "/users" },
    logLevel: "debug" // extra logging
  })
);




// ✅ Route for Role Service
app.use(
  "/api/roles",
  createProxyMiddleware({
    target: "http://role-service:8082",
    changeOrigin: true,
    pathRewrite: { "^/api/roles": "" },
  })
);


//dept-service
app.use(
  "/api/dept",
  createProxyMiddleware({
    target: "http://role-service:8086",
    changeOrigin: true,
    pathRewrite: { "^/api/roles": "" },
  })
);


//country-service
app.use(
  "/api/country",
  createProxyMiddleware({
    target: "http://country-service:8087",
    changeOrigin: true,
    pathRewrite: { "^/api/roles": "" },
  })
);


//state-service
app.use(
  "/api/state",
  createProxyMiddleware({
    target: "http://state-service:8087",
    changeOrigin: true,
    pathRewrite: { "^/api/roles": "" },
  })
);

// Start API Gateway


const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server Startup running on port ${PORT}`);
});
