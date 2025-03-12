"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";

// Check if POSTGRES_URL is defined
if (!process.env.POSTGRES_URL) {
  throw new Error("POSTGRES_URL environment variable is not defined.");
}

// Create a PostgreSQL connection
const sql = postgres(process.env.POSTGRES_URL, { ssl: "require" });

// Define the schema for invoice creation
const CreateInvoice = z.object({
  customerId: z.string(),
  amount: z.number(),
  status: z.enum(["pending", "paid"]), // Assuming status can be 'pending' or 'paid'
});

export async function createInvoice(formData: FormData) {
    // Parse and validate form data
    const { customerId, amount, status } = CreateInvoice.parse({
      customerId: formData.get("customerId"),
      amount: Number(formData.get("amount")), // Convert string to number
      status: formData.get("status"),
    });

    // Convert amount to cents
    const amountInCents = amount * 100;

    // Get the current date in YYYY-MM-DD format
    const date = new Date().toISOString().split("T")[0];

    // Insert data into the database
    try {
      await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
    } catch (error) {
      // We'll log the error to the console for now
      console.error(error);
    }

    redirect('/ui/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  throw new Error('Failed to Delete Invoice');
  
   // Unreachable code block
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath("/dashboard/invoices");
}

// Define the schema for invoice creation and updatez
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.number(),
  status: z.enum(["pending", "paid"]),
  date: z.string(),
});

// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: Number(formData.get("amount")), // Convert string to number
    status: formData.get("status"),
  });

  const amountInCents = amount * 100;

  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;

  redirect("/ui/dashboard/invoices");
}