// import { Card } from '@/app/ui/dashboard/cards';


// import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
// import { lusitana } from '@/app/ui/fonts';
// import { fetchRevenue } from '@/app/lib/data';
import { fetchRevenue, fetchLatestInvoices } from '@/app/lib/data';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';

export default async function Page() {
  <h1>
    Dashboard
  </h1>
    const revenue = await fetchRevenue();
    console.log(revenue);
  // const latestInvoices = await fetchLatestInvoices();
  // console.log(latestInvoices);
  // ...
}