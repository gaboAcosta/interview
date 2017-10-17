
import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Hello from './Hello';

describe('A suite', function() {
    it('should render without throwing an error', function() {
        expect(shallow(<Hello />).contains(<div className="hello">Hello!</div>)).toBe(true);
    });

    it('should be selectable by class "hello"', function() {
        expect(shallow(<Hello />).is('.hello')).toBe(true);
    });

    it('should mount in a full DOM', function() {
        expect(mount(<Hello />).find('.hello').length).toBe(1);
    });

    it('should render to static HTML', function() {
        expect(render(<Hello />).text()).toEqual('Hello!');
    });
});