function ExtendableBuiltin(cls){
    function ExtendableBuiltin(){
        cls.apply(this, arguments);
    }
    ExtendableBuiltin.prototype = Object.create(cls.prototype);
    Object.setPrototypeOf(ExtendableBuiltin, cls);

    return ExtendableBuiltin;
}


class CustomError extends ExtendableBuiltin(Error) {
  constructor(reason = "unknown reason", errors = {}) {
    super(reason)
    this.description = {reason, errors}
    this.type = "CustomError";
  }

  log() {
    LOG('CustomError description: ', this.description)
  }

  reason() {
    return this.description.reason
  }

  errors() {
    return this.description.errors
  }
}

export default CustomError
