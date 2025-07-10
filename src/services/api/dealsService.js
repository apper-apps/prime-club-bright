import mockDeals from "@/services/mockData/deals.json";

class DealsService {
  constructor() {
    this.deals = [...mockDeals];
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 350));
    return [...this.deals];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const deal = this.deals.find(deal => deal.Id === id);
    if (!deal) {
      throw new Error(`Deal with ID ${id} not found`);
    }
    return { ...deal };
  }

  async create(dealData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newId = Math.max(...this.deals.map(deal => deal.Id), 0) + 1;
    const newDeal = {
      Id: newId,
      ...dealData,
      createdAt: new Date().toISOString()
    };
    this.deals.push(newDeal);
    return { ...newDeal };
  }

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.deals.findIndex(deal => deal.Id === id);
    if (index === -1) {
      throw new Error(`Deal with ID ${id} not found`);
    }
    this.deals[index] = { ...this.deals[index], ...updates };
    return { ...this.deals[index] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.deals.findIndex(deal => deal.Id === id);
    if (index === -1) {
      throw new Error(`Deal with ID ${id} not found`);
    }
    this.deals.splice(index, 1);
    return true;
  }
}

export const dealsService = new DealsService();