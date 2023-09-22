import {
  DurableObject,
  DurableObjectState,
  Request,
  Response,
} from "@cloudflare/workers-types"
import { AlarmStack } from "./alarm_stack"

export interface WorkflowMethods {
  Sleep(untilMS: number): Promise<void>
  WaitForSignal<T>(signal: string, waitForMS?: number): Promise<T | any>
  Activity<Output>(activity: () => Promise<Output>): Promise<Output>
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
