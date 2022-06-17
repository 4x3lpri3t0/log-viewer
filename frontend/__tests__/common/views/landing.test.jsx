import { React, withStyles, Provider, shallow, mount, render, toJson 
        } from '../../../src/imports.jsx'

import { _Landing } from "../../../src/common/views/landing.jsx"
import styles from "../../../src/common/style.jsx"

describe('<Landing />', () => {
  describe('render() with empty state', () => {
    test('component is rendered exactly like the last time', () => 
    {
        const LandingInstance = withStyles(styles)(props => 
                <_Landing {...props}/>)

        expect(toJson(mount(<LandingInstance/>))).toMatchSnapshot()
    })
  })
})