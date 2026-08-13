import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import type { Session } from "@supabase/supabase-js";
import { Download, Loader2, LogOut, Pencil, Plus, Upload } from "lucide-react";

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

  async function importShopee(event: FormEvent) {
    event.preventDefault();
    if (!session) return;
    setBusy(true);
    setMessage("Sedang membaca pautan Shopee…");
    try {
      const response = await fetch("/api/admin/import-shopee", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ url: importUrl.trim() }),
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
        name: result.data.name,
        short_description: result.data.shortDescription,
        image_url: result.data.image,
        price: result.data.price,
        previous_price: result.data.previousPrice,
        affiliate_url: result.data.affiliateUrl,
      });
      setMessage(result.notice ?? "Maklumat diimport. Sila semak sebelum simpan.");
      setImportUrl("");
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
          Paste pautan biasa atau affiliate. Sistem akan cuba mengisi maklumat produk secara
          automatik.
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
          <button className="admin-primary" disabled={busy} type="submit">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            Import Produk
          </button>
        </div>
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
