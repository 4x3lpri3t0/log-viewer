import { React, withStyles, LANGUAGE_MENU, MemoryRouter, Redirect,
	shallow, mount, render, toJson, configureStore, mui_render, mui_mount 
} from '../../../src/imports.jsx'


import { _ProfileForm } from "../../../src/user/views/profileForm.jsx"
import styles from "../../../src/user/style.jsx"


describe('<_ProfileForm />', () => {

const _ProfileFormInstance = withStyles(styles)(props => 
	<MemoryRouter>
		<_ProfileForm {...props} />
	</MemoryRouter>
)

describe('render()', () => {
	
	const initProfileFormMockFn = jest.fn()
	const updateFormFieldMockFn = jest.fn()
	const updateProfileImgMockFn = jest.fn()
	const updateProfileMockFn =  jest.fn()

	const defaultProps = {
		signedIn: true,
		userProfileForm: {},
		signedInUserData: {},
		initProfileForm: initProfileFormMockFn,
		updateProfileImg: updateProfileImgMockFn, 
		updateFormField: updateFormFieldMockFn,
		updateProfile: updateProfileMockFn
	}

	test('when logged in, renders succesfully', () => 
		expect(toJson(mui_mount(<_ProfileFormInstance {...defaultProps}/>).find(_ProfileForm)))
			.toMatchSnapshot())
	
	test('calls initProfileForm when mounted', () => 
		expect(initProfileFormMockFn.mock.calls.length).toBe(1))

	test('when logged out, redirects to signin', () => 
		expect(toJson(mui_mount(<_ProfileFormInstance
									{...defaultProps}
									signedIn={false} 
								/>).find(Redirect))).toMatchSnapshot()
	)

	test('when logged in, shows profile form filled in with userProfileForm data', () => 
		expect(toJson(mui_mount(<_ProfileFormInstance
									{...defaultProps} 
									userProfileForm={{
										username: 'gocedoko', 
										firstName: 'Goce',
										lastName: 'Dokoski',
										password: 'password',
										repeatPassword: 'password',
										imageData: "assets/img/userm.png"
									}}
								/>).find(_ProfileForm))).toMatchSnapshot())
	/*
	test('calls updateFormField when changing textfields', () => 
	{  
		const mounted = mui_mount(<_ProfileFormInstance {...defaultProps}/>)
		for (let id of ['firstName', 'lastName', 'password', 'repeatPassword'])
			mounted.find(`input[name="${id}"]`).first().simulate('change')
		expect(updateFormFieldMockFn.mock.calls.length).toBe(4)
	})

	test('calls updateProfileImg when selecting a profile img', () => 
	{  
		mui_mount(<_ProfileFormInstance {...defaultProps}/>)
			.find("input[name='userImageInput']").first().simulate('change')
		expect(updateProfileImgMockFn.mock.calls.length).toBe(1)
	})

	test('calls updateProfile when clicking the submit button', () => 
	{  
		mui_mount(<_ProfileFormInstance {...defaultProps}/>)
			.find('#submitButton').first().simulate('click')
		expect(updateProfileMockFn.mock.calls.length).toBe(1)
	})

	*/

})
})
