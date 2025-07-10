import mockSalesReps from "@/services/mockData/salesReps.json";

class SalesRepsService {
  constructor() {
    this.salesReps = [...mockSalesReps];
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 250));
    return [...this.salesReps];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const rep = this.salesReps.find(rep => rep.Id === id);
    if (!rep) {
      throw new Error(`Sales rep with ID ${id} not found`);
    }
    return { ...rep };
  }

  async create(repData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newId = Math.max(...this.salesReps.map(rep => rep.Id), 0) + 1;
    const newRep = {
      Id: newId,
      ...repData,
      leadsContacted: 0,
      meetingsBooked: 0,
      dealsClosed: 0,
      revenue: 0,
      isHunterOfMonth: false
    };
    this.salesReps.push(newRep);
    return { ...newRep };
  }

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.salesReps.findIndex(rep => rep.Id === id);
    if (index === -1) {
      throw new Error(`Sales rep with ID ${id} not found`);
    }
    this.salesReps[index] = { ...this.salesReps[index], ...updates };
    return { ...this.salesReps[index] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.salesReps.findIndex(rep => rep.Id === id);
    if (index === -1) {
      throw new Error(`Sales rep with ID ${id} not found`);
    }
    this.salesReps.splice(index, 1);
    return true;
  }
}

export const salesRepsService = new SalesRepsService();