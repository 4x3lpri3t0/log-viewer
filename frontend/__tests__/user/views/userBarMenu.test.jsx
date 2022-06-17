import { React, withStyles, LANGUAGE_MENU, MemoryRouter, Redirect,
	shallow, mount, render, toJson, configureStore, mui_render, mui_mount 
} from '../../../src/imports.jsx'


import { _UserBarMenu } from "../../../src/user/views/userBarMenu.jsx"
import styles from "../../../src/user/style.jsx"


describe('<_UserBarMenu />', () => {

const _UserBarMenuInstance = withStyles(styles)(props => 
	<MemoryRouter>
		<_UserBarMenu {...props} />
	</MemoryRouter>
)

describe('render()', () => {
	
	const signOutMockFn = jest.fn()

	const defaultProps = {
		signedIn: true,
		signedInUserData: {},
		signOut: signOutMockFn
	}

	test('when logged in, renders succesfully', () => 
		expect(toJson(mui_mount(<_UserBarMenuInstance {...defaultProps}/>).find(_UserBarMenu)))
			.toMatchSnapshot())

	test('when logged out, renders succesfully', () => 
		expect(toJson(mui_mount(<_UserBarMenuInstance 
									{...defaultProps} 
									signedIn={false}
								/>).find(_UserBarMenu))).toMatchSnapshot())

	/*test('calls signOut when clicking the sign out button', () => 
	{  
		mui_mount(<_UserBarMenuInstance {...defaultProps}/>)
			.find('#signoutButton').first().simulate('click')
		expect(signOutMockFn.mock.calls.length).toBe(1)
	})*/
})
})
