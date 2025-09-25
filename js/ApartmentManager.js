export class ApartmentManager {
  constructor() {
    this.apartments = JSON.parse(localStorage.getItem('apartments')) || [];
    this.blocks = JSON.parse(localStorage.getItem('blocks')) || {};
    this.units = JSON.parse(localStorage.getItem('units')) || {};
    this.payments = JSON.parse(localStorage.getItem('payments')) || {};
    this.feeCategories = JSON.parse(localStorage.getItem('feeCategories')) || [];
    this.currentApartmentId = null;
    this.currentBlockId = null;
  }

  save() {
    localStorage.setItem('apartments', JSON.stringify(this.apartments));
    localStorage.setItem('blocks', JSON.stringify(this.blocks));
    localStorage.setItem('units', JSON.stringify(this.units));
    localStorage.setItem('payments', JSON.stringify(this.payments));
    localStorage.setItem('feeCategories', JSON.stringify(this.feeCategories));
  }

  generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 5);
  }

  // Apartman işlemleri
  addApartment(name, address) {
    const id = this.generateId();
    const apartment = { id, name, address, createdAt: new Date().toISOString() };
    this.apartments.push(apartment);
    this.blocks[id] = [];
    this.units[id] = {};
    this.payments[id] = {};
    this.save();
    return apartment;
  }

  deleteApartment(id) {
    this.apartments = this.apartments.filter(apt => apt.id !== id);
    delete this.blocks[id];
    delete this.units[id];
    delete this.payments[id];
    this.save();
  }

  // Blok işlemleri
  addBlock(apartmentId, name) {
    const id = this.generateId();
    const block = { id, name, apartmentId };
    if (!this.blocks[apartmentId]) this.blocks[apartmentId] = [];
    this.blocks[apartmentId].push(block);
    this.units[apartmentId][id] = [];
    this.payments[apartmentId][id] = {};
    this.save();
    return block;
  }

  deleteBlock(apartmentId, blockId) {
    this.blocks[apartmentId] = this.blocks[apartmentId].filter(b => b.id !== blockId);
    delete this.units[apartmentId][blockId];
    delete this.payments[apartmentId][blockId];
    this.save();
  }

  // Daire işlemleri
  addUnit(apartmentId, blockId, number, residentName, residentType) {
    const id = this.generateId();
    const unit = { id, number, residentName, residentType, apartmentId, blockId };
    
    if (!this.units[apartmentId]) this.units[apartmentId] = {};
    if (!this.units[apartmentId][blockId]) this.units[apartmentId][blockId] = [];
    
    this.units[apartmentId][blockId].push(unit);
    
    if (!this.payments[apartmentId]) this.payments[apartmentId] = {};
    if (!this.payments[apartmentId][blockId]) this.payments[apartmentId][blockId] = {};
    this.payments[apartmentId][blockId][id] = {};
    
    this.save();
    return unit;
  }

  deleteUnit(apartmentId, blockId, unitId) {
    this.units[apartmentId][blockId] = this.units[apartmentId][blockId].filter(u => u.id !== unitId);
    delete this.payments[apartmentId][blockId][unitId];
    this.save();
  }

  // Ödeme işlemleri
  addPayment(apartmentId, blockId, unitId, year, month, category, amount) {
    const key = `${year}-${month}-${category}`;
    
    if (!this.payments[apartmentId]) this.payments[apartmentId] = {};
    if (!this.payments[apartmentId][blockId]) this.payments[apartmentId][blockId] = {};
    if (!this.payments[apartmentId][blockId][unitId]) this.payments[apartmentId][blockId][unitId] = {};
    
    this.payments[apartmentId][blockId][unitId][key] = {
      year,
      month,
      category,
      amount,
      paidAt: new Date().toISOString()
    };
    
    this.save();
  }

  removePayment(apartmentId, blockId, unitId, year, month, category) {
    const key = `${year}-${month}-${category}`;
    if (this.payments[apartmentId]?.[blockId]?.[unitId]) {
      delete this.payments[apartmentId][blockId][unitId][key];
      this.save();
    }
  }

  getPayment(apartmentId, blockId, unitId, year, month, category) {
    const key = `${year}-${month}-${category}`;
    return this.payments[apartmentId]?.[blockId]?.[unitId]?.[key];
  }

  // Aidat kategorileri
  addFeeCategory(name, defaultAmount) {
    const id = this.generateId();
    const category = { id, name, defaultAmount };
    this.feeCategories.push(category);
    this.save();
    return category;
  }

  deleteFeeCategory(id) {
    this.feeCategories = this.feeCategories.filter(cat => cat.id !== id);
    this.save();
  }

  updateFeeCategory(id, name, defaultAmount) {
    const category = this.feeCategories.find(cat => cat.id === id);
    if (category) {
      category.name = name;
      category.defaultAmount = defaultAmount;
      this.save();
    }
  }

  // Raporlar
  getUnpaidFees(apartmentId, year, month) {
    const unpaid = [];
    const blocks = this.blocks[apartmentId] || [];
    
    blocks.forEach(block => {
      const units = this.units[apartmentId][block.id] || [];
      units.forEach(unit => {
        this.feeCategories.forEach(category => {
          const payment = this.getPayment(apartmentId, block.id, unit.id, year, month, category.name);
          if (!payment) {
            unpaid.push({
              apartment: this.apartments.find(a => a.id === apartmentId),
              block,
              unit,
              category,
              year,
              month
            });
          }
        });
      });
    });
    
    return unpaid;
  }

  getMonthlyReport(apartmentId, year, month) {
    const report = {
      totalExpected: 0,
      totalCollected: 0,
      paidUnits: 0,
      totalUnits: 0,
      details: []
    };

    const blocks = this.blocks[apartmentId] || [];
    
    blocks.forEach(block => {
      const units = this.units[apartmentId][block.id] || [];
      units.forEach(unit => {
        report.totalUnits++;
        let unitPaid = false;
        let unitExpected = 0;
        let unitCollected = 0;

        this.feeCategories.forEach(category => {
          unitExpected += category.defaultAmount;
          report.totalExpected += category.defaultAmount;

          const payment = this.getPayment(apartmentId, block.id, unit.id, year, month, category.name);
          if (payment) {
            unitCollected += payment.amount;
            report.totalCollected += payment.amount;
            unitPaid = true;
          }
        });

        if (unitPaid) report.paidUnits++;

        report.details.push({
          block,
          unit,
          expected: unitExpected,
          collected: unitCollected,
          paid: unitPaid
        });
      });
    });

    return report;
  }
}
