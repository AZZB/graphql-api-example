import { GraphQLError } from 'graphql';

class CustomError extends GraphQLError {
    constructor(reason, errors) {
        super(reason)

        this.state = {
            reason,
            errors,
        }
    }
}

export default CustomError