#!/usr/bin/env python3

from ui_dashboard import UIDemo

if __name__ == '__main__':
    print("=" * 60)
    print("🍉 WATERMELON AI - STAKEHOLDER DASHBOARD")
    print("=" * 60)
    print()
    print("This dashboard provides real-time visualization of:")
    print("• Supplier Onboarding Automation")
    print("• Churn Prediction & Marketing Triggers") 
    print("• Demand Forecasting & Inventory Alerts")
    print()
    print("Dashboard will be available at: http://localhost:5001")
    print("=" * 60)
    print()
    
    ui_demo = UIDemo()
    ui_demo.run(debug=False)

