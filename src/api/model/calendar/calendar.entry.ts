export interface CalendarEntry {
  startAt: string;
  endAt: string;
  repeatRules?: string[];
  repeatUntil?: string;
}