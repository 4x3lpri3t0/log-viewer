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

import PouchDB from "pouchdb";
import PouchDBAuth from "pouchdb-authentication";

PouchDB.plugin(PouchDBAuth);

export { PouchDB };

// Localization

import i18n from "i18next";
import LngDetector from "i18next-browser-languagedetector";
import en from "../i18n/en/translation.json";
import all from "../i18n/all/translation.json";

i18n.use(LngDetector).init({
  debug: false,
  detection: {
    lookupQuerystring: "lng",
    lookupCookie: "i18next",
    order: [
      "querystring",
      "cookie",
      "localStorage",
      "navigator",
      "htmlTag",
      "path",
      "subdomain",
    ],
    cookieMinutes: 10,
    cookieDomain: "couchdbreactbp",
  },
  nsSeparator: false,
  keySeparator: false,
  resources: {
    en: { translation: en },
    ...all,
  },
});

const lngs = [
  { label: "English", value: "en", engName: "English" },
  { label: "Deutsch", value: "de", engName: "German" },
  { label: "Italiano", value: "it", engName: "Italian" },
  { label: "Español", value: "es", engName: "Spanish" },
  { label: "Português", value: "pt", engName: "Portuguese" },
  { label: "Français", value: "fr", engName: "French" },
  { label: "العربية", value: "ar", engName: "Arabic" },
  { label: "中文", value: "zh", engName: "Chinese" },
  { label: "日本語", value: "ja", engName: "Japanese" },
  { label: "한국어", value: "ko", engName: "Korean" },
  { label: "हिन्दी", value: "hi", engName: "Hindi" },
];

const _t = (t) => i18n.t(t);

export { i18n, _t, lngs };

// Menus

const LANGUAGE_MENU = "LANGUAGE_MENU";
export { LANGUAGE_MENU };

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
