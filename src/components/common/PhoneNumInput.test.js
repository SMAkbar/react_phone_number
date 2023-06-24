import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { PhoneNumInput } from ".";

/**
 * Task 01 REACT
 */
test("samplePhoneNumber is in the DOM", () => {
  render(<PhoneNumInput />);
  const samplePhoneNumber = screen.getByText(/\(123\) 456-7890/i);
  expect(samplePhoneNumber).toBeInTheDocument();
});

test("phoneInput is in the DOM", () => {
  render(<PhoneNumInput />);
  const phoneInput = screen.getByLabelText("(123) 456-7890");
  expect(phoneInput).toBeInTheDocument();
});

test("phoneInput should be empty string when initially rendered", () => {
  render(<PhoneNumInput />);
  const phoneInput = screen.getByLabelText("(123) 456-7890");
  expect(phoneInput.value).toBe("");
});

test("phoneInput should be simple number till 3 digits", async () => {
  user.setup();
  render(<PhoneNumInput />);
  const phoneInput = screen.getByLabelText("(123) 456-7890");
  expect(phoneInput.value).toBe("");

  await user.type(phoneInput, "1");
  expect(phoneInput.value).toBe("1");

  await user.type(phoneInput, "{backspace}12");
  expect(phoneInput.value).toBe("12");

  await user.type(phoneInput, "{backspace}{backspace}123");
  expect(phoneInput.value).toBe("123");
});

test("phoneInput should be have brackets when 4 digits are present", async () => {
  user.setup();
  render(<PhoneNumInput />);
  const phoneInput = screen.getByLabelText("(123) 456-7890");
  expect(phoneInput.value).toBe("");

  await user.type(phoneInput, "1234");
  expect(phoneInput.value).toBe("(123) 4");
});

test("phoneInput should remove brackets when back to 3 digits", async () => {
  user.setup();
  render(<PhoneNumInput />);
  const phoneInput = screen.getByLabelText("(123) 456-7890");
  expect(phoneInput.value).toBe("");

  await user.type(phoneInput, "1234{backspace}");
  expect(phoneInput.value).toBe("123");
});

test("phoneInput should be have only brackets till 6 digits", async () => {
  user.setup();
  render(<PhoneNumInput />);
  const phoneInput = screen.getByLabelText("(123) 456-7890");
  expect(phoneInput.value).toBe("");

  await user.type(phoneInput, "123456");
  expect(phoneInput.value).toBe("(123) 456");
});

test("phoneInput should have () and - with 7 digits", async () => {
  user.setup();
  render(<PhoneNumInput />);
  const phoneInput = screen.getByLabelText("(123) 456-7890");
  expect(phoneInput.value).toBe("");

  await user.type(phoneInput, "1234567");
  expect(phoneInput.value).toBe("(123) 456-7");
});

test("phoneInput should only have () when 1 digit is removed from 7 digits", async () => {
  user.setup();
  render(<PhoneNumInput />);
  const phoneInput = screen.getByLabelText("(123) 456-7890");
  expect(phoneInput.value).toBe("");

  await user.type(phoneInput, "1234567{backspace}");
  expect(phoneInput.value).toBe("(123) 456");
});

test("phoneInput should not allow more than 16 characters", async () => {
  user.setup();
  render(<PhoneNumInput />);
  const phoneInput = screen.getByLabelText("(123) 456-7890");
  expect(phoneInput.value).toBe("");

  await user.type(phoneInput, "12345678907890123456123123132");
  expect(phoneInput.value).toBe("(123) 456-7890789012");
});



/**
 * Task 02 REACT
 */
test("caret should retain there position if there are only three characters", async () => {
  user.setup();
  render(<PhoneNumInput />);
  const phoneInput = screen.getByLabelText("(123) 456-7890");
  expect(phoneInput.value).toBe("");

  await user.type(phoneInput, "123{arrowleft}{backspace}{backspace}");
  expect(phoneInput.value).toBe("3");
});


test("caret should retain there position for 1st part if there are only six characters", async () => {
  user.setup();
  render(<PhoneNumInput />);
  const phoneInput = screen.getByLabelText("(123) 456-7890");
  expect(phoneInput.value).toBe("");

  await user.type(
    phoneInput,
    "123456{arrowleft}{arrowleft}{arrowleft}{arrowleft}{backspace}{backspace}"
  );
  expect(phoneInput.value).toBe("(124) 56");
});

test("caret should retain there position for 1st part if there are only six characters", async () => {
  user.setup();
  render(<PhoneNumInput />);
  const phoneInput = screen.getByLabelText("(123) 456-7890");
  expect(phoneInput.value).toBe("");

  await user.type(
    phoneInput,
    "123456{arrowleft}{backspace}{backspace}"
  );
  expect(phoneInput.value).toBe("(123) 6");
});


test("caret should retain there position for 1st part if there are only 10 characters", async () => {
  user.setup();
  render(<PhoneNumInput />);
  const phoneInput = screen.getByLabelText("(123) 456-7890");
  expect(phoneInput.value).toBe("");

  await user.type(
    phoneInput,
    "1234567890{arrowleft}{arrowleft}{arrowleft}{arrowleft}{arrowleft}{arrowleft}{arrowleft}{arrowleft}{arrowleft}{arrowleft}{backspace}{backspace}"
  );
  expect(phoneInput.value).toBe("(145) 678-90");
});

test("caret should retain there position for 2nd part if there are only 10 characters", async () => {
  user.setup();
  render(<PhoneNumInput />);
  const phoneInput = screen.getByLabelText("(123) 456-7890");
  expect(phoneInput.value).toBe("");

  await user.type(
    phoneInput,
    "1234567890{arrowleft}{arrowleft}{arrowleft}{arrowleft}{arrowleft}{backspace}{backspace}"
  );
  expect(phoneInput.value).toBe("(123) 478-90");
});

test("caret should retain there position for 2nd part if there are only 10 characters", async () => {
  user.setup();
  render(<PhoneNumInput />);
  const phoneInput = screen.getByLabelText("(123) 456-7890");
  expect(phoneInput.value).toBe("");

  await user.type(phoneInput, "1234567890{arrowleft}{backspace}{backspace}");
  expect(phoneInput.value).toBe("(123) 456-70");
});