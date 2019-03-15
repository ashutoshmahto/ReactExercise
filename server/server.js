import express from "express";
import bodyParser from "body-parser";
import webpack from "webpack";
import webpackMiddleware from "webpack-dev-middleware";

import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";

import App from "../web/containers/app";
import reducers from "../web/containers/CampaignDashboard/reducers";

import webpackConfig from "../webpack.config.js";

var app = express();
app.use(webpackMiddleware(webpack(webpackConfig)));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));

/**
 * Method to generate server side rendered component
 * @param {object} req
 */
const renderPageHtml = req => {
  const context = {};
  const store = createStore(reducers, applyMiddleware(thunkMiddleware));
  return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Campaign List</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
    </head>
    <body>
        <div id="root">${renderToString(
          <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
              <App />
            </StaticRouter>
          </Provider>
        )}
        </div>
        <script src="/bundle.js"></script>
    </body>
    </html>`;
};

/**
 * Generate server side rendered page
 */
app.get("/", function(req, res) {
  const pageHTML = renderPageHtml(req);
  res.send(pageHTML);
});

/* Port and listening info below */
/* might want to set up argv for easily changing the port */
var port = 3304;
app.listen(port, function() {
  console.log("app listening on port: " + port);
});

/* Mock data  */
const mockData = {
  campaigns: {
    da1mjt7zmkyx: {
      name: "Campaign 1 - Emails",
      createdBy: "Chirag",
      createdOn: "03/14/2019 02:30PM",
      actionsHistory: [
        {
          type: "Create",
          actionBy: "Chirag",
          actionText: "",
          actionDesc: "Campaign Created"
        },
        {
          type: "Comment",
          actionBy: "Chirag",
          actionText: "Good Luck",
          actionDesc: "Comment Added"
        }
      ]
    }
  }
};

app.get("/data", function(req, res) {
  res.send(mockData);
});
