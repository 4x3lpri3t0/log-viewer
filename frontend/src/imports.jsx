// React and related

import React from "react"
import ReactDOM from "react-dom"
import { Provider, connect } from "react-redux"
import { Router, MemoryRouter, Link, Route, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history';

import { createStore, applyMiddleware  } from "redux"
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

export { React, ReactDOM, Provider, connect, 
        Router, MemoryRouter, Link, Route, Switch, Redirect, createBrowserHistory,
        createStore, applyMiddleware, thunkMiddleware, createLogger }



// PouchDB connection

import PouchDB from 'pouchdb'
import PouchDBAuth from 'pouchdb-authentication'

    PouchDB.plugin(PouchDBAuth)

export { PouchDB }



// Localization

import i18n from 'i18next'
import LngDetector from 'i18next-browser-languagedetector'
import en from "../i18n/en/translation.json"
import all from "../i18n/all/translation.json"

    i18n.use(LngDetector).init({
        debug: false,
        detection: {
            lookupQuerystring: 'lng',
            lookupCookie: 'i18next',
            order: ['querystring', 'cookie', 'localStorage', 'navigator', 
                    'htmlTag', 'path', 'subdomain'],
            cookieMinutes: 10,
            cookieDomain: 'couchdbreactbp',
        },
        nsSeparator: false,
        keySeparator: false,
        resources: {
            en: { translation: en },
            ...all
        }
    })

    const lngs = [
        {label: 'English', value: 'en', engName: 'English'}, 
        {label: 'Deutsch', value: 'de', engName: 'German'}, 
        {label: 'Italiano', value: 'it', engName: 'Italian'},
        {label: 'Español', value: 'es', engName: 'Spanish'},
        {label: 'Português', value: 'pt', engName: 'Portuguese'},        
        {label: 'Français', value: 'fr', engName: 'French'},
        {label: 'العربية', value: 'ar', engName: 'Arabic'},
        {label: '中文', value: 'zh', engName: 'Chinese'},
        {label: '日本語', value: 'ja', engName: 'Japanese'},
        {label: '한국어', value: 'ko', engName: 'Korean',},
        {label: 'हिन्दी', value: 'hi', engName: 'Hindi'},
    ]

    const _t = t => i18n.t(t)

export { i18n, _t, lngs }



// Material-UI

import classNames from 'classnames'
import { createRender, createMount  } from '@material-ui/core/test-utils'
import withStyles from '@material-ui/core/styles/withStyles'
import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Drawer from '@material-ui/core/Drawer'
import Toolbar from '@material-ui/core/Toolbar'
import LinearProgress from '@material-ui/core/LinearProgress'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import MenuIcon from '@material-ui/icons/Menu'
import PersonIcon from '@material-ui/icons/Person'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import NotificationsIcon from '@material-ui/icons/Notifications'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import LanguageIcon from '@material-ui/icons/Language'
import PeopleIcon from '@material-ui/icons/People'
import Tooltip from '@material-ui/core/Tooltip'
const mui_render = createRender()
const mui_mount = createMount ()

export { AppBar, Avatar, Button, CssBaseline, FormControl, FormControlLabel, Checkbox, Input, InputLabel, 
        LockOutlinedIcon, Paper, Typography, Drawer, Toolbar, List, Divider, IconButton, Badge, Menu, 
        MenuItem, MenuIcon, ChevronLeftIcon, NotificationsIcon, LinearProgress, ListItem, ListItemIcon, 
        ListItemText, DashboardIcon, LanguageIcon, PeopleIcon, Tooltip, withStyles, PersonIcon, classNames, 
        mui_render, mui_mount }



// Snackbar Notifications

import { SnackbarProvider, withSnackbar } from 'notistack'
export { SnackbarProvider, withSnackbar }



// Menus

const LANGUAGE_MENU ="LANGUAGE_MENU"
export { LANGUAGE_MENU }



// Unit Tests

import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import configureStore from 'redux-mock-store'
export { shallow, mount, render, toJson, configureStore }


// Helper functions 

import utf8 from "utf8"

// prepare an ObjectURL ready to set as an image src
const createImageURL = image => 
    URL.createObjectURL(new Blob([image.data], {type: image.type}))

// convert a UTF8 string into HEX, to be used for the per-user databases in CouchDB
const utf8ToHex = str =>
    str && utf8.encode(str).split('').map(c => c.charCodeAt(0).toString(16)).join('')

export { createImageURL, utf8ToHex }