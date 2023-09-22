import { DurableObject, DurableObjectState } from "@cloudflare/workers-types";

export class AlarmStack {
  state: DurableObjectState
  constructor(state: DurableObjectState) {
    this.state = state
  }

  async handleAlarm(func: () => void | Promise<void>) {

  }
}
