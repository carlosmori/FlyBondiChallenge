// import { shallow } from "enzyme";
import SearchFlight from './search-flight.js';
import { createShallow } from '@material-ui/core/test-utils';
import Button from '@material-ui/core/Button';

describe('SearchFlight', () => {
  describe('Index', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation(init => [init, setState]);
    let shallow = createShallow();
    const container = shallow(<SearchFlight />);
    xit('Buscar vuelos button should be disabled by default', () => {
      expect(container.find(Button).prop('disabled')).toBeTruthy();
    });
  });
});
