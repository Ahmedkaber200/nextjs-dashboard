// import { Card } from '@/app/ui/dashboard/cards';
// import RevenueChart from '../../ui/dashboard/revenue-chart';

import {RevenueChart} from '@/app/ui/dashboard/revenue-chart';
// import RevenueChart from '@/app/ui/dashboard/revenue-chart';

// import RevenueChart from '@/app/ui/dashboard/revenue-chart';
// import RevenueChart from '../ui/dashboard/revenue-chart';
// import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
// import { lusitana } from '@/app/ui/fonts';
// import { fetchRevenue } from '@/app/lib/data';
import { fetchRevenue, fetchLatestInvoices } from '@/app/lib/data';

export default async function Page() {
    const revenue = await fetchRevenue();
    console.log(revenue);
    return (<RevenueChart revenue={revenue}/>)
    // const fetchrevenue = await RevenueChart();
    // console.log(fetchrevenue);
    // const latestInvoices = await fetchLatestInvoices();
    // console.log(latestInvoices);
}

// export default function RevenueChart() {
//   return <div>Chart</div>;
// }
