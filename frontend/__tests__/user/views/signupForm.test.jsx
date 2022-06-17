import { React, withStyles, LANGUAGE_MENU, MemoryRouter, Redirect,
	shallow, mount, render, toJson, configureStore, mui_render, mui_mount 
} from '../../../src/imports.jsx'


import { _SignUpForm } from "../../../src/user/views/signupForm.jsx"
import styles from "../../../src/user/style.jsx"


describe('<_SignUpForm />', () => {

const _SignUpFormInstance = withStyles(styles)(props => 
	<MemoryRouter>
		<_SignUpForm {...props} />
	</MemoryRouter>
)

describe('render()', () => {
	
	const updateFormFieldMockFn = jest.fn()
	const signUpMockFn = jest.fn()

	const defaultProps = {
		signedIn: false,
		signUpForm: {},
		updateFormField: updateFormFieldMockFn,
		signUp: signUpMockFn
	}

	test('when logged out, renders succesfully', () => 
		expect(toJson(mui_mount(<_SignUpFormInstance {...defaultProps}/>).find(_SignUpForm)))
			.toMatchSnapshot())

	test('when logged in, redirects to home', () => 
		expect(toJson(mui_mount(<_SignUpFormInstance
									{...defaultProps}
									signedIn={true} 
								/>).find(Redirect))).toMatchSnapshot()
	)

	test('when not logged in, shows empty sign in form', () => 
		expect(toJson(mui_mount(<_SignUpFormInstance {...defaultProps}/>).find(_SignUpForm)))
			.toMatchSnapshot())

	/*test('calls updateFormField when changing textfields', () => 
	{  
		const fieldNames = ['firstName', 'lastName', 'username', 'password', 'repeatPassword']
		const mounted = mui_mount(<_SignUpFormInstance {...defaultProps}/>)
		for (let name of fieldNames)
			mounted.find(`input[name="${name}"]`).first().simulate('change')
		expect(updateFormFieldMockFn.mock.calls.length).toBe(fieldNames.length)
	})

	test('calls signUp when clicking the sign in button', () => 
	{  
		mui_mount(<_SignUpFormInstance {...defaultProps}/>)
			.find('#signupButton').first().simulate('click')
		expect(signUpMockFn.mock.calls.length).toBe(1)
	})*/
})
})
