import { useState, type FormEvent } from "react";
import { AlertTriangle, Loader2, X } from "lucide-react";

import { supabase, supabaseConfigured } from "@/lib/supabase";

const reasons = [
  "Harga sudah berubah",
  "Produk sudah habis",
  "Pautan tidak berfungsi",
  "Maklumat produk salah",
];

export function PriceReportButton() {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState(reasons[0]);
  const [details, setDetails] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  if (!supabaseConfigured) return null;

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setMessage("");
    const { error } = await supabase.from("price_reports").insert({
      page_url: window.location.href.slice(0, 500),
      reason,
      details: details.trim().slice(0, 300),
    });
    setBusy(false);
    if (error) {
      setMessage("Laporan belum dapat dihantar. Cuba lagi sebentar.");
      return;
    }
    setDetails("");
    setMessage("Terima kasih! Laporan telah dihantar.");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setMessage("");
          setOpen(true);
        }}
        className="fixed bottom-20 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-raised transition hover:bg-primary/90"
        aria-label="Laporkan harga atau pautan bermasalah"
      >
        <AlertTriangle className="h-4 w-4" />
        Laporkan Harga
      </button>

      {open && (
        <div className="fixed inset-0 z-[90] flex items-end justify-center bg-black/55 p-4 sm:items-center">
          <form
            onSubmit={submit}
            className="w-full max-w-md space-y-4 rounded-3xl bg-card p-5 shadow-raised"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold">Laporkan Deal</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Bantu kami memastikan harga dan pautan sentiasa tepat.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-border p-2"
                aria-label="Tutup"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <label className="block text-sm font-semibold">
              <span className="mb-1 block">Apa masalahnya?</span>
              <select
                className="admin-input"
                value={reason}
                onChange={(event) => setReason(event.target.value)}
              >
                {reasons.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

            <label className="block text-sm font-semibold">
              <span className="mb-1 block">Catatan tambahan (pilihan)</span>
              <textarea
                className="admin-input min-h-24"
                maxLength={300}
                placeholder="Contoh: Harga sekarang RM29.90"
                value={details}
                onChange={(event) => setDetails(event.target.value)}
              />
            </label>

            {message && <p className="rounded-xl bg-muted p-3 text-sm">{message}</p>}
            <button className="admin-primary w-full" type="submit" disabled={busy || !!message}>
              {busy ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Menghantar…
                </>
              ) : (
                "Hantar Laporan"
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
