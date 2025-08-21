from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
from automation_system import WatermelonAutomationSystem

app = Flask(__name__)
CORS(app)

system = WatermelonAutomationSystem()

@app.route('/api/supplier/onboard', methods=['POST'])
def onboard_supplier():
    data = request.json
    result = system.process_supplier_onboarding(data)
    return jsonify(result)

@app.route('/api/buyer/churn-analysis', methods=['POST'])
def analyze_churn():
    data = request.json
    result = system.predict_churn_and_trigger_marketing(data)
    return jsonify(result)

@app.route('/api/product/demand-forecast', methods=['POST'])
def forecast_demand():
    data = request.json
    result = system.forecast_demand_and_alert(data)
    return jsonify(result)

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'timestamp': str(datetime.now())})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

