import { DurationPlan, Region } from "@/components/home/region-list"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: 'USD' | 'EUR' | 'GBP' | 'BDT'
    notation?: Intl.NumberFormatOptions['notation']
  } = {}
) {
  const { currency = 'USD', notation = 'compact' } = options

  const numericPrice =
    typeof price === 'string' ? parseFloat(price) : price

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice)
}



export const filterRegionsByTab = (tabValue: string, regions: Region[]): Region[] => {
  switch (tabValue) {
      case 'all':
          return regions;
      case 'asia':
          return regions.filter(region => region.region === 'Asia');
      case 'europe':
          return regions.filter(region => region.region === 'Europe');
      case 'americas':
          return regions.filter(region => region.region === 'North America' || region.region === 'South America');
      case 'middle-east':
          return regions.filter(region => region.region === 'Middle East');
      case 'oceania':
          return regions.filter(region => region.region === 'Oceania');
      default:
          return [];
  }
};

export const getPriceForPlan = (plan: string) => {
  switch (plan) {
      case "Monthly":
          return 10.00;
      case "Quarterly":
          return 25.00;
      case "Half-Yearly":
          return 45.00;
      case "Yearly":
          return 80.00;
      default:
          return 0.00;
  }
};


export const getDescriptionForPlan = (plan: string) => {
  switch (plan) {
      case "Monthly":
          return "Billed every month. Cancel anytime.";
      case "Quarterly":
          return "Billed every 3 months. Save 10%.";
      case "Half-Yearly":
          return "Billed every 6 months. Save 20%.";
      case "Yearly":
          return "Billed annually. Best value with 30% savings.";
      default:
          return "Select a plan.";
  }
};


export const durationsPlan: DurationPlan[] = [
  { name: "Monthly", discount: null, billingFrequency: "per month" },
  { name: "Quarterly", discount: "10%", billingFrequency: "every 3 months" },
  { name: "Half-Yearly", discount: "20%", billingFrequency: "every 6 months" },
  { name: "Yearly", discount: "30%", billingFrequency: "per year" },
]