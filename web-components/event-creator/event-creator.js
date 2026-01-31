class EventCreator extends HTMLElement {
  constructor() {
    super();
    this.isOpen = false;
    this.categories = [
      { id: 'income', label: 'Income', type: 'income' },
      { id: 'food', label: 'Food & Dining', type: 'expense' },
      { id: 'transport', label: 'Transportation', type: 'expense' },
      { id: 'entertainment', label: 'Entertainment', type: 'expense' },
      { id: 'shopping', label: 'Shopping', type: 'expense' },
      { id: 'bills', label: 'Bills & Utilities', type: 'expense' }
    ];
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.innerHTML = `
      <style>
        :host {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1000;
          pointer-events: none;
        }

        .backdrop {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .backdrop.open {
          opacity: 1;
          pointer-events: all;
        }

        .sheet {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: white;
          border-radius: 16px 16px 0 0;
          transform: translateY(100%);
          transition: transform 0.3s ease;
          pointer-events: all;
          max-height: 90vh;
          overflow-y: auto;
        }

        .sheet.open {
          transform: translateY(0);
        }

        .handle {
          width: 40px;
          height: 4px;
          background: #ccc;
          border-radius: 2px;
          margin: 12px auto 20px;
        }

        .form {
          padding: 0 20px 20px;
        }

        .field {
          margin-bottom: 20px;
        }

        label {
          display: block;
          font-weight: 600;
          margin-bottom: 8px;
          color: #333;
        }

        input, select, textarea {
          width: 100%;
          padding: 12px;
          border: 2px solid #e1e5e9;
          border-radius: 8px;
          font-size: 16px;
          min-height: 44px;
          box-sizing: border-box;
        }

        input:focus, select:focus, textarea:focus {
          outline: none;
          border-color: #007aff;
          box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 12px;
          margin-top: 8px;
        }

        .category-btn {
          padding: 12px;
          border: 2px solid #e1e5e9;
          border-radius: 8px;
          background: white;
          font-size: 14px;
          min-height: 44px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .category-btn:hover {
          border-color: #007aff;
        }

        .category-btn.selected {
          border-color: #007aff;
          background: #f0f8ff;
        }

        .category-btn.income {
          border-color: #34c759;
        }

        .category-btn.income.selected {
          background: #f0fff4;
          border-color: #34c759;
        }

        .amount-input {
          position: relative;
        }

        .currency {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
          pointer-events: none;
        }

        .amount-input input {
          padding-left: 32px;
        }

        .budget-impact {
          margin-top: 8px;
          padding: 8px 12px;
          background: #f8f9fa;
          border-radius: 6px;
          font-size: 14px;
          color: #666;
        }

        .actions {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }

        .btn {
          flex: 1;
          padding: 14px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          min-height: 44px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-cancel {
          background: #f1f3f4;
          color: #333;
        }

        .btn-create {
          background: #007aff;
          color: white;
        }

        .btn:hover {
          transform: translateY(-1px);
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
          }
        }


      </style>

      <div class="backdrop" role="presentation"></div>
      <div class="sheet" role="dialog" aria-labelledby="sheet-title" aria-modal="true">
        <div class="handle" role="presentation"></div>
        <form class="form">
          <h2 id="sheet-title" style="margin: 0 0 20px 0;">Create Event</h2>
          
          <div class="field">
            <label for="title">Event Title</label>
            <input type="text" id="title" name="title" required aria-describedby="title-help">
            <div id="title-help" class="sr-only">Enter a descriptive title for your event</div>
          </div>

          <div class="field">
            <label>Category</label>
            <div class="category-grid" role="radiogroup" aria-labelledby="category-label">
              ${this.categories.map(cat => `
                <button type="button" class="category-btn ${cat.type}" data-category="${cat.id}" role="radio" aria-checked="false">
                  ${cat.label}
                </button>
              `).join('')}
            </div>
          </div>

          <div class="field">
            <label for="amount">Amount</label>
            <div class="amount-input">
              <span class="currency">$</span>
              <input type="number" id="amount" name="amount" step="0.01" min="0" aria-describedby="budget-impact">
            </div>
            <div id="budget-impact" class="budget-impact">Budget impact will appear here</div>
          </div>

          <div class="field">
            <label for="date">Date & Time</label>
            <input type="datetime-local" id="date" name="date" required>
          </div>

          <div class="field">
            <label for="location">Location (Optional)</label>
            <input type="text" id="location" name="location">
          </div>

          <div class="actions">
            <button type="button" class="btn btn-cancel">Cancel</button>
            <button type="submit" class="btn btn-create">Create Event</button>
          </div>
        </form>
      </div>
    `;
  }

  setupEventListeners() {
    const backdrop = this.querySelector('.backdrop');
    const sheet = this.querySelector('.sheet');
    const form = this.querySelector('.form');
    const cancelBtn = this.querySelector('.btn-cancel');
    const categoryBtns = this.querySelectorAll('.category-btn');
    const amountInput = this.querySelector('#amount');

    backdrop.addEventListener('click', () => this.close());
    cancelBtn.addEventListener('click', () => this.close());
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });

    categoryBtns.forEach(btn => {
      btn.addEventListener('click', () => this.selectCategory(btn));
    });

    amountInput.addEventListener('input', () => this.updateBudgetImpact());

    // Keyboard navigation
    this.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  }

  selectCategory(selectedBtn) {
    this.querySelectorAll('.category-btn').forEach(btn => {
      btn.classList.remove('selected');
      btn.setAttribute('aria-checked', 'false');
    });
    
    selectedBtn.classList.add('selected');
    selectedBtn.setAttribute('aria-checked', 'true');
    this.selectedCategory = selectedBtn.dataset.category;
    this.updateBudgetImpact();
  }

  updateBudgetImpact() {
    const amount = parseFloat(this.querySelector('#amount').value) || 0;
    const impactEl = this.querySelector('#budget-impact');
    
    if (!this.selectedCategory || amount === 0) {
      impactEl.textContent = 'Budget impact will appear here';
      return;
    }

    const category = this.categories.find(c => c.id === this.selectedCategory);
    const isIncome = category.type === 'income';
    const sign = isIncome ? '+' : '-';
    const color = isIncome ? '#34c759' : '#ff3b30';
    
    impactEl.innerHTML = `<span style="color: ${color}">${sign}$${amount.toFixed(2)}</span> ${isIncome ? 'added to' : 'deducted from'} budget`;
  }

  handleSubmit() {
    const formData = new FormData(this.querySelector('form'));
    const eventData = {
      title: formData.get('title'),
      category: this.selectedCategory,
      amount: parseFloat(formData.get('amount')) || 0,
      date: formData.get('date'),
      location: formData.get('location')
    };

    this.dispatchEvent(new CustomEvent('event-created', {
      detail: eventData,
      bubbles: true
    }));

    this.close();
  }

  open() {
    this.isOpen = true;
    this.style.pointerEvents = 'all';
    
    requestAnimationFrame(() => {
      this.querySelector('.backdrop').classList.add('open');
      this.querySelector('.sheet').classList.add('open');
    });

    // Focus management
    this.querySelector('#title').focus();
  }

  close() {
    this.isOpen = false;
    this.querySelector('.backdrop').classList.remove('open');
    this.querySelector('.sheet').classList.remove('open');
    
    setTimeout(() => {
      this.style.pointerEvents = 'none';
      this.reset();
    }, 300);
  }

  reset() {
    this.querySelector('form').reset();
    this.querySelectorAll('.category-btn').forEach(btn => {
      btn.classList.remove('selected');
      btn.setAttribute('aria-checked', 'false');
    });
    this.selectedCategory = null;
    this.updateBudgetImpact();
  }
}

customElements.define('event-creator', EventCreator);
