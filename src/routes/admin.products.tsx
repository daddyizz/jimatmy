import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import type { Session } from "@supabase/supabase-js";
import { Download, Loader2, LogOut, Pencil, Plus, Upload } from "lucide-react";
import { createWorker } from "tesseract.js";

import { categories, type CategorySlug } from "@/data/categories";
import type { Marketplace } from "@/data/affiliate";
import { supabase, supabaseConfigured } from "@/lib/supabase";

export const Route = createFileRoute("/admin/products")({
  head: () => ({
    meta: [{ title: "Urus Produk — JimatMY" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: AdminProductsPage,
});

type ProductRow = {
  id: string;
  name: string;
  short_description: string;
  image_url: string;
  category: CategorySlug;
  marketplace: Marketplace;
  price: number;
  previous_price: number;
  popularity: number;
  featured: boolean;
  affiliate_url: string;
  active: boolean;
};

const emptyProduct: ProductRow = {
  id: "",
  name: "",
  short_description: "",
  image_url: "",
  category: "gadget",
  marketplace: "shopee",
  price: 0,
  previous_price: 0,
  popularity: 50,
  featured: false,
  affiliate_url: "",
  active: true,
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function AdminProductsPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [items, setItems] = useState<ProductRow[]>([]);
  const [editing, setEditing] = useState<ProductRow | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [importUrl, setImportUrl] = useState("");
  const [importScreenshot, setImportScreenshot] = useState<File | null>(null);

  useEffect(() => {
    if (!supabase) return;
    void supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session || !supabase) return;
    void loadProducts();
  }, [session]);

  async function loadProducts() {
    if (!supabase) return;
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("popularity", { ascending: false });
    if (error) setMessage(`Gagal memuatkan produk: ${error.message}`);
    else setItems((data ?? []) as ProductRow[]);
  }

  async function login(event: FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setMessage(error ? `Login gagal: ${error.message}` : "Login berjaya.");
    setBusy(false);
  }

  async function cropProductImage(file: File) {
    const bitmap = await createImageBitmap(file);
    const sourceSize = Math.min(bitmap.width, bitmap.height);
    const sourceY = Math.min(
      Math.round(bitmap.height * 0.12),
      Math.max(bitmap.height - sourceSize, 0),
    );
    const outputSize = Math.min(900, sourceSize);
    const canvas = document.createElement("canvas");
    canvas.width = outputSize;
    canvas.height = outputSize;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Pelayar tidak dapat memproses gambar.");
    context.drawImage(bitmap, 0, sourceY, sourceSize, sourceSize, 0, 0, outputSize, outputSize);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/webp", 0.82),
    );
    if (!blob) throw new Error("Gagal menyediakan gambar produk.");
    return new File([blob], `shopee-${Date.now()}.webp`, { type: "image/webp" });
  }

  function extractProduct(text: string) {
    const lines = text
      .split(/\r?\n/)
      .map((line) => line.replace(/\s+/g, " ").trim())
      .filter(Boolean);
    const prices = [...text.matchAll(/RM\s*([0-9][0-9.,]*)/gi)]
      .map((match) => Number(match[1]?.replace(/,/g, "")))
      .filter((price) => Number.isFinite(price) && price > 0);
    const voucherPriceLine = lines.find(
      (line) => /after\s+voucher/i.test(line) && /RM\s*[0-9]/i.test(line),
    );
    const voucherPriceMatch = voucherPriceLine?.match(/RM\s*([0-9][0-9.,]*)/i);
    const voucherPrice = voucherPriceMatch
      ? Number(voucherPriceMatch[1].replace(/,/g, ""))
      : 0;
    const ignored =
      /shopee|shipping|voucher|sold|rating|cashback|coins|add to cart|buy now|free returns?|cash on delivery|mobile protec|select variation|review summary|chat now|paylater|months?|arrives? late|lower prices?|remind me|get by/i;
    const priceLineIndex = lines.findIndex(
      (line) => /after\s+voucher/i.test(line) && /RM\s*[0-9]/i.test(line),
    );
    const fallbackPriceLineIndex = lines.findIndex((line) => /RM\s*[0-9]/i.test(line));
    const titleStart =
      priceLineIndex >= 0
        ? priceLineIndex + 1
        : fallbackPriceLineIndex >= 0
          ? fallbackPriceLineIndex + 1
          : 0;
    const titleLines: string[] = [];

    // On Shopee mobile, the title appears shortly after the price. It can span
    // several OCR lines, so join those lines and stop at delivery/policy blocks.
    for (const line of lines.slice(titleStart, titleStart + 12)) {
      if (/get by|free returns?|cash on delivery|mobile protec|select variation|product ratings?/i.test(line)) {
        if (titleLines.length) break;
        continue;
      }
      if (
        line.length < 3 ||
        ignored.test(line) ||
        /^RM\s*/i.test(line) ||
        /^buy\s+RM/i.test(line) ||
        !/[a-z]/i.test(line)
      ) {
        continue;
      }
      titleLines.push(line);
    }

    const fallbackCandidates = lines.filter(
      (line) =>
        line.length >= 12 &&
        line.length <= 180 &&
        !ignored.test(line) &&
        !/^RM\s*/i.test(line) &&
        /[a-z]/i.test(line),
    );
    const rawName =
      titleLines.join(" ") ||
      fallbackCandidates.sort((a, b) => b.length - a.length)[0] ||
      "";
    const normalizedName = rawName
      .replace(/^[^a-z0-9(]+/i, "")
      .replace(/^preferred\s+/i, "")
      .replace(/[^\p{L}\p{N}\s()/%&+.,-]/gu, " ")
      .replace(/\b1+00%/g, "100%")
      .replace(/\)\s*/g, ") ")
      .replace(/\s+/g, " ")
      .trim();
    const condition = normalizedName.match(/^\(([^)]+)\)\s*/)?.[1] ?? "";
    const name = normalizedName
      .replace(/^\([^)]+\)\s*/, "")
      .replace(
        /\s+(?:1[0o]{2}\s*%|no\s+hidden\b|free\s+gift\b|ready\s+stock\b)[\s\S]*$/i,
        "",
      )
      .replace(/[!.,\s]+$/, "")
      .slice(0, 180);
    const price = Number.isFinite(voucherPrice) && voucherPrice > 0
      ? voucherPrice
      : prices[0] ?? 0;
    return {
      name,
      condition,
      price,
      previousPrice: prices.find((value) => value > price) ?? price,
    };
  }

  async function importShopee(event: FormEvent) {
    event.preventDefault();
    if (!session) return;
    if (!importScreenshot) {
      setMessage("Sila pilih screenshot halaman produk Shopee.");
      return;
    }
    setBusy(true);
    setMessage("Sedang membaca screenshot… Proses ini mungkin mengambil sedikit masa.");
    try {
      const worker = await createWorker("eng");
      const recognition = await worker.recognize(importScreenshot);
      await worker.terminate();
      const extracted = extractProduct(recognition.data.text);
      const submittedUrl = importUrl.trim();
      const uploadedImage = await uploadImage(await cropProductImage(importScreenshot));
      const response = await fetch("/api/admin/import-shopee", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ url: submittedUrl }),
      });
      const result = (await response.json()) as {
        error?: string;
        notice?: string;
        data?: {
          name: string;
          shortDescription: string;
          image: string;
          price: number;
          previousPrice: number;
          affiliateUrl: string;
        };
      };
      if (!response.ok || !result.data) throw new Error(result.error ?? "Import gagal.");
      setEditing({
        ...emptyProduct,
        name: extracted.name || result.data.name,
        short_description:
          (extracted.name
            ? `${extracted.name}.${
                extracted.condition ? ` Kondisi: ${extracted.condition}.` : ""
              } Semak pilihan variasi dan butiran produk di Shopee.`
            : result.data.shortDescription) || "Lengkapkan penerangan produk ini.",
        image_url: uploadedImage ?? result.data.image,
        price: extracted.price || result.data.price,
        previous_price: extracted.previousPrice || result.data.previousPrice,
        affiliate_url: submittedUrl,
      });
      setMessage(
        extracted.name && extracted.price
          ? "Screenshot berjaya dibaca. Semak semua maklumat dan potongan gambar sebelum simpan."
          : "Sebahagian maklumat tidak dapat dibaca. Lengkapkan ruangan kosong sebelum simpan.",
      );
      setImportUrl("");
      setImportScreenshot(null);
    } catch (error) {
      setMessage(
        `Import gagal: ${error instanceof Error ? error.message : "Ralat tidak diketahui"}`,
      );
    } finally {
      setBusy(false);
    }
  }

  async function uploadImage(file: File) {
    if (!supabase) return null;
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file, {
      cacheControl: "31536000",
      upsert: false,
    });
    if (error) throw error;
    return supabase.storage.from("product-images").getPublicUrl(path).data.publicUrl;
  }

  async function saveProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase || !editing) return;
    setBusy(true);
    setMessage("");
    try {
      const form = event.currentTarget;
      const imageFile = new FormData(form).get("image") as File;
      let imageUrl = editing.image_url;
      if (imageFile?.size) imageUrl = (await uploadImage(imageFile)) ?? imageUrl;
      if (!imageUrl) throw new Error("Sila upload gambar produk.");

      const record = {
        ...editing,
        id: editing.id || slugify(editing.name),
        image_url: imageUrl,
        updated_at: new Date().toISOString(),
      };
      const { error } = await supabase.from("products").upsert(record);
      if (error) throw error;
      setEditing(null);
      setMessage("Produk berjaya disimpan.");
      await loadProducts();
    } catch (error) {
      setMessage(
        `Gagal menyimpan: ${error instanceof Error ? error.message : "Ralat tidak diketahui"}`,
      );
    } finally {
      setBusy(false);
    }
  }

  async function toggleActive(product: ProductRow) {
    if (!supabase) return;
    setBusy(true);
    const { error } = await supabase
      .from("products")
      .update({ active: !product.active, updated_at: new Date().toISOString() })
      .eq("id", product.id);
    setMessage(error ? `Gagal mengubah status: ${error.message}` : "Status produk dikemas kini.");
    await loadProducts();
    setBusy(false);
  }

  if (!supabaseConfigured) {
    return <AdminNotice text="Dashboard belum disambungkan kepada Supabase." />;
  }

  if (!session) {
    return (
      <div className="container-page max-w-md py-16">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <h1 className="text-2xl font-extrabold">Admin JimatMY</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Login untuk mengurus produk dan harga.
          </p>
          <form onSubmit={login} className="mt-6 space-y-4">
            <Field label="E-mel">
              <input
                className="admin-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>
            <Field label="Password">
              <input
                className="admin-input"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>
            <button disabled={busy} className="admin-primary w-full" type="submit">
              {busy ? "Sedang login…" : "Login"}
            </button>
          </form>
          {message && <p className="mt-4 text-sm text-muted-foreground">{message}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold">Urus Produk</h1>
          <p className="text-sm text-muted-foreground">
            {items.length} produk dalam pangkalan data
          </p>
        </div>
        <div className="flex gap-2">
          <button className="admin-primary" onClick={() => setEditing({ ...emptyProduct })}>
            <Plus className="h-4 w-4" /> Tambah Produk
          </button>
          <button className="admin-secondary" onClick={() => void supabase?.auth.signOut()}>
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </div>

      {message && <p className="mt-4 rounded-xl bg-muted p-3 text-sm">{message}</p>}

      <form
        onSubmit={importShopee}
        className="mt-6 rounded-2xl border border-border bg-card p-4 shadow-card"
      >
        <label htmlFor="shopee-import" className="text-sm font-bold">
          Import daripada pautan Shopee
        </label>
        <p className="mt-1 text-xs text-muted-foreground">
          Paste pautan dan pilih satu screenshot yang menunjukkan gambar, nama serta harga produk.
        </p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            id="shopee-import"
            className="admin-input flex-1"
            type="url"
            inputMode="url"
            placeholder="https://s.shopee.com.my/..."
            required
            value={importUrl}
            onChange={(event) => setImportUrl(event.target.value)}
          />
          <label className="admin-secondary cursor-pointer">
            <Upload className="h-4 w-4" /> Screenshot
            <input
              className="sr-only"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              required
              onChange={(event) => setImportScreenshot(event.target.files?.[0] ?? null)}
            />
          </label>
          <button className="admin-primary" disabled={busy} type="submit">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            Import Produk
          </button>
        </div>
        {importScreenshot && (
          <p className="mt-2 text-xs text-muted-foreground">Dipilih: {importScreenshot.name}</p>
        )}
      </form>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((product) => (
          <article
            key={product.id}
            className={`rounded-2xl border border-border bg-card p-4 ${product.active ? "" : "opacity-60"}`}
          >
            <img
              src={product.image_url}
              alt=""
              className="aspect-video w-full rounded-xl object-cover"
            />
            <h2 className="mt-3 font-bold">{product.name}</h2>
            <p className="text-lg font-extrabold">RM{Number(product.price).toFixed(2)}</p>
            <div className="mt-3 flex gap-2">
              <button className="admin-secondary flex-1" onClick={() => setEditing({ ...product })}>
                <Pencil className="h-4 w-4" /> Edit
              </button>
              <button
                className="admin-secondary flex-1"
                disabled={busy}
                onClick={() => void toggleActive(product)}
              >
                {product.active ? "Sembunyikan" : "Aktifkan"}
              </button>
            </div>
          </article>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-[80] overflow-y-auto bg-black/60 p-4">
          <form
            onSubmit={saveProduct}
            className="mx-auto max-w-xl space-y-4 rounded-2xl bg-card p-6 shadow-raised"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{editing.id ? "Edit Produk" : "Tambah Produk"}</h2>
              <button type="button" className="admin-secondary" onClick={() => setEditing(null)}>
                Tutup
              </button>
            </div>
            <Field label="Nama produk">
              <input
                className="admin-input"
                required
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              />
            </Field>
            <Field label="Penerangan ringkas">
              <textarea
                className="admin-input min-h-24"
                required
                value={editing.short_description}
                onChange={(e) => setEditing({ ...editing, short_description: e.target.value })}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Harga semasa (RM)">
                <input
                  className="admin-input"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  value={editing.price}
                  onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })}
                />
              </Field>
              <Field label="Harga asal (RM)">
                <input
                  className="admin-input"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  value={editing.previous_price}
                  onChange={(e) =>
                    setEditing({ ...editing, previous_price: Number(e.target.value) })
                  }
                />
              </Field>
              <Field label="Kategori">
                <select
                  className="admin-input"
                  value={editing.category}
                  onChange={(e) =>
                    setEditing({ ...editing, category: e.target.value as CategorySlug })
                  }
                >
                  {categories.map((category) => (
                    <option key={category.slug} value={category.slug}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Marketplace">
                <select
                  className="admin-input"
                  value={editing.marketplace}
                  onChange={(e) =>
                    setEditing({ ...editing, marketplace: e.target.value as Marketplace })
                  }
                >
                  <option value="shopee">Shopee</option>
                  <option value="lazada">Lazada</option>
                  <option value="tiktok">TikTok Shop</option>
                </select>
              </Field>
            </div>
            <Field label="Pautan affiliate">
              <input
                className="admin-input"
                type="url"
                required
                value={editing.affiliate_url}
                onChange={(e) => setEditing({ ...editing, affiliate_url: e.target.value })}
              />
            </Field>
            <Field label="Gambar produk">
              <label className="admin-secondary cursor-pointer">
                <Upload className="h-4 w-4" /> Pilih gambar
                <input
                  className="sr-only"
                  name="image"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                />
              </label>
              {editing.image_url && (
                <img
                  src={editing.image_url}
                  alt="Preview"
                  className="mt-2 h-24 w-24 rounded-xl object-cover"
                />
              )}
            </Field>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={editing.featured}
                onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
              />{" "}
              Paparkan di Home
            </label>
            <button className="admin-primary w-full" disabled={busy} type="submit">
              {busy ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Menyimpan…
                </>
              ) : (
                "Simpan Produk"
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-sm font-semibold">
      <span className="mb-1 block">{label}</span>
      {children}
    </label>
  );
}

function AdminNotice({ text }: { text: string }) {
  return (
    <div className="container-page py-16">
      <div className="rounded-2xl border border-border bg-card p-6">
        <h1 className="text-xl font-bold">Admin JimatMY</h1>
        <p className="mt-2 text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
