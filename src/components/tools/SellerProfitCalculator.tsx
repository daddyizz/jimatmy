import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";

import { formatRM, formatPercent, clamp } from "@/lib/format";

type State = {
  sellingPrice: string;
  productCost: string;
  shippingCost: string;
  marketplaceFee: string;
  adsCost: string;
  packagingCost: string;
  otherCost: string;
};

const initial: State = {
  sellingPrice: "",
  productCost: "",
  shippingCost: "",
  marketplaceFee: "",
  adsCost: "",
  packagingCost: "",
  otherCost: "",
};

const fields: { key: keyof State; label: string; suffix: "RM" | "%"; max?: number }[] = [
  { key: "sellingPrice", label: "Harga Jual", suffix: "RM" },
  { key: "productCost", label: "Kos Produk", suffix: "RM" },
  { key: "shippingCost", label: "Kos Penghantaran (ditanggung seller)", suffix: "RM" },
  { key: "marketplaceFee", label: "Yuran Marketplace (%)", suffix: "%", max: 100 },
  { key: "adsCost", label: "Kos Iklan", suffix: "RM" },
  { key: "packagingCost", label: "Kos Pembungkusan", suffix: "RM" },
  { key: "otherCost", label: "Kos Lain", suffix: "RM" },
];

const toNumber = (raw: string) => {
  const n = Number.parseFloat(raw);
  return Number.isFinite(n) ? n : 0;
};

type Status = { label: string; className: string };

function statusFor(margin: number, hasData: boolean): Status {
  if (!hasData) return { label: "—", className: "bg-muted text-muted-foreground" };
  if (margin < 0) return { label: "Rugi", className: "bg-destructive/10 text-destructive" };
  if (margin < 10)
    return { label: "Margin Rendah", className: "bg-warning/20 text-warning-foreground" };
  if (margin < 25) return { label: "Sihat", className: "bg-primary-soft text-accent-foreground" };
  return { label: "Sangat Baik", className: "bg-primary text-primary-foreground" };
}

export function SellerProfitCalculator() {
  const [state, setState] = useState<State>(initial);

  const errors = useMemo(() => {
    const e: Partial<Record<keyof State, string>> = {};
    for (const f of fields) {
      const raw = state[f.key];
      if (raw === "") continue;
      const n = Number.parseFloat(raw);
      if (!Number.isFinite(n)) e[f.key] = "Masukkan nombor yang sah.";
      else if (n < 0) e[f.key] = "Nilai tidak boleh negatif.";
      else if (f.max && n > f.max) e[f.key] = `Maksimum ${f.max}%.`;
    }
    return e;
  }, [state]);

  const result = useMemo(() => {
    const revenue = Math.max(toNumber(state.sellingPrice), 0);
    const feePct = clamp(toNumber(state.marketplaceFee), 0, 100);
    const fees = (revenue * feePct) / 100;
    const otherCosts =
      Math.max(toNumber(state.productCost), 0) +
      Math.max(toNumber(state.shippingCost), 0) +
      Math.max(toNumber(state.adsCost), 0) +
      Math.max(toNumber(state.packagingCost), 0) +
      Math.max(toNumber(state.otherCost), 0);
    const totalCosts = otherCosts + fees;
    const netProfit = revenue - totalCosts;
    const margin = revenue > 0 ? (netProfit / revenue) * 100 : 0;
    const roi = totalCosts > 0 ? (netProfit / totalCosts) * 100 : 0;
    return { revenue, fees, otherCosts, totalCosts, netProfit, margin, roi };
  }, [state]);

  const hasData = result.revenue > 0;
  const status = statusFor(result.margin, hasData);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <form
        className="rounded-2xl border border-border bg-card p-5 shadow-card md:p-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((f) => {
            const id = `profit-${f.key}`;
            const error = errors[f.key];
            return (
              <div key={f.key}>
                <label htmlFor={id} className="text-sm font-medium text-foreground">
                  {f.label}
                </label>
                <div
                  className={`mt-1.5 flex items-center rounded-xl border bg-background px-3 ${
                    error ? "border-destructive" : "border-input"
                  }`}
                >
                  {f.suffix === "RM" && <span className="text-sm text-muted-foreground">RM</span>}
                  <input
                    id={id}
                    type="number"
                    inputMode="decimal"
                    min={0}
                    {...(f.max ? { max: f.max } : {})}
                    step="0.01"
                    value={state[f.key]}
                    onChange={(e) => setState((s) => ({ ...s, [f.key]: e.target.value }))}
                    placeholder="0.00"
                    aria-invalid={Boolean(error)}
                    {...(error ? { "aria-describedby": `${id}-error` } : {})}
                    className="min-h-11 w-full bg-transparent px-2 text-base outline-none"
                  />
                  {f.suffix === "%" && <span className="text-sm text-muted-foreground">%</span>}
                </div>
                {error && (
                  <p id={`${id}-error`} role="alert" className="mt-1 text-xs text-destructive">
                    {error}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setState(initial)}
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl border border-border px-4 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Reset
        </button>
      </form>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-primary/25 bg-primary-soft p-5 md:p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-accent-foreground">Anggaran Untung Bersih</p>
            <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${status.className}`}>
              {status.label}
            </span>
          </div>
          <p
            aria-live="polite"
            className={`mt-1 text-3xl font-extrabold md:text-4xl ${
              result.netProfit < 0 ? "text-destructive" : "text-primary-strong"
            }`}
          >
            {formatRM(result.netProfit)}
          </p>
          <p className="mt-1 text-sm text-accent-foreground">
            Margin {formatPercent(result.margin)} · ROI {formatPercent(result.roi)}
          </p>
        </div>

        <dl className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card p-5 shadow-card md:p-6">
          <Row label="Revenue" value={formatRM(result.revenue)} />
          <Row label="Yuran marketplace" value={`− ${formatRM(result.fees)}`} />
          <Row label="Kos produk & operasi" value={`− ${formatRM(result.otherCosts)}`} />
          <Row label="Jumlah semua kos" value={`− ${formatRM(result.totalCosts)}`} />
          <Row label="Untung bersih" value={formatRM(result.netProfit)} emphasis />
        </dl>

        <p className="mt-4 rounded-2xl border border-border bg-muted/50 p-4 text-xs leading-relaxed text-muted-foreground">
          Anggaran ini adalah untuk tujuan perancangan sahaja. Yuran sebenar bergantung pada
          platform, program dan promosi yang digunakan.
        </p>
      </div>
    </div>
  );
}

function Row({ label, value, emphasis }: { label: string; value: string; emphasis?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <dt
        className={`text-sm ${emphasis ? "font-semibold text-foreground" : "text-muted-foreground"}`}
      >
        {label}
      </dt>
      <dd className={emphasis ? "text-lg font-extrabold text-foreground" : "text-sm font-medium"}>
        {value}
      </dd>
    </div>
  );
}
