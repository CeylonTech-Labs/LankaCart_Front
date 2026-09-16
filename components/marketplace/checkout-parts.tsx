import { Address } from "@/types";

export function AddressSelector({ addresses, value, onChange }: { addresses: Address[]; value: string; onChange: (value: string) => void }) {
  return (
    <div className="rounded-md border bg-card p-5 shadow-sm">
      <h2 className="font-semibold">Delivery address</h2>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {addresses.map((address) => (
          <button key={address.id} type="button" onClick={() => onChange(address.id)} className={`rounded-md border p-4 text-left text-sm ${value === address.id ? "border-secondary bg-secondary/10" : "bg-background"}`}>
            <p className="font-medium">{address.fullName}</p>
            <p className="mt-1 text-muted-foreground">{address.line1}, {address.city}</p>
            <p className="mt-1 text-muted-foreground">{address.phone}</p>
          </button>
        ))}
        {!addresses.length ? <p className="text-sm text-muted-foreground">No saved addresses.</p> : null}
      </div>
    </div>
  );
}
