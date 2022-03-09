const Employee = require('../lib/Employee');

describe("getRole", () => {
    it("should return 'Employee'", () => {
      const JohnTest = new Employee("John", 40, "email@email.com");
      const result = JohnTest.getRole();
      expect(result).toEqual('Employee');
    });
});