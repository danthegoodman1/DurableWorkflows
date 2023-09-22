import { DurableObjectState } from "@cloudflare/workers-types";
import { WorkflowMethods } from ".";

export type EventType = 'ActivityStart' | 'ActivityFailure' | 'ActivityResult' | 'SignalRecevied' | 'SignalReturned'

interface HistoryItem {
  type: EventType
  input?: any
  output?: any
  /**
   * The sequence number appearing in the list
   */
  seq: number
}

export class Events implements WorkflowMethods {
  state: DurableObjectState
  memHist: HistoryItem[]
  offset: number

  constructor(state: DurableObjectState) {
    this.state = state
    this.offset = 0
    this.memHist = []
  }

  private handleExecution(t: EventType, input?: any, output?: any) {
    if (this.offset != this.memHist.length) {
      // Let's check if this is the next item
      
    }
  }

  Activity<Output>(activity: () => Promise<Output>): Promise<Output> {

  }

  Sleep(untilMS: number): Promise<void> {
      
  }

  WaitForSignal<T>(signal: string, waitForMS?: number | undefined): Promise<any> {
      
  }

}
