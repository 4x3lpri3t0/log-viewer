// React and related

import React from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { Router, MemoryRouter, Link, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import { applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

export {
  React,
  ReactDOM,
  Provider,
  connect,
  Router,
  MemoryRouter,
  Link,
  Route,
  createBrowserHistory,
  applyMiddleware,
  thunkMiddleware,
  createLogger,
};

// PouchDB connection

import PouchDB from "pouchdb-core";
// PouchDB.plugin(require("pouchdb-adapter-asyncstorage").default);

import PouchDBAuth from "pouchdb-authentication";

PouchDB.plugin(PouchDBAuth);

export { PouchDB };

// Helper functions

import utf8 from "utf8";

// prepare an ObjectURL ready to set as an image src
const createImageURL = (image) =>
  URL.createObjectURL(new Blob([image.data], { type: image.type }));

// convert a UTF8 string into HEX, to be used for the per-user databases in CouchDB
const utf8ToHex = (str) =>
  str &&
  utf8
    .encode(str)
    .split("")
    .map((c) => c.charCodeAt(0).toString(16))
    .join("");

export { createImageURL, utf8ToHex };
