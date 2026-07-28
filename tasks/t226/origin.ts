import assert from "assert";
//required for tests at bottom of file

//Functions below represent classification tests for Digit patterns at [godid.io]

function assert999(bitName: string): boolean {
  //each function to return a boolean variable, assess whether tests are passed or not
  let string2 = bitName.replace(".bit", "");
  //in order to obtain a pure String, remove the suffix ".bit" from bitName and replace it with ""
  const num = parseInt(string2);
  //for numerical tests, need to convert string2 to an integer
  const regex = /^[0-9]{3}$/;

  return regex.test(string2) && !isNaN(num) && num >= 0 && num < 1000;
}

function assertAAA(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  //for RegEx testing, use .split to gather each digit for string and .map(Number) to place each digit into the number[] array
  const regex = /^[0-9]{3}$/;

  return (
    regex.test(string2) && digits[0] === digits[1] && digits[1] === digits[2]
  );
}

function assertABC(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{3}$/;

  return (
    regex.test(string2) &&
    digits[0] != digits[1] &&
    digits[1] != digits[2] &&
    digits[0] != digits[2]
  );
}

function assertABB(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{3}$/;

  return (
    regex.test(string2) && digits[0] != digits[1] && digits[1] === digits[2]
  );
}

function assertABA(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{3}$/;

  return (
    regex.test(string2) && digits[0] != digits[1] && digits[0] === digits[2]
  );
}

function assertAAB(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{3}$/;

  return (
    regex.test(string2) && digits[0] === digits[1] && digits[0] != digits[2]
  );
}

function assert360Degree(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^360|(3[0-5][0-9]|2[0-9]{2}|1[0-9]{2}|0[0-9][0-9])°$/;
  return regex.test(string2);
}

function assert0x999(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^0x[0-9]{3}$/;
  return regex.test(string2);
}

function assert999JP(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^[0-9]{3}JP$/;
  return regex.test(string2);
}

function assert999CN(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^[0-9]{3}CN$/;
  return regex.test(string2);
}

function assertArabic999(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^^([\u0600-\u06FF]){3}$/;
  //Arabic numerals reference: https://stackoverflow.com/questions/29729391/regular-expression-arabic-characters-and-numbers-only
  return regex.test(string2);
}

function assertFlag999(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^[\uD83C][\uDDE6-\uDDFF][\uD83C][\uDDE6-\uDDFF][0-9]{3}$/;
  //Country flag detection with regex: https://stackoverflow.com/questions/53360006/detect-with-regex-if-emoji-is-country-flag
  return regex.test(string2);
}

function assert10K(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^[0-9]{4}$/;
  return regex.test(string2);
}

function assertABCD(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{4}$/;

  return (
    regex.test(string2) &&
    digits[0] + 1 === digits[1] &&
    digits[1] + 1 === digits[2] &&
    digits[2] + 1 === digits[3]
  );
}

function assertAAAA(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{4}$/;

  return (
    regex.test(string2) &&
    digits[0] === digits[1] &&
    digits[1] === digits[2] &&
    digits[2] === digits[3]
  );
}

function assertABBB(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{4}$/;

  return (
    regex.test(string2) &&
    digits[0] !== digits[1] &&
    digits[1] === digits[2] &&
    digits[2] === digits[3]
  );
}

function assertAABB(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{4}$/;

  return (
    regex.test(string2) &&
    digits[0] === digits[1] &&
    digits[1] !== digits[2] &&
    digits[2] === digits[3]
  );
}

function assertAAAB(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{4}$/;

  return (
    regex.test(string2) &&
    digits[0] === digits[1] &&
    digits[1] === digits[2] &&
    digits[2] !== digits[3]
  );
}

function assertABAA(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{4}$/;

  return (
    regex.test(string2) &&
    digits[0] !== digits[1] &&
    digits[1] !== digits[2] &&
    digits[2] === digits[3] &&
    digits[3] === digits[0]
  );
}

function assertAABA(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{4}$/;

  return (
    regex.test(string2) &&
    digits[0] === digits[1] &&
    digits[1] !== digits[2] &&
    digits[2] !== digits[3] &&
    digits[3] === digits[0]
  );
}

