import { DurableObjectState } from "@cloudflare/workers-types";
import { WorkflowMethods } from ".";
import { NonDeterministicError } from "./errors";

export type EventType = 'ActivityStart' | 'ActivityFailure' | 'ActivityResult' | 'SignalRecevied' | 'SignalListenerCreated' | 'SignalReturned' | 'Sleep'

interface HistoryItem {
  type: EventType
  /**
   * For activities, this is the name, for everything else this is the stringified JSON of the parameters
   */
  input: string
  /**
   * For Activity and WaitForSignal
   */
  output?: string
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

  private handleExecution(t: EventType, input: string, output: string) {
    if (this.offset !== this.memHist.length) {
      // Let's check if this is the next item
      let nextItem: HistoryItem
      while (true) {
        nextItem = this.memHist[this.offset]
        if (nextItem.type === 'SignalRecevied') {
          // These are skippable
          this.offset++
          continue
        }
        if (nextItem.type !== t || nextItem.input !== input) {
          // Non-deterministic behavior
          throw new NonDeterministicError({
            type: nextItem.type,
            input: nextItem.input
          }, {
            input: input,
            type: t
          })
        }

        // Otherwise we return the output
        return nextItem.output
      }
    }

    // Otherwise we process it
    const thisItem: HistoryItem = {
      input: input,
      seq: this.offset,
      type: t
    }

    switch (t) {
      case 'ActivityStart':
        
        break;
      case 'ActivityStart':
        
        break;
      case 'ActivityStart':
        
        break;
    
      default:
        break;
    }
  }

  async Activity<Output>(name: string, func: () => Output | Promise<Output>): Promise<Output> {

  }

  async Sleep(untilMS: number) {
      
  }

  async WaitForSignal<T>(signal: string, waitForMS?: number | undefined): Promise<string | undefined> {
      
  }

}
