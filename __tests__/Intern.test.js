const Intern = require('../lib/Intern');

describe("getRole", () => {
    it("should return 'Intern'", () => {
      const JohnTest = new Intern("John", 40, "email@email.com", 'My School');
      const result = JohnTest.getRole();
      expect(result).toEqual('Intern');
    });
});