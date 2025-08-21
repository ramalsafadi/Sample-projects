import time
import random
from datetime import datetime, timedelta
from automation_system import WatermelonAutomationSystem

class ProductionDemo:
    def __init__(self):
        self.system = WatermelonAutomationSystem()
        self.mock_suppliers = self._generate_mock_suppliers()
        self.mock_buyers = self._generate_mock_buyers()
        self.mock_products = self._generate_mock_products()
    
    def run_demo(self):
        print("=== Watermelon AI Automation System - Production Demo ===\n")
        
        # Simulate real-time processing
        print("Starting real-time automation pipeline...\n")
        
        for i in range(5):
            print(f"--- Processing Batch {i+1} ---")
            
            # Process supplier onboarding
            supplier_data = random.choice(self.mock_suppliers)
            print(f"Processing supplier onboarding: {supplier_data['supplier_name']}")
            result = self.system.process_supplier_onboarding(supplier_data)
            print(f"Result: {result}\n")
            
            # Process churn prediction
            buyer_data = random.choice(self.mock_buyers)
            print(f"Analyzing churn risk for buyer: {buyer_data['name']}")
            result = self.system.predict_churn_and_trigger_marketing(buyer_data)
            print(f"Result: {result}\n")
            
            # Process demand forecasting
            product_data = random.choice(self.mock_products)
            print(f"Forecasting demand for product: {product_data['product_id']}")
            result = self.system.forecast_demand_and_alert(product_data)
            print(f"Result: {result}\n")
            
            # Simulate processing delay
            time.sleep(2)
            print("-" * 50)
    
    def _generate_mock_suppliers(self):
        return [
            {
                'supplier_name': 'Fresh Farms Co',
                'amount': 25000,
                'terms': 'NET30'
            },
            {
                'supplier_name': 'Metro Distributors',
                'amount': 45000,
                'terms': 'NET15'
            },
            {
                'supplier_name': 'Quality Foods Ltd',
                'amount': 15000,
                'terms': 'NET30'
            },
            {
                'supplier_name': 'Prime Suppliers',
                'amount': 8000,
                'terms': 'NET45'
            },
            {
                'supplier_name': 'Green Valley Produce',
                'amount': 35000,
                'terms': 'NET30'
            }
        ]
    
    def _generate_mock_buyers(self):
        base_date = datetime.now()
        return [
            {
                'id': 'buyer_001',
                'name': 'Restaurant Chain A',
                'last_order_date': (base_date - timedelta(days=5)).isoformat(),
                'order_frequency': 25,
                'basket_size': 1200
            },
            {
                'id': 'buyer_002', 
                'name': 'Cafe Network B',
                'last_order_date': (base_date - timedelta(days=45)).isoformat(),
                'order_frequency': 8,
                'basket_size': 400
            },
            {
                'id': 'buyer_003',
                'name': 'Hotel Group C',
                'last_order_date': (base_date - timedelta(days=15)).isoformat(),
                'order_frequency': 20,
                'basket_size': 2500
            },
            {
                'id': 'buyer_004',
                'name': 'Fast Food Chain D',
                'last_order_date': (base_date - timedelta(days=2)).isoformat(),
                'order_frequency': 30,
                'basket_size': 800
            },
            {
                'id': 'buyer_005',
                'name': 'Catering Service E',
                'last_order_date': (base_date - timedelta(days=60)).isoformat(),
                'order_frequency': 5,
                'basket_size': 300
            }
        ]
    
    def _generate_mock_products(self):
        return [
            {
                'product_id': 'tomatoes_fresh',
                'current_inventory': 150,
                'historical_avg': 200
            },
            {
                'product_id': 'chicken_breast',
                'current_inventory': 80,
                'historical_avg': 120
            },
            {
                'product_id': 'lettuce_iceberg',
                'current_inventory': 45,
                'historical_avg': 90
            },
            {
                'product_id': 'beef_ground',
                'current_inventory': 200,
                'historical_avg': 180
            },
            {
                'product_id': 'onions_yellow',
                'current_inventory': 30,
                'historical_avg': 100
            }
        ]

if __name__ == "__main__":
    demo = ProductionDemo()
    demo.run_demo()

