class CustomError extends Error {
  constructor(status, message, name = "CustomError") {
    super();
    this.tatus = status;
    this.message = message;
    this.name = name;
  }
}

export { CustomError };
