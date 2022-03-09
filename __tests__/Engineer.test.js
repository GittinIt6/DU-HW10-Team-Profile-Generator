const Engineer = require('../lib/Engineer');

describe("getRole", () => {
    it("should return 'Engineer'", () => {
      const JohnTest = new Engineer("John", 40, "email@email.com", 'mytestuser');
      const result = JohnTest.getRole();
      expect(result).toEqual('Engineer');
    });
});