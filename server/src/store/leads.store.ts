import { Lead } from "../types";

export class LeadsStore {
  private leads: Lead[] = [];

  add(lead: Lead): Lead {
    this.leads.push(lead);
    return lead;
  }

  getAll(): Lead[] {
    return [...this.leads].sort((a, b) => b.totalScore - a.totalScore);
  }

  getById(id: string): Lead | undefined {
    return this.leads.find((lead) => lead.id === id);
  }

  clear(): void {
    this.leads = [];
  }

  count(): number {
    return this.leads.length;
  }
}

export const leadsStore = new LeadsStore();
