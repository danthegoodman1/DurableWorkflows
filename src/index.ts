import {
  DurableObject,
  DurableObjectState,
  Request,
  Response,
} from "@cloudflare/workers-types"
import { AlarmStack } from "./alarm_stack"

export interface WorkflowMethods {
  Sleep(untilMS: number): Promise<void>
  /**
   * @param signal The name of the signal
   * @param waitForMS How long to wait, if undefined or 0 will wait for ever
   */
  WaitForSignal<T>(signal: string, waitForMS?: number): Promise<T | any>
  /**
   * @param name The name of the function for the event history
   * @param activity The function to execute
   */
  Activity<Output>(name: string, func: () => Promise<Output>): Promise<Output>
}

interface DurableWorkflowOptions<T> {
  /**
   * The type of durable object
   */
  Name: string

  /**
   * The workflow function
   */
  Workflow(workflow: WorkflowMethods, input?: T): void | Promise<void>
}

interface Env {}

export function CreateWorkflow<T>(options: DurableWorkflowOptions<T>) {
  return class DurableWorkflow implements DurableObject {
    state: DurableObjectState
    alarmStack: AlarmStack
    env: Env

    constructor(state: DurableObjectState, env: Env) {
      this.state = state
      this.env = env
      this.alarmStack = new AlarmStack(this.state)
    }

    async fetch(request: Request) {
      return new Response()
    }

    async alarm() {

    }
  }
}
