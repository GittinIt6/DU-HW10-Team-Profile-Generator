const Manager = require('../lib/Manager');

describe("getRole", () => {
    it("should return 'Manager'", () => {
      const JohnTest = new Manager("John", 40, "email@email.com", 'office phone');
      const result = JohnTest.getRole();
      expect(result).toEqual('Manager');
    });
});

describe("officeNumber", () => {
    it("should return a string", () => {
      const JohnTest = new Manager("John", 40, "email@email.com", '555-555-5555');
      const result = JohnTest.officeNumber;
      expect(typeof result).toEqual('string');
    });
});