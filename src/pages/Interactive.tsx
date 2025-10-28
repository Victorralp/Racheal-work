import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { DataCleaningDemo } from "@/components/DataCleaningDemo";
import { SQLShowcase } from "@/components/SQLShowcase";
import { InsightCard } from "@/components/InsightCard";
import { DashboardDemo } from "@/components/DashboardDemo";

const Interactive = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-20">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Interactive Demo
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            See how I work: dashboards, data cleaning, SQL queries, and actionable insights.
          </p>
        </div>

        {/* Dashboard Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-6">Dashboard View</h2>
          <DashboardDemo />
        </section>

        {/* Data Cleaning Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-6">Data Cleaning Demo</h2>
          <DataCleaningDemo />
        </section>

        {/* SQL Showcase Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-6">SQL Showcase</h2>
          <SQLShowcase />
        </section>

        {/* Insights Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Insights & Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InsightCard
              insight="South region has lower CAC than West but similar conversion rates"
              impact="Shifting 15% of ad spend from West → South could lift new signups by 8–12% next month"
              action="Reallocate spend next cycle, re-check CAC after 30 days"
            />
            <InsightCard
              insight="Product SKU-244 has 37.5% margin but represents only 8% of sales volume"
              impact="Increasing promotion of high-margin products could boost overall profitability by 15-20%"
              action="Launch targeted campaign for high-margin SKUs, track conversion lift"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Interactive;
