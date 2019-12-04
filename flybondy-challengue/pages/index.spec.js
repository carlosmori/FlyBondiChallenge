import { shallow } from "enzyme";
import Index from "./index.js";

describe("Pages", () => {
  describe("Index", () => {
    xit("should display title Tu aerolinea Lowcost", function() {
      const wrap = shallow(<Index />);
      expect(wrap.find("div").text()).toBe("Tu aerolinea Lowcost");
      expect(true).toBe(true);
    });
  });
});