function assertABBA(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{4}$/;

  return (
    regex.test(string2) &&
    digits[0] === digits[3] &&
    digits[0] !== digits[1] &&
    digits[1] === digits[2] &&
    digits[2] !== digits[3]
  );
}

function assertABAB(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{4}$/;

  return (
    regex.test(string2) &&
    digits[0] === digits[2] &&
    digits[1] === digits[3] &&
    digits[0] !== digits[1]
  );
}

function assertAABC(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{4}$/;

  return (
    regex.test(string2) &&
    digits[0] === digits[1] &&
    digits[0] !== digits[2] &&
    digits[0] !== digits[3] &&
    digits[2] !== digits[3]
  );
}

function assertABCC(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{4}$/;

  return (
    regex.test(string2) &&
    digits[0] !== digits[1] &&
    digits[1] !== digits[2] &&
    digits[2] === digits[3] &&
    digits[0] !== digits[2]
  );
}

function assertABBC(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{4}$/;

  return (
    regex.test(string2) &&
    digits[0] !== digits[1] &&
    digits[1] === digits[2] &&
    digits[2] !== digits[3] &&
    digits[0] !== digits[3]
  );
}

function assert0XXX(bitName: string): boolean {
  const num = parseInt(bitName.replace(".bit", ""), 10);
  let string2 = bitName.replace(".bit", "");
  const regex = /^0[0-9]{3}$/;

  return regex.test(string2);
}

function assert00XX(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^00[0-9]{2}$/;

  return regex.test(string2);
}

function assert0X0X(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^0[0-9]{1}0[0-9]{1}$/;

  return regex.test(string2);
}

function assert0XX0(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^0[0-9]{1}[0-9]{1}0$/;

  return regex.test(string2);
}

function assertXX00(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^[0-9]{1}[0-9]{1}00$/;

  return regex.test(string2);
}

function assertXX88(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^[0-9]{1}[0-9]{1}88$/;

  return regex.test(string2);
}

function assertXX69(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^[0-9]{1}[0-9]{1}69$/;

  return regex.test(string2);
}

function assertTimesTable(bitName: string): boolean {
  const num = parseInt(bitName.replace(".bit", ""), 10);
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = num.toString().split("").map(Number);
  let value = digits[0] * digits[1];
  let formattedValue = value.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  });
  let valueDigits: number[] = formattedValue.toString().split("").map(Number);
  const regex = new RegExp(`^[0-9]{2}${valueDigits[0]}${valueDigits[1]}$`);
  //for inserting dynamic variables. ChatGPT came up with this.

  return regex.test(string2);
}

