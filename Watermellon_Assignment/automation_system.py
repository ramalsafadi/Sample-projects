import json
import time
import random
from datetime import datetime, timedelta
from typing import Dict, List, Any
from dataclasses import dataclass
from enum import Enum

class AutomationStatus(Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"
    NEEDS_REVIEW = "needs_review"

@dataclass
class SupplierData:
    name: str
    credit_score: float
    invoice_amount: float
    contract_terms: str
    risk_level: str

@dataclass
class BuyerData:
    id: str
    name: str
    last_order_date: datetime
    order_frequency: int
    basket_size: float
    churn_probability: float

@dataclass
class DemandForecast:
    product_id: str
    predicted_demand: int
    current_inventory: int
    risk_level: str
    alert_threshold: int

class WatermelonAutomationSystem:
    def __init__(self):
        self.suppliers = []
        self.buyers = []
        self.forecasts = []
        
    def process_supplier_onboarding(self, invoice_data: Dict) -> Dict:
        # OCR + NLP processing simulation
        extracted_data = self._extract_invoice_data(invoice_data)
        credit_score = self._calculate_credit_score(extracted_data)
        
        supplier = SupplierData(
            name=extracted_data['supplier_name'],
            credit_score=credit_score,
            invoice_amount=extracted_data['amount'],
            contract_terms=extracted_data['terms'],
            risk_level=self._assess_risk(credit_score)
        )
        
        decision = self._make_onboarding_decision(supplier)
        self._update_zoho_crm(supplier, decision)
        
        return {
            'supplier_id': len(self.suppliers),
            'status': decision.value,
            'credit_score': credit_score,
            'risk_level': supplier.risk_level
        }
    
    def predict_churn_and_trigger_marketing(self, buyer_data: Dict) -> Dict:
        # Churn prediction model simulation
        churn_prob = self._predict_churn(buyer_data)
        
        buyer = BuyerData(
            id=buyer_data['id'],
            name=buyer_data['name'],
            last_order_date=datetime.fromisoformat(buyer_data['last_order_date']),
            order_frequency=buyer_data['order_frequency'],
            basket_size=buyer_data['basket_size'],
            churn_probability=churn_prob
        )
        
        if churn_prob > 0.7:
            self._trigger_marketing_campaign(buyer, "high_risk")
        elif churn_prob > 0.4:
            self._trigger_marketing_campaign(buyer, "medium_risk")
            
        return {
            'buyer_id': buyer.id,
            'churn_probability': churn_prob,
            'action_taken': 'marketing_triggered' if churn_prob > 0.4 else 'no_action'
        }
    
    def forecast_demand_and_alert(self, product_data: Dict) -> Dict:
        # Demand forecasting simulation
        predicted_demand = self._forecast_demand(product_data)
        current_inventory = product_data['current_inventory']
        
        forecast = DemandForecast(
            product_id=product_data['product_id'],
            predicted_demand=predicted_demand,
            current_inventory=current_inventory,
            risk_level=self._assess_inventory_risk(predicted_demand, current_inventory),
            alert_threshold=int(predicted_demand * 0.8)
        )
        
        if current_inventory < forecast.alert_threshold:
            self._send_inventory_alert(forecast)
            
        return {
            'product_id': forecast.product_id,
            'predicted_demand': predicted_demand,
            'inventory_risk': forecast.risk_level,
            'alert_sent': current_inventory < forecast.alert_threshold
        }
    
    def _extract_invoice_data(self, invoice_data: Dict) -> Dict:
        # Simulate OCR + NLP extraction
        return {
            'supplier_name': invoice_data.get('supplier_name', f"Supplier_{random.randint(1000, 9999)}"),
            'amount': invoice_data.get('amount', random.uniform(5000, 50000)),
            'terms': invoice_data.get('terms', 'NET30')
        }
    
    def _calculate_credit_score(self, data: Dict) -> float:
        # Credit scoring logic simulation
        base_score = 650
        amount_factor = min(data['amount'] / 10000, 2.0) * 50
        terms_factor = 30 if data['terms'] == 'NET30' else 0
        return min(base_score + amount_factor + terms_factor + random.uniform(-50, 50), 850)
    
    def _assess_risk(self, credit_score: float) -> str:
        if credit_score >= 750: return "low"
        elif credit_score >= 650: return "medium"
        else: return "high"
    
    def _make_onboarding_decision(self, supplier: SupplierData) -> AutomationStatus:
        if supplier.credit_score >= 750 and supplier.risk_level == "low":
            return AutomationStatus.APPROVED
        elif supplier.credit_score < 600:
            return AutomationStatus.REJECTED
        else:
            return AutomationStatus.NEEDS_REVIEW
    
    def _predict_churn(self, buyer_data: Dict) -> float:
        # Churn prediction model simulation
        last_order_days = (datetime.now() - datetime.fromisoformat(buyer_data['last_order_date'])).days
        frequency_score = max(0, 1 - buyer_data['order_frequency'] / 30)
        recency_score = min(last_order_days / 90, 1.0)
        basket_score = max(0, 1 - buyer_data['basket_size'] / 1000)
        
        return min((frequency_score * 0.4 + recency_score * 0.4 + basket_score * 0.2), 1.0)
    
    def _forecast_demand(self, product_data: Dict) -> int:
        # Demand forecasting simulation
        base_demand = product_data.get('historical_avg', 100)
        seasonal_factor = random.uniform(0.8, 1.3)
        trend_factor = random.uniform(0.9, 1.2)
        
        return int(base_demand * seasonal_factor * trend_factor)
    
    def _assess_inventory_risk(self, predicted_demand: int, current_inventory: int) -> str:
        ratio = current_inventory / predicted_demand if predicted_demand > 0 else 1
        if ratio < 0.5: return "critical"
        elif ratio < 0.8: return "high"
        else: return "normal"
    
    def _update_zoho_crm(self, supplier: SupplierData, decision: AutomationStatus):
        # Simulate Zoho CRM API call
        print(f"Zoho CRM Update: {supplier.name} -> {decision.value}")
    
    def _trigger_marketing_campaign(self, buyer: BuyerData, risk_level: str):
        # Simulate marketing automation
        if risk_level == "high_risk":
            print(f"Marketing: Discount email + WhatsApp nudge for {buyer.name}")
        else:
            print(f"Marketing: Follow-up task created for {buyer.name}")
    
    def _send_inventory_alert(self, forecast: DemandForecast):
        # Simulate alert system
        print(f"Inventory Alert: {forecast.product_id} - Risk: {forecast.risk_level}")

