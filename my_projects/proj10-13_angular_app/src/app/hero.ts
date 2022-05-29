import { powerStats } from "./powerStats";

export interface Hero {
    id: number;
    name: string;
    powerStats: powerStats;
    overallRating?: number  
  }