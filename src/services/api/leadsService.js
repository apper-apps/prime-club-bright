import mockLeads from "@/services/mockData/leads.json";

class LeadsService {
  constructor() {
    this.leads = [...mockLeads];
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.leads];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const lead = this.leads.find(lead => lead.Id === id);
    if (!lead) {
      throw new Error(`Lead with ID ${id} not found`);
    }
    return { ...lead };
  }

  async create(leadData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newId = Math.max(...this.leads.map(lead => lead.Id), 0) + 1;
    const newLead = {
      Id: newId,
      ...leadData,
      createdAt: new Date().toISOString(),
      lastContact: new Date().toISOString()
    };
    this.leads.push(newLead);
    return { ...newLead };
  }

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.leads.findIndex(lead => lead.Id === id);
    if (index === -1) {
      throw new Error(`Lead with ID ${id} not found`);
    }
    this.leads[index] = { ...this.leads[index], ...updates };
    return { ...this.leads[index] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.leads.findIndex(lead => lead.Id === id);
    if (index === -1) {
      throw new Error(`Lead with ID ${id} not found`);
    }
    this.leads.splice(index, 1);
    return true;
  }
}

export const leadsService = new LeadsService();