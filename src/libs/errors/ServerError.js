class ServerError extends Error {
  constructor(title, errors) {
    super();
    this.title = title;
    this.errors = errors;
  }

  getTitle() {
    return this.title;
  }

  getErrors() {
    return this.errors;
  }
}