function assertMMDD(bitName: string): boolean {
  const num = parseInt(bitName.replace(".bit", ""), 10);
  let string2 = bitName.replace(".bit", "");
  const regex = /^(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/;
  //This formula was generated via ChatGPT, following my strict prompts

  return regex.test(string2);
}

function assert0x10K(bitName: string): boolean {
  const num = parseInt(bitName.replace(".bit", ""), 10);
  let string2 = bitName.replace(".bit", "");
  const regex = /^0x[0-9]{4}$/;

  return regex.test(string2);
}

function assertArabic10K(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^([\u0600-\u06FF]){4}$/;
  //Arabic numerals reference: https://stackoverflow.com/questions/29729391/regular-expression-arabic-characters-and-numbers-only
  return regex.test(string2);
}

function assert100K(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^[0-9]{5}$/;

  return regex.test(string2);
}

function assertAAAAA(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{5}$/;

  return (
    regex.test(string2) &&
    digits[0] === digits[1] &&
    digits[1] === digits[2] &&
    digits[2] === digits[3] &&
    digits[3] === digits[4]
  );
}

function assertABCDE(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{5}$/;

  return (
    regex.test(string2) &&
    digits[0] + 1 === digits[1] &&
    digits[1] + 1 === digits[2] &&
    digits[2] + 1 === digits[3] &&
    digits[3] + 1 === digits[4]
  );
}

function assertABBBB(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{5}$/;

  return (
    regex.test(string2) &&
    digits[4] === digits[3] &&
    digits[3] === digits[2] &&
    digits[2] === digits[1] &&
    digits[1] !== digits[0]
  );
}

function assertAABBB(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{5}$/;

  return (
    regex.test(string2) &&
    digits[4] === digits[3] &&
    digits[3] === digits[2] &&
    digits[2] !== digits[1] &&
    digits[1] === digits[0]
  );
}

function assertAAABB(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{5}$/;

  return (
    regex.test(string2) &&
    digits[4] === digits[3] &&
    digits[3] !== digits[2] &&
    digits[2] === digits[1] &&
    digits[1] === digits[0]
  );
}

function assertAAAAB(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{5}$/;

  return (
    regex.test(string2) &&
    digits[4] !== digits[3] &&
    digits[3] === digits[2] &&
    digits[2] === digits[1] &&
    digits[1] === digits[0]
  );
}

function assertABBBA(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{5}$/;

  return (
    regex.test(string2) &&
    digits[4] !== digits[3] &&
    digits[3] === digits[2] &&
    digits[2] === digits[1] &&
    digits[1] !== digits[0] &&
    digits[0] === digits[4]
  );
}

function assertABAAA(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{5}$/;

  return (
    regex.test(string2) &&
    digits[0] !== digits[1] &&
    digits[0] === digits[2] &&
    digits[0] === digits[3] &&
    digits[0] === digits[4]
  );
}

function assertAABAA(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{5}$/;

  return (
    regex.test(string2) &&
    digits[0] === digits[1] &&
    digits[0] !== digits[2] &&
    digits[0] === digits[3] &&
    digits[0] === digits[4]
  );
}

function assertAAABA(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{5}$/;

  return (
    regex.test(string2) &&
    digits[0] === digits[1] &&
    digits[0] === digits[2] &&
    digits[0] !== digits[3] &&
    digits[0] === digits[4]
  );
}

function assertABABA(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{5}$/;

  return (
    regex.test(string2) &&
    digits[0] !== digits[1] &&
    digits[0] === digits[2] &&
    digits[1] === digits[3] &&
    digits[0] === digits[4]
  );
}

function assertXABCD(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{5}$/;

  return (
    regex.test(string2) &&
    digits[4] === digits[3] + 1 &&
    digits[3] === digits[2] + 1 &&
    digits[2] === digits[1] + 1
  );
}

function assertXX000(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^[0-9]{2}000$/;

  return regex.test(string2);
}

function assert00XX0(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^00[0-9]{2}0$/;

  return regex.test(string2);
}

function assert000XX(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^000[0-9]{2}$/;

  return regex.test(string2);
}

function assertXX420(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^[0-9]{2}420$/;

  return regex.test(string2);
}

function assertAAABC(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{5}$/;

  return (
    regex.test(string2) &&
    digits[0] === digits[1] &&
    digits[0] === digits[2] &&
    digits[0] !== digits[3] &&
    digits[0] !== digits[4] &&
    digits[3] !== digits[4]
  );
}

function assertAABBC(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{5}$/;

  return (
    regex.test(string2) &&
    digits[0] === digits[1] &&
    digits[1] !== digits[2] &&
    digits[2] === digits[3] &&
    digits[3] !== digits[4] &&
    digits[0] !== digits[4]
  );
}

function assertAABCC(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{5}$/;

  return (
    regex.test(string2) &&
    digits[0] === digits[1] &&
    digits[1] !== digits[2] &&
    digits[2] !== digits[3] &&
    digits[3] === digits[4] &&
    digits[0] !== digits[4]
  );
}

function assertABCCC(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{5}$/;

  return (
    regex.test(string2) &&
    digits[0] !== digits[1] &&
    digits[1] !== digits[2] &&
    digits[2] === digits[3] &&
    digits[3] === digits[4] &&
    digits[0] !== digits[4]
  );
}

function assertABBCC(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{5}$/;

  return (
    regex.test(string2) &&
    digits[0] !== digits[1] &&
    digits[1] === digits[2] &&
    digits[2] !== digits[3] &&
    digits[3] === digits[4] &&
    digits[0] !== digits[4]
  );
}

function assertABBBC(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{5}$/;

  return (
    regex.test(string2) &&
    digits[0] !== digits[1] &&
    digits[1] === digits[2] &&
    digits[2] === digits[3] &&
    digits[3] !== digits[4] &&
    digits[0] !== digits[4]
  );
}

function assertABCBA(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{5}$/;

  return (
    regex.test(string2) &&
    digits[0] !== digits[1] &&
    digits[1] !== digits[2] &&
    digits[1] === digits[3] &&
    digits[0] !== digits[2] &&
    digits[0] === digits[4]
  );
}

function assertXXX69(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^[0-9]{3}69$/;

  return regex.test(string2);
}

function assert69XXX(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^69[0-9]{3}$/;

  return regex.test(string2);
}

function assert00XXX(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^00[0-9]{3}$/;

  return regex.test(string2);
}

function assertXXX00(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^[0-9]{3}00$/;

  return regex.test(string2);
}

function assertAAAAAA(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{6}$/;

  return (
    regex.test(string2) &&
    digits[0] === digits[1] &&
    digits[1] === digits[2] &&
    digits[2] === digits[3] &&
    digits[3] === digits[4] &&
    digits[4] === digits[5]
  );
}

function assertABBBBB(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{6}$/;

  return (
    regex.test(string2) &&
    digits[0] !== digits[1] &&
    digits[1] === digits[2] &&
    digits[2] === digits[3] &&
    digits[3] === digits[4] &&
    digits[4] === digits[5]
  );
}

function assertAABBBB(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{6}$/;

  return (
    regex.test(string2) &&
    digits[0] === digits[1] &&
    digits[1] !== digits[2] &&
    digits[2] === digits[3] &&
    digits[3] === digits[4] &&
    digits[4] === digits[5]
  );
}

function assertAAABBB(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{6}$/;

  return (
    regex.test(string2) &&
    digits[0] === digits[1] &&
    digits[1] === digits[2] &&
    digits[2] !== digits[3] &&
    digits[3] === digits[4] &&
    digits[4] === digits[5]
  );
}

function assertAAAABB(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{6}$/;

  return (
    regex.test(string2) &&
    digits[0] === digits[1] &&
    digits[1] === digits[2] &&
    digits[2] === digits[3] &&
    digits[3] !== digits[4] &&
    digits[4] === digits[5]
  );
}

function assertAAAAAB(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{6}$/;

  return (
    regex.test(string2) &&
    digits[0] === digits[1] &&
    digits[1] === digits[2] &&
    digits[2] === digits[3] &&
    digits[3] === digits[4] &&
    digits[4] !== digits[5]
  );
}

function assertABBABB(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{6}$/;

  return (
    regex.test(string2) &&
    digits[0] !== digits[1] &&
    digits[1] === digits[2] &&
    digits[0] === digits[3] &&
    digits[2] === digits[4] &&
    digits[4] === digits[5]
  );
}

function assertABABAB(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{6}$/;

  return (
    regex.test(string2) &&
    digits[0] !== digits[1] &&
    digits[0] === digits[2] &&
    digits[0] === digits[4] &&
    digits[1] === digits[3] &&
    digits[1] === digits[5]
  );
}

function assert00XX00(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^00[0-9]{2}00$/;

  return regex.test(string2);
}

function assertAABBCC(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{6}$/;

  return (
    regex.test(string2) &&
    digits[0] === digits[1] &&
    digits[1] !== digits[2] &&
    digits[2] === digits[3] &&
    digits[3] !== digits[4] &&
    digits[4] === digits[5] &&
    digits[0] !== digits[5]
  );
}

function assertABCCCC(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{6}$/;

  return (
    regex.test(string2) &&
    digits[0] !== digits[1] &&
    digits[1] !== digits[2] &&
    digits[0] !== digits[2] &&
    digits[2] === digits[3] &&
    digits[3] === digits[4] &&
    digits[4] === digits[5]
  );
}

function assertABBBBC(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{6}$/;

  return (
    regex.test(string2) &&
    digits[0] !== digits[1] &&
    digits[1] === digits[2] &&
    digits[2] === digits[3] &&
    digits[3] === digits[4] &&
    digits[4] !== digits[5] &&
    digits[0] !== digits[5]
  );
}

function assertAAAABC(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{6}$/;

  return (
    regex.test(string2) &&
    digits[0] === digits[1] &&
    digits[1] === digits[2] &&
    digits[2] === digits[3] &&
    digits[3] !== digits[4] &&
    digits[4] !== digits[5] &&
    digits[3] !== digits[5]
  );
}

function assertABCABC(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{6}$/;

  return (
    regex.test(string2) &&
    digits[0] !== digits[1] &&
    digits[1] !== digits[2] &&
    digits[0] !== digits[2] &&
    digits[0] === digits[3] &&
    digits[1] === digits[4] &&
    digits[2] === digits[5]
  );
}

function assertXXX420(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^[0-9]{3}420$/;

  return regex.test(string2);
}

function assert420XXX(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^420[0-9]{3}$/;

  return regex.test(string2);
}

function assertXXX000(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^[0-9]{3}000$/;

  return regex.test(string2);
}

function assert000XXX(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^000[0-9]{3}$/;

  return regex.test(string2);
}

function assertAShareCode(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^60[0|1|3][0-9]{3}|000[0-9]{3}$/;

  return regex.test(string2);
}

function assertXXXX69(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^[0-9]{4}69$/;

  return regex.test(string2);
}

function assertAAABBBB(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{7}$/;

  return (
    regex.test(string2) &&
    digits[0] === digits[1] &&
    digits[1] === digits[2] &&
    digits[2] !== digits[3] &&
    digits[3] === digits[4] &&
    digits[4] === digits[5] &&
    digits[5] === digits[6]
  );
}

function assertAAAABBBB(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{8}$/;

  return (
    regex.test(string2) &&
    digits[0] === digits[1] &&
    digits[1] === digits[2] &&
    digits[2] === digits[3] &&
    digits[3] !== digits[4] &&
    digits[4] === digits[5] &&
    digits[5] === digits[6] &&
    digits[6] === digits[7]
  );
}

function assertABBCBBA(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{7}$/;

  return (
    regex.test(string2) &&
    digits[0] !== digits[1] &&
    digits[1] === digits[2] &&
    digits[2] !== digits[3] &&
    digits[0] !== digits[3] &&
    digits[2] === digits[4] &&
    digits[4] === digits[5] &&
    digits[0] === digits[6]
  );
}

function assertWanClub(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^[0-9]{3}0000$/;

  return regex.test(string2);
}

function assertXXXAAAAAAAA(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const digits: number[] = string2.toString().split("").map(Number);
  const regex = /^[0-9]{11}$/;

  return (
    regex.test(string2) &&
    digits[3] === digits[4] &&
    digits[4] === digits[5] &&
    digits[5] === digits[6] &&
    digits[6] === digits[7] &&
    digits[7] === digits[8] &&
    digits[8] === digits[9] &&
    digits[9] === digits[10]
  );
}

function assert0x9(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^0x[0-9]$/;

  return regex.test(string2);
}

function assert0x99(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^0x[0-9]{2}$/;

  return regex.test(string2);
}

function assert1Hex(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^0x[0-9,A,B,C,D,E,F,abcdef]$/;

  return regex.test(string2);
}

function assert2Hex(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^0x[0-9,A,B,C,D,E,F,abcdef]{2}$/;

  return regex.test(string2);
}

function assert3Hex(bitName: string): boolean {
  let string2 = bitName.replace(".bit", "");
  const regex = /^0x[0-9,A,B,C,D,E,F,abcdef]{3}$/;

  return regex.test(string2);
}

//tests

export default function detectPatterns(name: `${string}.bit`): Set<string> {
  const functionSet = new Set<string>(); // Creates a new empty Set

  if (assert999(name) === true) {
    functionSet.add("999");
  }
  if (assertAAA(name) === true) {
    functionSet.add("AAA");
  }
  if (assertABC(name) === true) {
    functionSet.add("ABC");
  }
  if (assertABB(name) === true) {
    functionSet.add("ABB");
  }

  if (assertABA(name) === true) {
    functionSet.add("ABA");
  }

  if (assertAAB(name) === true) {
    functionSet.add("AAB");
  }

  if (assert360Degree(name) === true) {
    functionSet.add("360Degree");
  }

  if (assert0x999(name) === true) {
    functionSet.add("0x999");
  }

  if (assert999JP(name) === true) {
    functionSet.add("999JP");
  }

  if (assert999CN(name) === true) {
    functionSet.add("999CN");
  }

  if (assertArabic999(name) === true) {
    functionSet.add("Arabic999");
  }

  if (assertFlag999(name) === true) {
    functionSet.add("Flag999");
  }

  if (assertABCD(name) === true) {
    functionSet.add("ABCD");
  }

  if (assertAAAA(name) === true) {
    functionSet.add("AAAA");
  }

  if (assertABBB(name) === true) {
    functionSet.add("ABBB");
  }

  if (assertAABB(name) === true) {
    functionSet.add("AABB");
  }

  if (assertAAAB(name) === true) {
    functionSet.add("AAAB");
  }

  if (assertABAA(name) === true) {
    functionSet.add("ABAA");
  }

  if (assertAABA(name) === true) {
    functionSet.add("AABA");
  }

  if (assertABBA(name) === true) {
    functionSet.add("ABBA");
  }

  if (assertABAB(name) === true) {
    functionSet.add("ABAB");
  }

  if (assertAABC(name) === true) {
    functionSet.add("AABC");
  }

  if (assertABCC(name) === true) {
    functionSet.add("ABCC");
  }

  if (assertABBC(name) === true) {
    functionSet.add("ABBC");
  }

  if (assert0XXX(name) === true) {
    functionSet.add("0XXX");
  }

  if (assert00XX(name) === true) {
    functionSet.add("00XX");
  }

  if (assert0X0X(name) === true) {
    functionSet.add("0X0X");
  }

  if (assert0XX0(name) === true) {
    functionSet.add("0XX0");
  }

  if (assertXX00(name) === true) {
    functionSet.add("XX00");
  }

  if (assertXX88(name) === true) {
    functionSet.add("XX88");
  }

  if (assertXX69(name) === true) {
    functionSet.add("XX69");
  }

  if (assertTimesTable(name) === true) {
    functionSet.add("TimesTable");
  }

  if (assertMMDD(name) === true) {
    functionSet.add("MMDD");
  }

  if (assert10K(name) === true) {
    functionSet.add("10K");
  }

  if (assert0x10K(name) === true) {
    functionSet.add("0x10K");
  }

  if (assertArabic10K(name) === true) {
    functionSet.add("Arabic10K");
  }

  if (assert100K(name) === true) {
    functionSet.add("100K");
  }

  if (assertAAAAA(name) === true) {
    functionSet.add("AAAAA");
  }

  if (assertABCDE(name) === true) {
    functionSet.add("ABCDE");
  }

  if (assertABBBB(name) === true) {
    functionSet.add("ABBBB");
  }

  if (assertAABBB(name) === true) {
    functionSet.add("AABBB");
  }

  if (assertAAABB(name) === true) {
    functionSet.add("AAABB");
  }

  if (assertAAAAB(name) === true) {
    functionSet.add("AAAAB");
  }

  if (assertABBBA(name) === true) {
    functionSet.add("ABBBA");
  }

  if (assertABAAA(name) === true) {
    functionSet.add("ABAAA");
  }

  if (assertAABAA(name) === true) {
    functionSet.add("AABAA");
  }

  if (assertAAABA(name) === true) {
    functionSet.add("AAABA");
  }

  if (assertABABA(name) === true) {
    functionSet.add("ABABA");
  }

  if (assertXABCD(name) === true) {
    functionSet.add("XABCD");
  }

  if (assertXX000(name) === true) {
    functionSet.add("XX000");
  }

  if (assert00XX0(name) === true) {
    functionSet.add("00XX0");
  }

  if (assert000XX(name) === true) {
    functionSet.add("000XX");
  }

  if (assertXX420(name) === true) {
    functionSet.add("XX420");
  }

  if (assertAAABC(name) === true) {
    functionSet.add("AAABC");
  }

  if (assertAABBC(name) === true) {
    functionSet.add("AABBC");
  }

  if (assertAABCC(name) === true) {
    functionSet.add("AABCC");
  }

  if (assertABCCC(name) === true) {
    functionSet.add("ABCCC");
  }

  if (assertABBCC(name) === true) {
    functionSet.add("ABBCC");
  }

  if (assertABBBC(name) === true) {
    functionSet.add("ABBBC");
  }

  if (assertABCBA(name) === true) {
    functionSet.add("ABCBA");
  }

  if (assertXXX69(name) === true) {
    functionSet.add("XXX69");
  }

  if (assert69XXX(name) === true) {
    functionSet.add("69XXX");
  }

  if (assert00XXX(name) === true) {
    functionSet.add("00XXX");
  }

  if (assertXXX00(name) === true) {
    functionSet.add("XXX00");
  }

  if (assertAAAAAA(name) === true) {
    functionSet.add("AAAAAA");
  }

  if (assertABBBBB(name) === true) {
    functionSet.add("ABBBBB");
  }

  if (assertAABAA(name) === true) {
    functionSet.add("AABAA");
  }

  if (assertAABBBB(name) === true) {
    functionSet.add("AABBBB");
  }

  if (assertAAABBB(name) === true) {
    functionSet.add("AAABBB");
  }

  if (assertAAAABB(name) === true) {
    functionSet.add("AAAABB");
  }

  if (assertAAAAAB(name) === true) {
    functionSet.add("AAAAAB");
  }

  if (assertABBABB(name) === true) {
    functionSet.add("ABBABB");
  }

  if (assertABABAB(name) === true) {
    functionSet.add("ABABAB");
  }

  if (assert00XX00(name) === true) {
    functionSet.add("00XX00");
  }

  if (assertAABBCC(name) === true) {
    functionSet.add("AABBCC");
  }

  if (assertABCCCC(name) === true) {
    functionSet.add("ABCCCC");
  }

  if (assertABBBBC(name) === true) {
    functionSet.add("ABBBBC");
  }

  if (assertAAAABC(name) === true) {
    functionSet.add("AAAABC");
  }

  if (assertABCABC(name) === true) {
    functionSet.add("ABCABC");
  }

  if (assertXXX420(name) === true) {
    functionSet.add("XXX420");
  }

  if (assert420XXX(name) === true) {
    functionSet.add("420XXX");
  }

  if (assertXXX000(name) === true) {
    functionSet.add("XXX000");
  }

  if (assert000XXX(name) === true) {
    functionSet.add("000XXX");
  }

  if (assertAShareCode(name) === true) {
    functionSet.add("AShareCode");
  }

  if (assertXXXX69(name) === true) {
    functionSet.add("XXXX69");
  }

  if (assertAAABBBB(name) === true) {
    functionSet.add("AAABBBB");
  }

  if (assertAAAABBBB(name) === true) {
    functionSet.add("AAAABBBB");
  }

  if (assertABBCBBA(name) === true) {
    functionSet.add("ABBCBBA");
  }

  if (assertWanClub(name) === true) {
    functionSet.add("WanClub");
  }

  if (assertXXXAAAAAAAA(name) === true) {
    functionSet.add("XXXAAAAAAAA");
  }

  if (assert0x9(name) === true) {
    functionSet.add("0x9");
  }

  if (assert0x99(name) === true) {
    functionSet.add("0x99");
  }

  if (assert1Hex(name) === true) {
    functionSet.add("1Hex");
  }

  if (assert2Hex(name) === true) {
    functionSet.add("2Hex");
  }

  if (assert3Hex(name) === true) {
    functionSet.add("3Hex");
  }

  return functionSet; // Return the Set
}

const bitName = "77377.bit";
console.log("this is bitName", bitName);
console.log(
  "this is classification(s) returned using detectPatterns",
  detectPatterns(bitName)
);
//Use formula above to see classifications returned based on 'bitName' variable

//run basic tests as suggested at `https://gist.github.com/renzholy/f857b464518e0cf97549a3aee141bd74`
assert.deepEqual(detectPatterns("333.bit"), new Set(["AAA", "999"]));
assert.deepEqual(detectPatterns("2112.bit"), new Set(["ABBA", "10K"]));
assert.deepEqual(detectPatterns("45555.bit"), new Set(["ABBBB", "100K"]));
assert.deepEqual(detectPatterns("888000.bit"), new Set(["AAABBB", "XXX000"]));
assert.deepEqual(
  detectPatterns("0098.bit"),
  new Set(["10K", "AABC", "0XXX", "00XX"])
);
assert.deepEqual(detectPatterns("0x9832.bit"), new Set(["0x10K"]));
assert.deepEqual(
  detectPatterns("0311.bit"),
  new Set(["ABCC", "0XXX", "10K", "MMDD"])
);
