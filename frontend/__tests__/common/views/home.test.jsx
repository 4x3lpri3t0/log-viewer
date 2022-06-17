import { React, withStyles, Provider, shallow, mount, render, toJson, configureStore 
      } from '../../../src/imports.jsx'

import { _Home } from "../../../src/common/views/home.jsx"
import styles from "../../../src/common/style.jsx"

describe('<Home />', () => {
  describe('render() with empty state', () => {
    test('component is rendered exactly like the last time', () => 
    {
        const HomeInstance = withStyles(styles)(props => 
          <_Home 
            {...props}
            signedInUserData={{}}
          />)
        expect(toJson(render(<HomeInstance/>))).toMatchSnapshot()
    })
  })

  describe('render() with user details', () => {
    test('component is rendered exactly like the last time', () => 
    {
        const HomeInstance = withStyles(styles)(props => 
          <_Home 
              {...props}
              signedInUserData= {{  
                firstName: "Goce",
                lastName: "Dokoski"
              }}
            />)
        expect(toJson(render(<HomeInstance/>))).toMatchSnapshot()
    })
  })
})