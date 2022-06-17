import { React, withStyles, Provider, Router, createBrowserHistory, LANGUAGE_MENU,
        shallow, mount, render, toJson, configureStore, mui_render, mui_mount 
    } from '../../../src/imports.jsx'


import { _MainAppBar } from "../../../src/common/views/mainAppBar.jsx"
import styles from "../../../src/common/style.jsx"


// We need a store because MainAppBar includes connected UserBarMenu 
const mockStore = configureStore()
const store = mockStore()

describe('<_MainAppBar />', () => {

    const MainAppBarInstance = withStyles(styles)(props => 
        <Provider store={store}>
            <Router history={createBrowserHistory()}>
                <_MainAppBar {...props} />
            </Router>
        </Provider>
    )

    describe('render()', () => {

        test('component is rendered exactly like the last time', () => 
            expect(toJson(mui_render(<MainAppBarInstance/>))).toMatchSnapshot())

        test('component is rendered with language=\'en\' exactly like the last time', () => 
            expect(toJson(mui_render(<MainAppBarInstance language='en'/>))).toMatchSnapshot())

        /*test('calls showMenu() prop when clicking the language icon', () => 
        {   
            const showMenuMockFn = jest.fn()
            const wrapper = mount(<MainAppBarInstance showMenu={showMenuMockFn}/>)

            wrapper.find('#languageMenuButton').first().simulate('click')
            expect(showMenuMockFn.mock.calls.length).toBe(1)
        })*/

        test('calls changeLanguage() when selecting the first language from the menu', () => 
        {  
            const changeLanguageMockFn = jest.fn()
            const wrapper = mui_mount(  <MainAppBarInstance 
                                            changeLanguage={changeLanguageMockFn}
                                            shownMenu={LANGUAGE_MENU}
                                        />)
            wrapper.find('.languageMenuItem').first().simulate('click')
            expect(changeLanguageMockFn.mock.calls.length).toBe(1)
        })

        /*test('calls showMenu when clicking the language icon while menu is open', () => 
        {  
            const showMenuMockFn = jest.fn()
            const wrapper = mui_mount(  <MainAppBarInstance 
                                            showMenu={showMenuMockFn}
                                            shownMenu={LANGUAGE_MENU}
                                        />)
            wrapper.find('#languageMenuButton').first().simulate('click')
            expect(showMenuMockFn.mock.calls.length).toBe(1)
        })*/
    })
})