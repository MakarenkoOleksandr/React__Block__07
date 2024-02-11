import "@testing-library/jest-dom";
import App from "../App.js";
import { render, fireEvent, screen, act } from '@testing-library/react'

describe("b7ex01: Form Validation", () => {
  it("#1 In a functional App.js there should be a form with 3 inputs (each with an onChange event updating state) and a button", () => {
    render(<App />)
    const inputs = screen.getAllByRole("textbox")
    expect(inputs.length).toBe(3)
    let onChangeSomewhere = false
    inputs.forEach(input => {
      const key = Object.keys(input)[0]
      if (Object.keys(input[key].pendingProps).includes("onChange")) {
        onChangeSomewhere = true
      } else onChangeSomewhere = false
    })
    if (!onChangeSomewhere) {
      const key = Object.keys(inputs[0])[0]
      const key2 = Object.keys(inputs[0][key].return.return.child.stateNode)[1]
      if (!Object.keys(inputs[0][key].return.return.child.stateNode[key2]).includes("onChange")) return false
    }
    expect(screen.getByRole("button")).toBeInTheDocument()
  });
  it("#2 No message should be displayed initially", () => {
    render(<App />)
    expect(screen.getByRole("heading", { level: 2 }).innerHTML).toBe("")
  });
  it("3 After hitting submit there should be a red message 'Please, provide a valid email'", () => {
    render(<App />)
    fireEvent.click(screen.getByRole("button"))
    const message = screen.getByRole("heading", { level: 2 })
    expect(message.innerHTML).toBe("Please, provide a valid email")
    const key = Object.keys(message)[1]
    expect(message[key].style.color).toBe("red")
  });
  it("#4 After typing two @@ in the email input and submitting, there should be a red message 'Please, provide a valid email'", () => {
    render(<App />)
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input) => {
      const key = Object.keys(input)[1]
      if (input[key].name === "email") {
        fireEvent.change(input, { target: { value: "@@" } });
      }
    });
    fireEvent.click(screen.getByRole("button"))
    const message = screen.getByRole("heading", { level: 2 })
    expect(message.innerHTML).toBe("Please, provide a valid email")
    const key = Object.keys(message)[1]
    expect(message[key].style.color).toBe("red")
  });
  it("#5 After typing a correct email and a password with less than 8 characters there should be a red message 'Password must have at least 8 characters'", () => {
    render(<App />)
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input) => {
      const key = Object.keys(input)[1]
      if (input[key].name === "email") {
        fireEvent.change(input, { target: { value: "mail@mail.com" } });
      } else if (input[key].name === "password") {
        fireEvent.change(input, { target: { value: "1234567" } });
      }
    });
    fireEvent.click(screen.getByRole("button"))
    const message = screen.getByRole("heading", { level: 2 })
    expect(message.innerHTML).toBe("Password must have at least 8 characters")
    const key = Object.keys(message)[1]
    expect(message[key].style.color).toBe("red")
  });
  it("#6 By typing two passwords longer than 8 characters but without matching there should be a red message 'Passwords should match", () => {
    render(<App />)
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input) => {
      const key = Object.keys(input)[1]
      if (input[key].name === "email") {
        fireEvent.change(input, { target: { value: "mail@mail.com" } });
      } else if (input[key].name === "password") {
        fireEvent.change(input, { target: { value: "12345678" } });
      } else if (input[key].name === "password2") {
        fireEvent.change(input, { target: { value: "01234567" } });
      }
    });
    fireEvent.click(screen.getByRole("button"))
    const message = screen.getByRole("heading", { level: 2 })
    expect(message.innerHTML).toBe("Passwords should match")
    const key = Object.keys(message)[1]
    expect(message[key].style.color).toBe("red")
  });
  it("#7 By typing everything correctly there should be a green message 'Successfully registered", () => {
    render(<App />)
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input) => {
      const key = Object.keys(input)[1]
      if (input[key].name === "email") {
        fireEvent.change(input, { target: { value: "mail@mail.com" } });
      } else if (input[key].name === "password") {
        fireEvent.change(input, { target: { value: "12345678" } });
      } else if (input[key].name === "password2") {
        fireEvent.change(input, { target: { value: "12345678" } });
      }
    });
    fireEvent.click(screen.getByRole("button"))
    const message = screen.getByRole("heading", { level: 2 })
    expect(message.innerHTML).toBe("Successfully registered")
    const key = Object.keys(message)[1]
    expect(message[key].style.color).toBe("green")
  });
  it("#8 Message should be empty string after 2 seconds", async () => {
    render(<App />)
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2100));
    });
    expect(screen.getByRole("heading", { level: 2 }).innerHTML).toBe("");
  });
});