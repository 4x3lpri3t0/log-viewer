import { React, withStyles,  } from '../../src/imports.jsx'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import { CustomInputControl, UserImageControl } from '../../src/common/components.jsx'

import styles from "../../src/common/style.jsx"

describe('<CustomInputControl />', () => {
    describe('render()', () => {
      test('component is rendered exactly like the last time', () => 
        expect(toJson(shallow(<CustomInputControl />).dive())).toMatchSnapshot()
      )
    })
  })

describe('<UserImageControl />', () => {
  describe('render()', () => {
    test('component is rendered exactly like the last time', () => 
    {
      const UICInstance = withStyles(styles)(props => 
        <UserImageControl 
          id="imagePath" 
          classes={props.classes}
          username="testUserName"
          src="assets/img/userm.png"
        />)
      expect(toJson(shallow(<UICInstance/>).dive())).toMatchSnapshot()
    })
  })
})