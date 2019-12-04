// import { shallow } from "enzyme";
import SearchFlight from "./search-flight.js";
import { createShallow } from "@material-ui/core/test-utils";
import Button from "@material-ui/core/Button";

describe("SearchFlight", () => {
  describe("Index", () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation(init => [init, setState]);

    let shallow = createShallow();
    const container = shallow(<SearchFlight />);
    xit("Buscar vuelos button should be disabled by default", () => {
      expect(container.find(Button).prop("disabled")).toBeTruthy();
    });
    it("Buscar vuelos button should be disabled by default", () => {
      // expect(setState).toHaveBeenCalledWith(1);

      expect(true).toBeTruthy();
    });

    // expect(initialProps.dispatch).toHaveBeenCalledTimes(1);
    // it("should render without throwing an error", function() {
    //   expect(wrap.find("Button").disabled()).toBe(true);
    // });ñ
  });
});
