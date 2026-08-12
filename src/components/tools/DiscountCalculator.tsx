import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";

import { formatRM, formatPercent, clamp } from "@/lib/format";

type Field = { key: keyof State; label: string; hint?: string; suffix: string; max?: number };

type State = {
  originalPrice: string;
  discountPercent: string;
  voucher: string;
  shipping: string;
  extraDiscount: string;
};

const initial: State = {
  originalPrice: "",
  discountPercent: "",
  voucher: "",
  shipping: "",
  extraDiscount: "",
};

const fields: Field[] = [
  { key: "originalPrice", label: "Harga Asal", suffix: "RM" },
  { key: "discountPercent", label: "Diskaun (%)", suffix: "%", max: 100 },
  { key: "voucher", label: "Nilai Voucher", suffix: "RM" },
  { key: "shipping", label: "Kos Penghantaran", suffix: "RM" },
  {
    key: "extraDiscount",
    label: "Diskaun Tambahan (%)",
    suffix: "%",
    max: 100,
    hint: "Contoh: diskaun kad bank atau promosi tambahan.",
  },
];

const toNumber = (raw: string) => {
  const n = Number.parseFloat(raw);
  return Number.isFinite(n) ? n : 0;
};

export function DiscountCalculator() {
  const [state, setState] = useState<State>(initial);

  const errors = useMemo(() => {
    const e: Partial<Record<keyof State, string>> = {};
    for (const f of fields) {
      const raw = state[f.key];
      if (raw === "") continue;
      const n = Number.parseFloat(raw);
      if (!Number.isFinite(n)) e[f.key] = "Masukkan nombor yang sah.";
      else if (n < 0) e[f.key] = "Nilai tidak boleh negatif.";
      else if (f.max && n > f.max) e[f.key] = `Maksimum ${f.max}${f.suffix}.`;
    }
    return e;
  }, [state]);

  const result = useMemo(() => {
    const original = Math.max(toNumber(state.originalPrice), 0);
    const pct = clamp(toNumber(state.discountPercent), 0, 100);
    const extraPct = clamp(toNumber(state.extraDiscount), 0, 100);
    const shipping = Math.max(toNumber(state.shipping), 0);

    const discountAmount = (original * pct) / 100;
    const afterDiscount = original - discountAmount;
    const extraAmount = (afterDiscount * extraPct) / 100;
    const afterExtra = afterDiscount - extraAmount;
    const voucher = Math.min(Math.max(toNumber(state.voucher), 0), afterExtra);
    const subtotal = Math.max(afterExtra - voucher, 0);
    const finalPrice = subtotal + shipping;
    const totalSaved = discountAmount + extraAmount + voucher;
    const effective = original > 0 ? (totalSaved / original) * 100 : 0;

    return {
      original,
      discountAmount,
      extraAmount,
      voucher,
      shipping,
      finalPrice,
      totalSaved,
      effective,
    };
  }, [state]);

  const hasInput = state.originalPrice !== "" && result.original > 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <form
        className="rounded-2xl border border-border bg-card p-5 shadow-card md:p-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="space-y-4">
          {fields.map((f) => {
            const id = `discount-${f.key}`;
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
                    inputMode="decimal"
                    type="number"
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
                {f.hint && !error && <p className="mt-1 text-xs text-muted-foreground">{f.hint}</p>}
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
          <p className="text-sm font-semibold text-accent-foreground">Anda Jimat</p>
          <p
            aria-live="polite"
            className="mt-1 text-3xl font-extrabold text-primary-strong md:text-4xl"
          >
            {formatRM(result.totalSaved)}
          </p>
          <p className="mt-1 text-sm text-accent-foreground">
            Diskaun efektif {formatPercent(result.effective)}
          </p>
        </div>

        <dl className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card p-5 shadow-card md:p-6">
          <Row label="Harga asal" value={formatRM(result.original)} />
          <Row label="Jumlah diskaun" value={`− ${formatRM(result.discountAmount)}`} />
          <Row label="Diskaun tambahan" value={`− ${formatRM(result.extraAmount)}`} />
          <Row label="Voucher" value={`− ${formatRM(result.voucher)}`} />
          <Row label="Penghantaran" value={`+ ${formatRM(result.shipping)}`} />
          <Row label="Harga akhir" value={formatRM(result.finalPrice)} emphasis />
        </dl>

        {!hasInput && (
          <p className="mt-3 text-sm text-muted-foreground">
            Masukkan harga asal untuk mula mengira.
          </p>
        )}
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
