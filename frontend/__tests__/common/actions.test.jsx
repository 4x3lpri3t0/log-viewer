import { configureStore, thunkMiddleware 
} from '../../src/imports.jsx'

import * as actions from "../../src/common/actions.jsx"


const mockStore = configureStore([thunkMiddleware])
const store = mockStore()

describe('common actions', () => {
    
    beforeEach(() => store.clearActions())
    
    test('showMenu dispatches correct action and payload', () => {
        store.dispatch(actions.showMenu())
        expect(store.getActions()).toMatchSnapshot()
    })

    test('clearErrorMessage dispatches correct action and payload', () => {
        store.dispatch(actions.clearErrorMessage())
        expect(store.getActions()).toMatchSnapshot()
    })

    test('clearInfoMessage dispatches correct action and payload', () => {
        store.dispatch(actions.clearInfoMessage())
        expect(store.getActions()).toMatchSnapshot()
    })

    test('changeLanguage dispatches correct action and payload', () => {
        store.dispatch(actions.changeLanguage({value:"en", label:"English"}))
        expect(store.getActions()).toMatchSnapshot()
    })

})