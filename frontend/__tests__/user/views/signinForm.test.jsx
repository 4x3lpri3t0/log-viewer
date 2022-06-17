import { React, withStyles, LANGUAGE_MENU, MemoryRouter, Redirect,
	shallow, mount, render, toJson, configureStore, mui_render, mui_mount 
} from '../../../src/imports.jsx'


import { _SignInForm } from "../../../src/user/views/signinForm.jsx"
import styles from "../../../src/user/style.jsx"


describe('<_SignInForm />', () => {

const _SignInFormInstance = withStyles(styles)(props => 
	<MemoryRouter>
		<_SignInForm {...props} />
	</MemoryRouter>
)

describe('render()', () => {
	
	const updateFormFieldMockFn = jest.fn()
	const signInMockFn = jest.fn()

	const defaultProps = {
		signedIn: false,
		signInForm: {},
		updateFormField: updateFormFieldMockFn,
		signIn: signInMockFn
	}

	test('when logged out, renders succesfully', () => 
		expect(toJson(mui_mount(<_SignInFormInstance {...defaultProps}/>).find(_SignInForm)))
			.toMatchSnapshot())

	test('when logged in, redirects to home', () => 
		expect(toJson(mui_mount(<_SignInFormInstance
									{...defaultProps}
									signedIn={true} 
								/>).find(Redirect))).toMatchSnapshot()
	)

	test('when not logged in, shows empty sign in form', () => 
		expect(toJson(mui_mount(<_SignInFormInstance {...defaultProps}/>).find(_SignInForm)))
			.toMatchSnapshot())

	/*test('calls updateFormField when changing textfields', () => 
	{  
		const fieldNames = ['username', 'password']
		const mounted = mui_mount(<_SignInFormInstance {...defaultProps}/>)
		for (let name of fieldNames)
			mounted.find(`input[name="${name}"]`).first().simulate('change')
		expect(updateFormFieldMockFn.mock.calls.length).toBe(fieldNames.length)
	})

	test('calls signIn when clicking the sign in button', () => 
	{  
		mui_mount(<_SignInFormInstance {...defaultProps}/>)
			.find('#signinButton').first().simulate('click')
		expect(signInMockFn.mock.calls.length).toBe(1)
	})*/
})
})
