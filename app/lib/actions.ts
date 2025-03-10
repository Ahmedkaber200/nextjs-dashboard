'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';

// Check if POSTGRES_URL is defined
if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL environment variable is not defined.');
}

// Create a PostgreSQL connection
const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

// Define the schema for invoice creation
const CreateInvoice = z.object({
  customerId: z.string(),
  amount: z.number(),
  status: z.enum(['pending', 'paid']), // Assuming status can be 'pending' or 'paid'
});

export async function createInvoice(formData: FormData) {
  try {
    // Parse and validate form data
    const { customerId, amount, status } = CreateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: Number(formData.get('amount')), // Convert string to number
      status: formData.get('status'),
    });

    // Convert amount to cents
    const amountInCents = amount * 100;

    // Get the current date in YYYY-MM-DD format
    const date = new Date().toISOString().split('T')[0];

    // Insert data into the database
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
    // return redirect('/invoices');
  
  } catch (error) {
    // Log the error for debugging
    console.error('Failed to create invoice:', error);

    // Throw a custom error message
    throw new Error('Failed to create invoice. Please check the form data.');
  }
}
