import { ApartmentManager } from './js/ApartmentManager.js';
import { UI } from './js/UI.js';
import './style.css';

class App {
  constructor() {
    this.manager = new ApartmentManager();
    this.ui = new UI(this.manager);
    this.currentPage = 'dashboard';
    this.init();
  }

  init() {
    this.ui.render();
    this.setupEventListeners();
    this.loadDemoData();
  }

  setupEventListeners() {
    // Navigation events
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-page]')) {
        e.preventDefault();
        this.changePage(e.target.dataset.page);
      }
    });
  }

  changePage(page) {
    this.currentPage = page;
    this.ui.showPage(page);
    this.updateActiveNav(page);
  }

  updateActiveNav(page) {
    document.querySelectorAll('[data-page]').forEach(nav => {
      nav.classList.remove('bg-primary-500', 'text-white');
      nav.classList.add('text-gray-600');
    });
    
    const activeNav = document.querySelector(`[data-page="${page}"]`);
    if (activeNav) {
      activeNav.classList.add('bg-primary-500', 'text-white');
      activeNav.classList.remove('text-gray-600');
    }
  }

  loadDemoData() {
    // Demo veriler
    const apartment1 = this.manager.addApartment('Gül Sitesi', 'Çiçek Mahallesi Papatya Sokak No:5');
    
    const block1 = this.manager.addBlock(apartment1.id, 'A Blok');
    const block2 = this.manager.addBlock(apartment1.id, 'B Blok');
    
    // A Blok daireleri
    this.manager.addUnit(apartment1.id, block1.id, '1', 'Ahmet Yılmaz', 'owner');
    this.manager.addUnit(apartment1.id, block1.id, '2', 'Fatma Demir', 'tenant');
    this.manager.addUnit(apartment1.id, block1.id, '3', 'Mehmet Kaya', 'owner');
    this.manager.addUnit(apartment1.id, block1.id, '4', 'Ayşe Şahin', 'tenant');
    
    // B Blok daireleri
    this.manager.addUnit(apartment1.id, block2.id, '1', 'Ali Öztürk', 'owner');
    this.manager.addUnit(apartment1.id, block2.id, '2', 'Zeynep Acar', 'owner');
    
    // Aidat kategorileri
    this.manager.addFeeCategory('Aidat', 500);
    this.manager.addFeeCategory('Asansör Bakım', 50);
    this.manager.addFeeCategory('Temizlik', 100);
    
    // Demo ödemeler
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    // Bu ay ve geçen ay için örnek ödemeler
    this.manager.apartments.forEach(apt => {
      this.manager.blocks[apt.id]?.forEach(block => {
        this.manager.units[apt.id]?.[block.id]?.forEach(unit => {
          // Bu ayın aidatı (bazıları ödendi)
          if (Math.random() > 0.3) {
            this.manager.addPayment(apt.id, block.id, unit.id, currentYear, currentMonth, 'Aidat', 500);
          }
          
          // Geçen ayın aidatı (çoğu ödendi)
          if (Math.random() > 0.1) {
            this.manager.addPayment(apt.id, block.id, unit.id, currentYear, currentMonth - 1, 'Aidat', 500);
          }
        });
      });
    });
    
    this.ui.render();
  }
}

// Initialize app
new App();
