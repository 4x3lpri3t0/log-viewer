import { configureStore, thunkMiddleware 
} from '../../src/imports.jsx'

import * as actions from "../../src/user/actions.jsx"


const mockStore = configureStore([thunkMiddleware])
const store = mockStore()

describe('user actions', () => {
    
    beforeEach(() => store.clearActions())
    
    test('getSession dispatches correct action and payload', () => {
        store.dispatch(actions.getSession())
        expect(store.getActions()).toMatchSnapshot()
    })

    test('initProfileForm dispatches correct action and payload', () => {
        store.dispatch(actions.initProfileForm())
        expect(store.getActions()).toMatchSnapshot()
    })

    test('updateFormField dispatches correct action and payload', () => {
        store.dispatch(actions.updateFormField('id', 'value', 'form'))
        expect(store.getActions()).toMatchSnapshot()
    })

    test('updateProfile dispatches correct action and payload', () => {
        store.dispatch(actions.updateProfile({}))
        expect(store.getActions()).toMatchSnapshot()
    })


    test('signIn dispatches correct action and payload', () => {
        store.dispatch(actions.signIn({}))
        expect(store.getActions()).toMatchSnapshot()
    })

    test('signUp dispatches correct action and payload', () => {
        store.dispatch(actions.signUp({}))
        expect(store.getActions()).toMatchSnapshot()
    })

    test('signOut dispatches correct action and payload', () => {
        store.dispatch(actions.signOut('firstName', 'lastName'))
        expect(store.getActions()).toMatchSnapshot()
    })

})