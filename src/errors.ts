export class NonDeterministicError extends Error {
  constructor(expected: {type: string, input: string}, got: {type: string, input: string}) {
    super(`non deterministic code execution (got ${JSON.stringify(got)}) (expected ${JSON.stringify(expected)})`)
  }
}


export class InvalidEventType extends Error {
  constructor(type: string) {
    super(`the event type ${type} is not allowed to be invoked manually`)
  }
}
