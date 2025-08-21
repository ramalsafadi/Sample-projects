# Smart Automation System

This project is built to automate three main areas: supplier onboarding, customer retention, and demand forecasting.  
I designed it to work like a smart employee—fast, accurate, and scalable.  

---

## How It Works

### Supplier Onboarding
- Reads supplier documents (invoices, contracts, etc.) automatically.  
- Pulls key details: supplier name, invoice amounts, payment terms.  
- Runs a quick credit check → gives a risk score.  
- Based on score: approve, send to manager, or reject.  
👉 What normally takes hours happens in seconds.  

### Marketing & Retention
- Monitors buyer activity: last order date, frequency, basket size.  
- Detects if a customer is about to churn.  
- Acts instantly:  
  - High risk → discount email + WhatsApp.  
  - Medium risk → task for sales rep.  
👉 Keeps customers engaged before they leave.  

### Demand Intelligence
- Uses past sales + seasonal patterns to predict demand.  
- Checks future demand vs current stock.  
- If demand spikes (e.g., tomatoes) and stock is low → alerts suppliers.  
👉 Prevents stock-outs and keeps shelves full.  

---

## Why It’s Reliable

- **Modular:** Each part (logic “brain” + dashboard “face”) is independent. I can improve one without breaking the other.  
- **Secure:** Data moves only through controlled APIs—like one guarded gate instead of open doors.  

---

## Run the Live Demo

1. Open terminal in the project folder.  
2. Run:  
   ```bash
   python run_ui.py
   ```  
3. Open browser and go to: [http://localhost:5001](http://localhost:5001)  
4. Click **Start Live Demo** → watch the system process and decide in real time.  

👉 Demo screenshots are in the `demo_screenshots` folder.  
