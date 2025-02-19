// import { Card } from '@/app/ui/dashboard/cards';
// import RevenueChart from '../../ui/dashboard/revenue-chart';

import {RevenueChart} from '@/app/ui/dashboard/revenue-chart';
// import RevenueChart from '@/app/ui/dashboard/revenue-chart';

// import RevenueChart from '@/app/ui/dashboard/revenue-chart';
// import RevenueChart from '../ui/dashboard/revenue-chart';
import {LatestInvoices} from '@/app/ui/dashboard/latest-invoices';
// import { lusitana } from '@/app/ui/fonts';
// import { fetchRevenue } from '@/app/lib/data';
import { fetchRevenue, fetchLatestInvoices } from '@/app/lib/data';

export default async function Page() {
    const revenue = await fetchRevenue();
    const latestInvoices = await fetchLatestInvoices();
    // console.log(revenue);
    // console.log(latestInvoices);
    return (
        <div>
            <RevenueChart revenue={revenue} />
            <LatestInvoices latestInvoices={latestInvoices} />
        </div>
    );
}
