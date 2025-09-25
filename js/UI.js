export class UI {
  constructor(manager) {
    this.manager = manager;
    this.currentPage = 'dashboard';
    this.selectedApartment = null;
    this.selectedBlock = null;
  }

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      ${this.renderHeader()}
      ${this.renderContent()}
      ${this.renderMobileNavigation()}
    `;
    this.setupGlobalReference();
    this.attachEventListeners();
  }

  setupGlobalReference() {
    // Global reference for modal functions
    window.ui = this;
  }

  renderHeader() {
    return `
      <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m11 0a2 2 0 01-2 2H5a2 2 0 01-2-2m0 0V5a2 2 0 012-2h2"></path>
                </svg>
              </div>
              <h1 class="text-xl font-bold text-gray-900">Apartman Yönetimi</h1>
            </div>
            
            <!-- Desktop Navigation -->
            <nav class="hidden md:flex space-x-1">
              <a href="#" data-page="dashboard" class="px-3 py-2 rounded-lg text-sm font-medium transition-colors">Dashboard</a>
              <a href="#" data-page="apartments" class="px-3 py-2 rounded-lg text-sm font-medium transition-colors">Apartmanlar</a>
              <a href="#" data-page="payments" class="px-3 py-2 rounded-lg text-sm font-medium transition-colors">Aidat Takibi</a>
              <a href="#" data-page="reports" class="px-3 py-2 rounded-lg text-sm font-medium transition-colors">Raporlar</a>
              <a href="#" data-page="settings" class="px-3 py-2 rounded-lg text-sm font-medium transition-colors">Ayarlar</a>
            </nav>
          </div>
        </div>
      </header>
    `;
  }

  renderMobileNavigation() {
    return `
      <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div class="grid grid-cols-5 h-16">
          <a href="#" data-page="dashboard" class="flex flex-col items-center justify-center text-xs text-gray-600 transition-colors">
            <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
            </svg>
            <span>Panel</span>
          </a>
          <a href="#" data-page="apartments" class="flex flex-col items-center justify-center text-xs text-gray-600 transition-colors">
            <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m11 0a2 2 0 01-2 2H5a2 2 0 01-2-2m0 0V5a2 2 0 012-2h2"></path>
            </svg>
            <span>Apartman</span>
          </a>
          <a href="#" data-page="payments" class="flex flex-col items-center justify-center text-xs text-gray-600 transition-colors">
            <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
            <span>Aidat</span>
          </a>
          <a href="#" data-page="reports" class="flex flex-col items-center justify-center text-xs text-gray-600 transition-colors">
            <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            <span>Rapor</span>
          </a>
          <a href="#" data-page="settings" class="flex flex-col items-center justify-center text-xs text-gray-600 transition-colors">
            <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span>Ayarlar</span>
          </a>
        </div>
      </nav>
    `;
  }

  renderContent() {
    return `
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 md:pb-6">
        <div id="page-content">
          ${this.renderDashboard()}
        </div>
      </main>
    `;
  }

  showPage(page) {
    this.currentPage = page;
    const content = document.getElementById('page-content');
    
    if (!content) return;
    
    switch(page) {
      case 'dashboard':
        content.innerHTML = this.renderDashboard();
        break;
      case 'apartments':
        content.innerHTML = this.renderApartments();
        break;
      case 'payments':
        content.innerHTML = this.renderPayments();
        break;
      case 'reports':
        content.innerHTML = this.renderReports();
        break;
      case 'settings':
        content.innerHTML = this.renderSettings();
        break;
    }
    
    this.attachEventListeners();
  }

  renderDashboard() {
    const totalApartments = this.manager.apartments.length;
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    let totalUnits = 0;
    let totalUnpaid = 0;
    let totalRevenue = 0;
    
    this.manager.apartments.forEach(apt => {
      const report = this.manager.getMonthlyReport(apt.id, currentYear, currentMonth);
      totalUnits += report.totalUnits;
      totalRevenue += report.totalCollected;
      totalUnpaid += (report.totalExpected - report.totalCollected);
    });

    const monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

    return `
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold text-gray-900">Dashboard</h2>
          <div class="text-sm text-gray-500">${monthNames[currentMonth]} ${currentYear}</div>
        </div>

        <!-- Özet Kartları -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="card">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m11 0a2 2 0 01-2 2H5a2 2 0 01-2-2m0 0V5a2 2 0 012-2h2"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-500">Toplam Apartman</p>
                <p class="text-2xl font-bold text-gray-900">${totalApartments}</p>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-500">Toplam Daire</p>
                <p class="text-2xl font-bold text-gray-900">${totalUnits}</p>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-500">Bu Ay Gelir</p>
                <p class="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString('tr-TR')} ₺</p>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-500">Ödenmemiş</p>
                <p class="text-2xl font-bold text-gray-900">${totalUnpaid.toLocaleString('tr-TR')} ₺</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Son Aktiviteler -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Son Aktiviteler</h3>
          <div class="space-y-3">
            ${this.renderRecentActivities()}
          </div>
        </div>

        <!-- Hızlı İşlemler -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Hızlı İşlemler</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button data-page="apartments" class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
              <svg class="w-6 h-6 mx-auto mb-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              <span class="text-sm font-medium text-gray-700">Apartman Ekle</span>
            </button>
            <button data-page="payments" class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
              <svg class="w-6 h-6 mx-auto mb-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
              <span class="text-sm font-medium text-gray-700">Aidat Ekle</span>
            </button>
            <button data-page="reports" class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
              <svg class="w-6 h-6 mx-auto mb-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              <span class="text-sm font-medium text-gray-700">Rapor Görüntüle</span>
            </button>
            <button data-page="settings" class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
              <svg class="w-6 h-6 mx-auto mb-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span class="text-sm font-medium text-gray-700">Ayarlar</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderRecentActivities() {
    return `
      <div class="flex items-center space-x-3 text-sm">
        <div class="w-2 h-2 bg-green-400 rounded-full"></div>
        <span class="text-gray-600">Ahmet Yılmaz - Ocak aidatı ödendi</span>
        <span class="text-gray-400">2 saat önce</span>
      </div>
      <div class="flex items-center space-x-3 text-sm">
        <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
        <span class="text-gray-600">Yeni daire eklendi: B Blok Daire 3</span>
        <span class="text-gray-400">5 saat önce</span>
      </div>
      <div class="flex items-center space-x-3 text-sm">
        <div class="w-2 h-2 bg-orange-400 rounded-full"></div>
        <span class="text-gray-600">Fatma Demir - Aidat hatırlatması gönderildi</span>
        <span class="text-gray-400">1 gün önce</span>
      </div>
    `;
  }

  renderApartments() {
    return `
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold text-gray-900">Apartman Yönetimi</h2>
          <button onclick="window.ui.showAddApartmentModal()" class="btn-primary">
            <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Apartman Ekle
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${this.manager.apartments.map(apt => this.renderApartmentCard(apt)).join('')}
        </div>
      </div>

      <!-- Add Apartment Modal -->
      <div id="addApartmentModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-xl max-w-md w-full p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Yeni Apartman Ekle</h3>
          <form id="addApartmentForm" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Apartman Adı</label>
              <input type="text" name="name" required class="input-field" placeholder="Örn: Gül Sitesi">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Adres</label>
              <textarea name="address" required class="input-field" rows="3" placeholder="Tam adres bilgisi"></textarea>
            </div>
            <div class="flex space-x-3 pt-4">
              <button type="submit" class="btn-primary flex-1">Ekle</button>
              <button type="button" onclick="window.ui.hideAddApartmentModal()" class="btn-secondary flex-1">İptal</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  renderApartmentCard(apartment) {
    const blocks = this.manager.blocks[apartment.id] || [];
    const totalUnits = blocks.reduce((sum, block) => {
      return sum + (this.manager.units[apartment.id]?.[block.id] || []).length;
    }, 0);

    return `
      <div class="card hover:shadow-md transition-shadow">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">${apartment.name}</h3>
            <p class="text-sm text-gray-600">${apartment.address}</p>
          </div>
          <div class="flex space-x-1">
            <button onclick="window.ui.showApartmentDetails('${apartment.id}')" class="p-1 text-gray-400 hover:text-gray-600">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </button>
            <button onclick="window.ui.deleteApartment('${apartment.id}')" class="p-1 text-gray-400 hover:text-red-600">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="space-y-2 text-sm text-gray-600">
          <div class="flex justify-between">
            <span>Blok Sayısı:</span>
            <span class="font-medium">${blocks.length}</span>
          </div>
          <div class="flex justify-between">
            <span>Toplam Daire:</span>
            <span class="font-medium">${totalUnits}</span>
          </div>
        </div>
        
        <div class="mt-4 pt-4 border-t border-gray-200">
          <button onclick="window.ui.manageApartment('${apartment.id}')" class="w-full btn-primary text-sm">
            Yönet
          </button>
        </div>
      </div>
    `;
  }

  renderPayments() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    
    return `
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <h2 class="text-2xl font-bold text-gray-900">Aidat Takibi</h2>
          <div class="flex space-x-3">
            <select id="paymentApartmentSelect" class="input-field">
              <option value="">Apartman Seçin</option>
              ${this.manager.apartments.map(apt => `<option value="${apt.id}">${apt.name}</option>`).join('')}
            </select>
            <button onclick="window.ui.showAddPaymentModal()" class="btn-primary whitespace-nowrap">
              Aidat Ekle
            </button>
          </div>
        </div>

        <div id="paymentTableContainer">
          ${this.renderPaymentTable()}
        </div>
      </div>

      <!-- Add Payment Modal -->
      <div id="addPaymentModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Aidat Ekle</h3>
          <form id="addPaymentForm" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Apartman</label>
              <select name="apartmentId" required class="input-field" onchange="window.ui.updateBlocksInPaymentForm(this.value)">
                <option value="">Apartman Seçin</option>
                ${this.manager.apartments.map(apt => `<option value="${apt.id}">${apt.name}</option>`).join('')}
              </select>
            </div>
            <div id="blockSelectContainer" style="display: none;">
              <label class="block text-sm font-medium text-gray-700 mb-1">Blok</label>
              <select name="blockId" class="input-field" onchange="window.ui.updateUnitsInPaymentForm()">
                <option value="">Blok Seçin</option>
              </select>
            </div>
            <div id="unitSelectContainer" style="display: none;">
              <label class="block text-sm font-medium text-gray-700 mb-1">Daire</label>
              <select name="unitId" required class="input-field">
                <option value="">Daire Seçin</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Yıl</label>
              <select name="year" required class="input-field">
                ${Array.from({length: 5}, (_, i) => currentYear - 2 + i).map(year => 
                  `<option value="${year}" ${year === currentYear ? 'selected' : ''}>${year}</option>`
                ).join('')}
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Ay</label>
              <select name="month" required class="input-field">
                ${['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'].map((month, index) => 
                  `<option value="${index}" ${index === currentMonth ? 'selected' : ''}>${month}</option>`
                ).join('')}
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
              <select name="category" required class="input-field">
                ${this.manager.feeCategories.map(cat => `<option value="${cat.name}">${cat.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tutar (₺)</label>
              <input type="number" name="amount" required class="input-field" placeholder="500">
            </div>
            <div class="flex space-x-3 pt-4">
              <button type="submit" class="btn-primary flex-1">Ekle</button>
              <button type="button" onclick="window.ui.hideAddPaymentModal()" class="btn-secondary flex-1">İptal</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  renderPaymentTable() {
    if (!this.selectedApartment) {
      return `
        <div class="card text-center py-12">
          <svg class="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m11 0a2 2 0 01-2 2H5a2 2 0 01-2-2m0 0V5a2 2 0 012-2h2"></path>
          </svg>
          <p class="text-gray-500">Lütfen aidat takibi için bir apartman seçin</p>
        </div>
      `;
    }

    const apartment = this.manager.apartments.find(a => a.id === this.selectedApartment);
    if (!apartment) {
      return `
        <div class="card text-center py-12">
          <p class="text-gray-500">Seçili apartman bulunamadı</p>
        </div>
      `;
    }

    const blocks = this.manager.blocks[this.selectedApartment] || [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    
    // Son 12 ay
    const months = [];
    for (let i = 11; i >= 0; i--) {
      const date = new Date(currentYear, currentDate.getMonth() - i);
      months.push({
        year: date.getFullYear(),
        month: date.getMonth(),
        name: date.toLocaleDateString('tr-TR', { month: 'short', year: '2-digit' })
      });
    }

    let tableContent = '';
    
    blocks.forEach(block => {
      const units = this.manager.units[this.selectedApartment]?.[block.id] || [];
      if (units.length === 0) return;

      tableContent += `
        <div class="mb-8">
          <h4 class="text-lg font-semibold text-gray-900 mb-4">${block.name}</h4>
          <div class="overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sticky left-0 bg-gray-50 border-r border-gray-200">
                    Daire / Sakin
                  </th>
                  ${months.map(m => `
                    <th class="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase border-l border-gray-200 min-w-[80px]">
                      ${m.name}
                    </th>
                  `).join('')}
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                ${units.map(unit => `
                  <tr class="hover:bg-gray-50">
                    <td class="px-4 py-3 sticky left-0 bg-white border-r border-gray-200">
                      <div class="text-sm font-medium text-gray-900">Daire ${unit.number}</div>
                      <div class="text-xs text-gray-500">${unit.residentName}</div>
                      <div class="text-xs ${unit.residentType === 'owner' ? 'text-blue-600' : 'text-orange-600'}">
                        ${unit.residentType === 'owner' ? 'Ev Sahibi' : 'Kiracı'}
                      </div>
                    </td>
                    ${months.map(m => {
                      const payment = this.manager.getPayment(this.selectedApartment, block.id, unit.id, m.year, m.month, 'Aidat');
                      const isPaid = !!payment;
                      return `
                        <td class="px-3 py-3 text-center border-l border-gray-200">
                          <button 
                            onclick="window.ui.togglePayment('${this.selectedApartment}', '${block.id}', '${unit.id}', ${m.year}, ${m.month}, 'Aidat', ${isPaid})"
                            class="w-8 h-8 rounded-full transition-colors ${isPaid ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}"
                            title="${isPaid ? 'Ödendi - Kaldırmak için tıklayın' : 'Ödenmedi - Eklemek için tıklayın'}"
                          >
                            ${isPaid ? 
                              '<svg class="w-4 h-4 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>' : 
                              '<svg class="w-4 h-4 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>'
                            }
                          </button>
                        </td>
                      `;
                    }).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    });

    return `
      <div class="card">
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-900">${apartment.name} - Aidat Tablosu</h3>
          <p class="text-sm text-gray-600 mt-1">Yeşil: Ödendi, Kırmızı: Ödenmedi</p>
        </div>
        ${tableContent || '<p class="text-gray-500 text-center py-8">Bu apartmanda henüz daire bulunmuyor.</p>'}
      </div>
    `;
  }

  renderReports() {
    return `
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold text-gray-900">Raporlar</h2>
          <div class="flex space-x-3">
            <select id="reportApartmentSelect" class="input-field">
              <option value="">Tüm Apartmanlar</option>
              ${this.manager.apartments.map(apt => `<option value="${apt.id}">${apt.name}</option>`).join('')}
            </select>
            <select id="reportPeriodSelect" class="input-field">
              <option value="current">Bu Ay</option>
              <option value="previous">Geçen Ay</option>
              <option value="year">Bu Yıl</option>
            </select>
          </div>
        </div>

        <div id="reportContent">
          ${this.renderCurrentMonthReport()}
        </div>
      </div>
    `;
  }

  renderCurrentMonthReport() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

    return `
      <div class="space-y-6">
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">${monthNames[currentMonth]} ${currentYear} Özeti</h3>
          
          ${this.manager.apartments.map(apt => {
            const report = this.manager.getMonthlyReport(apt.id, currentYear, currentMonth);
            const collectionRate = report.totalExpected > 0 ? ((report.totalCollected / report.totalExpected) * 100).toFixed(1) : 0;
            
            return `
              <div class="border border-gray-200 rounded-lg p-4 mb-4">
                <h4 class="font-semibold text-gray-900 mb-3">${apt.name}</h4>
                
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div class="text-center">
                    <div class="text-2xl font-bold text-blue-600">${report.totalUnits}</div>
                    <div class="text-xs text-gray-500">Toplam Daire</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-green-600">${report.paidUnits}</div>
                    <div class="text-xs text-gray-500">Ödeme Yapan</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-emerald-600">${report.totalCollected.toLocaleString('tr-TR')} ₺</div>
                    <div class="text-xs text-gray-500">Toplanan</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-red-600">${(report.totalExpected - report.totalCollected).toLocaleString('tr-TR')} ₺</div>
                    <div class="text-xs text-gray-500">Kalan</div>
                  </div>
                </div>
                
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-green-500 h-2 rounded-full transition-all duration-300" style="width: ${collectionRate}%"></div>
                </div>
                <div class="text-center text-sm text-gray-600 mt-1">Toplama Oranı: %${collectionRate}</div>
              </div>
            `;
          }).join('')}
        </div>

        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Ödenmemiş Aidatlar</h3>
          ${this.renderUnpaidFeesTable()}
        </div>
      </div>
    `;
  }

  renderUnpaidFeesTable() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    const allUnpaid = [];
    this.manager.apartments.forEach(apt => {
      const unpaid = this.manager.getUnpaidFees(apt.id, currentYear, currentMonth);
      allUnpaid.push(...unpaid);
    });

    if (allUnpaid.length === 0) {
      return `
        <div class="text-center py-8">
          <svg class="w-12 h-12 mx-auto text-green-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="text-gray-500">Tüm aidatlar ödenmiş!</p>
        </div>
      `;
    }

    return `
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Apartman</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Blok</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Daire</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sakin</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kategori</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tutar</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            ${allUnpaid.map(item => `
              <tr class="hover:bg-gray-50">
                <td class="px-4 py-3 text-sm text-gray-900">${item.apartment.name}</td>
                <td class="px-4 py-3 text-sm text-gray-900">${item.block.name}</td>
                <td class="px-4 py-3 text-sm text-gray-900">Daire ${item.unit.number}</td>
                <td class="px-4 py-3 text-sm text-gray-900">${item.unit.residentName}</td>
                <td class="px-4 py-3 text-sm text-gray-900">${item.category.name}</td>
                <td class="px-4 py-3 text-sm font-medium text-red-600">${item.category.defaultAmount.toLocaleString('tr-TR')} ₺</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  renderSettings() {
    return `
      <div class="space-y-6">
        <h2 class="text-2xl font-bold text-gray-900">Ayarlar</h2>

        <div class="card">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Aidat Kategorileri</h3>
            <button onclick="window.ui.showAddCategoryModal()" class="btn-primary">
              <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Kategori Ekle
            </button>
          </div>

          <div class="space-y-3">
            ${this.manager.feeCategories.map(category => `
              <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <div class="font-medium text-gray-900">${category.name}</div>
                  <div class="text-sm text-gray-500">Varsayılan: ${category.defaultAmount.toLocaleString('tr-TR')} ₺</div>
                </div>
                <div class="flex space-x-2">
                  <button onclick="window.ui.editCategory('${category.id}')" class="p-1 text-gray-400 hover:text-blue-600">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button onclick="window.ui.deleteCategory('${category.id}')" class="p-1 text-gray-400 hover:text-red-600">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Sistem Bilgileri</h3>
          <div class="space-y-3 text-sm text-gray-600">
            <div class="flex justify-between">
              <span>Toplam Apartman:</span>
              <span class="font-medium">${this.manager.apartments.length}</span>
            </div>
            <div class="flex justify-between">
              <span>Toplam Kategori:</span>
              <span class="font-medium">${this.manager.feeCategories.length}</span>
            </div>
            <div class="flex justify-between">
              <span>Versiyon:</span>
              <span class="font-medium">1.0.0</span>
            </div>
          </div>
        </div>

        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Veri Yönetimi</h3>
          <div class="space-y-3">
            <button onclick="window.ui.exportData()" class="w-full btn-secondary">
              <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Verileri Dışa Aktar
            </button>
            <button onclick="window.ui.clearAllData()" class="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors">
              <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              Tüm Verileri Temizle
            </button>
          </div>
        </div>
      </div>

      <!-- Add Category Modal -->
      <div id="addCategoryModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-xl max-w-md w-full p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Yeni Kategori Ekle</h3>
          <form id="addCategoryForm" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Kategori Adı</label>
              <input type="text" name="name" required class="input-field" placeholder="Örn: Asansör Bakım">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Varsayılan Tutar (₺)</label>
              <input type="number" name="defaultAmount" required class="input-field" placeholder="100">
            </div>
            <div class="flex space-x-3 pt-4">
              <button type="submit" class="btn-primary flex-1">Ekle</button>
              <button type="button" onclick="window.ui.hideAddCategoryModal()" class="btn-secondary flex-1">İptal</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    // Apartment selection for payments
    const paymentApartmentSelect = document.getElementById('paymentApartmentSelect');
    if (paymentApartmentSelect) {
      paymentApartmentSelect.addEventListener('change', (e) => {
        this.selectedApartment = e.target.value;
        const container = document.getElementById('paymentTableContainer');
        if (container) {
          container.innerHTML = this.renderPaymentTable();
        }
      });
    }

    // Form submissions
    this.attachFormListeners();
  }

  attachFormListeners() {
    const addApartmentForm = document.getElementById('addApartmentForm');
    if (addApartmentForm) {
      addApartmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        this.manager.addApartment(formData.get('name'), formData.get('address'));
        this.hideAddApartmentModal();
        this.showPage('apartments');
      });
    }

    const addPaymentForm = document.getElementById('addPaymentForm');
    if (addPaymentForm) {
      addPaymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        this.manager.addPayment(
          formData.get('apartmentId'),
          formData.get('blockId'),
          formData.get('unitId'),
          parseInt(formData.get('year')),
          parseInt(formData.get('month')),
          formData.get('category'),
          parseFloat(formData.get('amount'))
        );
        this.hideAddPaymentModal();
        this.showPage('payments');
      });
    }

    const addCategoryForm = document.getElementById('addCategoryForm');
    if (addCategoryForm) {
      addCategoryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        this.manager.addFeeCategory(formData.get('name'), parseFloat(formData.get('defaultAmount')));
        this.hideAddCategoryModal();
        this.showPage('settings');
      });
    }
  }

  // Modal functions
  showAddApartmentModal() {
    const modal = document.getElementById('addApartmentModal');
    if (modal) {
      modal.classList.remove('hidden');
    }
  }

  hideAddApartmentModal() {
    const modal = document.getElementById('addApartmentModal');
    const form = document.getElementById('addApartmentForm');
    if (modal) modal.classList.add('hidden');
    if (form) form.reset();
  }

  showAddPaymentModal() {
    const modal = document.getElementById('addPaymentModal');
    if (modal) {
      modal.classList.remove('hidden');
    }
  }

  hideAddPaymentModal() {
    const modal = document.getElementById('addPaymentModal');
    const form = document.getElementById('addPaymentForm');
    if (modal) modal.classList.add('hidden');
    if (form) form.reset();
    // Reset form visibility
    const blockContainer = document.getElementById('blockSelectContainer');
    const unitContainer = document.getElementById('unitSelectContainer');
    if (blockContainer) blockContainer.style.display = 'none';
    if (unitContainer) unitContainer.style.display = 'none';
  }

  showAddCategoryModal() {
    const modal = document.getElementById('addCategoryModal');
    if (modal) {
      modal.classList.remove('hidden');
    }
  }

  hideAddCategoryModal() {
    const modal = document.getElementById('addCategoryModal');
    const form = document.getElementById('addCategoryForm');
    if (modal) modal.classList.add('hidden');
    if (form) form.reset();
  }

  // Payment form updates
  updateBlocksInPaymentForm(apartmentId) {
    const blockSelect = document.querySelector('[name="blockId"]');
    const blockContainer = document.getElementById('blockSelectContainer');
    const unitContainer = document.getElementById('unitSelectContainer');
    
    if (!apartmentId || !blockSelect || !blockContainer || !unitContainer) {
      return;
    }

    const blocks = this.manager.blocks[apartmentId] || [];
    
    if (blocks.length > 0) {
      blockContainer.style.display = 'block';
      blockSelect.innerHTML = '<option value="">Blok Seçin</option>' + 
        blocks.map(block => `<option value="${block.id}">${block.name}</option>`).join('');
    } else {
      blockContainer.style.display = 'none';
      unitContainer.style.display = 'block';
      this.updateUnitsInPaymentForm();
    }
  }

  updateUnitsInPaymentForm() {
    const apartmentSelect = document.querySelector('[name="apartmentId"]');
    const blockSelect = document.querySelector('[name="blockId"]');
    const unitSelect = document.querySelector('[name="unitId"]');
    const unitContainer = document.getElementById('unitSelectContainer');
    
    if (!apartmentSelect || !unitSelect || !unitContainer) {
      return;
    }

    const apartmentId = apartmentSelect.value;
    const blockId = blockSelect ? blockSelect.value : null;
    
    if (!apartmentId) return;

    unitContainer.style.display = 'block';
    
    let units = [];
    if (blockId && this.manager.units[apartmentId] && this.manager.units[apartmentId][blockId]) {
      units = this.manager.units[apartmentId][blockId] || [];
    } else if (!blockId) {
      // Blok yoksa tüm daireleri listele
      const blocks = this.manager.blocks[apartmentId] || [];
      blocks.forEach(block => {
        const blockUnits = this.manager.units[apartmentId]?.[block.id] || [];
        units.push(...blockUnits.map(unit => ({...unit, blockName: block.name})));
      });
    }

    unitSelect.innerHTML = '<option value="">Daire Seçin</option>' + 
      units.map(unit => 
        `<option value="${unit.id}">Daire ${unit.number} - ${unit.residentName}${unit.blockName ? ` (${unit.blockName})` : ''}</option>`
      ).join('');
  }

  // Payment toggle
  togglePayment(apartmentId, blockId, unitId, year, month, category, isPaid) {
    if (isPaid) {
      this.manager.removePayment(apartmentId, blockId, unitId, year, month, category);
    } else {
      const categoryObj = this.manager.feeCategories.find(c => c.name === category);
      const amount = categoryObj ? categoryObj.defaultAmount : 500;
      this.manager.addPayment(apartmentId, blockId, unitId, year, month, category, amount);
    }
    
    // Tabloyu güncelle
    const container = document.getElementById('paymentTableContainer');
    if (container) {
      container.innerHTML = this.renderPaymentTable();
    }
  }

  // Apartment management
  deleteApartment(apartmentId) {
    if (confirm('Bu apartmanı ve tüm verilerini silmek istediğinizden emin misiniz?')) {
      this.manager.deleteApartment(apartmentId);
      this.showPage('apartments');
    }
  }

  manageApartment(apartmentId) {
    // Apartman yönetim sayfasına yönlendir
    alert('Apartman yönetim sayfası geliştirilme aşamasında...');
  }

  showApartmentDetails(apartmentId) {
    // Apartman detay sayfasına yönlendir
    alert('Apartman detay sayfası geliştirilme aşamasında...');
  }

  // Category management
  deleteCategory(categoryId) {
    if (confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) {
      this.manager.deleteFeeCategory(categoryId);
      this.showPage('settings');
    }
  }

  editCategory(categoryId) {
    alert('Kategori düzenleme özelliği geliştirilme aşamasında...');
  }

  // Data management
  exportData() {
    const data = {
      apartments: this.manager.apartments,
      blocks: this.manager.blocks,
      units: this.manager.units,
      payments: this.manager.payments,
      feeCategories: this.manager.feeCategories,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `apartman-verileri-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  clearAllData() {
    if (confirm('Tüm verileri silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!')) {
      localStorage.clear();
      location.reload();
    }
  }
}
