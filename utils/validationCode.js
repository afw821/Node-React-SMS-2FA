const validationCode = {
  validationCodeArray: [],
  createValiadtionCode: function (max, min) {
    let i = 0;
    do {
      i += 1;
      let num = Math.floor(Math.random() * (max - min) + min);

      this.validationCodeArray.push(num);
    } while (i < 6);
    console.log("***Array***", this.validationCodeArray);
    return parseInt(this.validationCodeArray.join(""));
  },
  compare: function (code1, code2) {
    return code1 === code2;
  },
};

module.exports = validationCode;
