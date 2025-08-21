from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import json
import time
import threading
from datetime import datetime, timedelta
from automation_system import WatermelonAutomationSystem
from demo import ProductionDemo

class UIDemo:
    def __init__(self):
        self.app = Flask(__name__)
        CORS(self.app)
        self.system = WatermelonAutomationSystem()
        self.demo = ProductionDemo()
        self.demo_results = []
        self.current_step = 0
        self.is_running = False
        self.setup_routes()
        
    def setup_routes(self):
        @self.app.route('/')
        def dashboard():
            return render_template('dashboard.html')
        
        @self.app.route('/api/start-demo', methods=['POST'])
        def start_demo():
            if not self.is_running:
                self.demo_results = []
                self.current_step = 0
                self.is_running = True
                threading.Thread(target=self.run_demo_with_ui).start()
                return jsonify({'status': 'started'})
            return jsonify({'status': 'already_running'})
        
        @self.app.route('/api/demo-status')
        def demo_status():
            return jsonify({
                'is_running': self.is_running,
                'current_step': self.current_step,
                'results': self.demo_results
            })
        
        @self.app.route('/api/reset-demo', methods=['POST'])
        def reset_demo():
            self.demo_results = []
            self.current_step = 0
            self.is_running = False
            return jsonify({'status': 'reset'})
    
    def run_demo_with_ui(self):
        steps = [
            {
                'title': 'Supplier Onboarding Automation',
                'description': 'Processing invoice data through OCR/NLP and credit scoring',
                'type': 'supplier'
            },
            {
                'title': 'Churn Prediction Analysis',
                'description': 'Analyzing buyer behavior patterns to predict churn risk',
                'type': 'churn'
            },
            {
                'title': 'Demand Forecasting',
                'description': 'Predicting product demand and checking inventory levels',
                'type': 'demand'
            }
        ]
        
        for batch in range(5):
            if not self.is_running:
                break
                
            batch_results = {
                'batch_number': batch + 1,
                'timestamp': datetime.now().isoformat(),
                'steps': []
            }
            
            for step_idx, step in enumerate(steps):
                self.current_step = batch * 3 + step_idx + 1
                
                step_result = {
                    'title': step['title'],
                    'description': step['description'],
                    'status': 'processing',
                    'start_time': datetime.now().isoformat()
                }
                
                # Process based on step type
                if step['type'] == 'supplier':
                    supplier_data = self.demo.mock_suppliers[batch % len(self.demo.mock_suppliers)]
                    result = self.system.process_supplier_onboarding(supplier_data)
                    step_result.update({
                        'input_data': supplier_data,
                        'output': result,
                        'explanation': self.explain_supplier_result(supplier_data, result)
                    })
                    
                elif step['type'] == 'churn':
                    buyer_data = self.demo.mock_buyers[batch % len(self.demo.mock_buyers)]
                    result = self.system.predict_churn_and_trigger_marketing(buyer_data)
                    step_result.update({
                        'input_data': buyer_data,
                        'output': result,
                        'explanation': self.explain_churn_result(buyer_data, result)
                    })
                    
                elif step['type'] == 'demand':
                    product_data = self.demo.mock_products[batch % len(self.demo.mock_products)]
                    result = self.system.forecast_demand_and_alert(product_data)
                    step_result.update({
                        'input_data': product_data,
                        'output': result,
                        'explanation': self.explain_demand_result(product_data, result)
                    })
                
                step_result['status'] = 'completed'
                step_result['end_time'] = datetime.now().isoformat()
                batch_results['steps'].append(step_result)
                
                time.sleep(2)  # Simulate processing time
            
            self.demo_results.append(batch_results)
        
        self.is_running = False
    
    def explain_supplier_result(self, input_data, result):
        explanations = []
        
        # OCR/NLP explanation
        explanations.append(f"📄 OCR/NLP extracted supplier name '{input_data['supplier_name']}' and invoice amount ${input_data['amount']:,.2f}")
        
        # Credit scoring explanation
        credit_score = result['credit_score']
        if credit_score >= 750:
            explanations.append(f"💳 Credit score {credit_score:.0f} indicates LOW RISK - excellent financial standing")
        elif credit_score >= 650:
            explanations.append(f"💳 Credit score {credit_score:.0f} indicates MEDIUM RISK - requires review")
        else:
            explanations.append(f"💳 Credit score {credit_score:.0f} indicates HIGH RISK - potential rejection")
        
        # Decision explanation
        status = result['status']
        if status == 'approved':
            explanations.append("✅ APPROVED - Automatically onboarded to supplier network")
        elif status == 'rejected':
            explanations.append("❌ REJECTED - Does not meet minimum credit requirements")
        else:
            explanations.append("⚠️ NEEDS REVIEW - Flagged for manual assessment")
        
        explanations.append("🔄 Result pushed to Zoho CRM for workflow processing")
        
        return explanations
    
    def explain_churn_result(self, input_data, result):
        explanations = []
        
        # Data analysis
        last_order_days = (datetime.now() - datetime.fromisoformat(input_data['last_order_date'])).days
        explanations.append(f"📊 Analyzing buyer '{input_data['name']}' - Last order {last_order_days} days ago")
        explanations.append(f"📈 Order frequency: {input_data['order_frequency']} orders/month, Basket size: ${input_data['basket_size']}")
        
        # Churn prediction
        churn_prob = result['churn_probability']
        if churn_prob > 0.7:
            explanations.append(f"🚨 HIGH CHURN RISK ({churn_prob:.1%}) - Immediate intervention required")
            explanations.append("📧 Triggered: Discount email + WhatsApp nudge")
        elif churn_prob > 0.4:
            explanations.append(f"⚠️ MEDIUM CHURN RISK ({churn_prob:.1%}) - Proactive engagement needed")
            explanations.append("📞 Triggered: Sales rep follow-up task")
        else:
            explanations.append(f"✅ LOW CHURN RISK ({churn_prob:.1%}) - Customer is stable")
            explanations.append("📊 No immediate action required - continue monitoring")
        
        explanations.append("🎯 Marketing automation triggered via Zoho Campaigns")
        
        return explanations
    
    def explain_demand_result(self, input_data, result):
        explanations = []
        
        # Demand analysis
        current_inventory = input_data['current_inventory']
        predicted_demand = result['predicted_demand']
        explanations.append(f"📦 Product '{input_data['product_id']}' - Current inventory: {current_inventory} units")
        explanations.append(f"🔮 AI predicted demand: {predicted_demand} units (based on seasonality & trends)")
        
        # Risk assessment
        risk_level = result['inventory_risk']
        if risk_level == 'critical':
            explanations.append("🔴 CRITICAL RISK - Inventory severely below demand forecast")
            explanations.append("📱 Immediate SMS alerts sent to suppliers")
        elif risk_level == 'high':
            explanations.append("🟡 HIGH RISK - Inventory below recommended levels")
            explanations.append("📊 Dashboard alerts activated for procurement team")
        else:
            explanations.append("🟢 NORMAL RISK - Inventory levels adequate for predicted demand")
            explanations.append("📈 Monitoring continues for trend changes")
        
        if result['alert_sent']:
            explanations.append("🚨 Real-time alerts dispatched to supplier network")
        
        return explanations
    
    def run(self, host='0.0.0.0', port=5001, debug=False):
        self.app.run(host=host, port=port, debug=debug)

if __name__ == '__main__':
    ui_demo = UIDemo()
    print("Starting Watermelon AI Dashboard...")
    print("Access the dashboard at: http://localhost:5001")
    ui_demo.run(debug=True)

