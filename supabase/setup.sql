create table if not exists public.products (
  id text primary key,
  name text not null,
  short_description text not null,
  image_url text not null,
  category text not null check (category in ('gadget', 'home', 'automotive', 'gaming', 'lifestyle')),
  marketplace text not null check (marketplace in ('shopee', 'lazada', 'tiktok')),
  price numeric(12,2) not null check (price >= 0),
  previous_price numeric(12,2) not null check (previous_price >= 0),
  popularity integer not null default 50,
  featured boolean not null default false,
  affiliate_url text not null,
  active boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.products enable row level security;

create policy "Public can read active products"
on public.products for select
using (active = true or (select auth.jwt()->>'email') = 'dady.izz85@gmail.com');

create policy "Owner can insert products"
on public.products for insert to authenticated
with check ((select auth.jwt()->>'email') = 'dady.izz85@gmail.com');

create policy "Owner can update products"
on public.products for update to authenticated
using ((select auth.jwt()->>'email') = 'dady.izz85@gmail.com')
with check ((select auth.jwt()->>'email') = 'dady.izz85@gmail.com');

create policy "Owner can delete products"
on public.products for delete to authenticated
using ((select auth.jwt()->>'email') = 'dady.izz85@gmail.com');

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images', 'product-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set public = true;

create policy "Public can view product images"
on storage.objects for select
using (bucket_id = 'product-images');

create policy "Owner can upload product images"
on storage.objects for insert to authenticated
with check (bucket_id = 'product-images' and (select auth.jwt()->>'email') = 'dady.izz85@gmail.com');

create policy "Owner can update product images"
on storage.objects for update to authenticated
using (bucket_id = 'product-images' and (select auth.jwt()->>'email') = 'dady.izz85@gmail.com');

create policy "Owner can delete product images"
on storage.objects for delete to authenticated
using (bucket_id = 'product-images' and (select auth.jwt()->>'email') = 'dady.izz85@gmail.com');

insert into public.products
  (id, name, short_description, image_url, category, marketplace, price, previous_price, popularity, featured, affiliate_url)
values
  ('blank-car-perfume', 'Blank Perfume Car Freshener 50ml', 'Pewangi kereta beraroma buah dengan pilihan Honeydew dan Peach.', 'https://jimatmy.lovable.app/assets/blank-car-perfume-CNNF2Mku.webp', 'automotive', 'shopee', 32.99, 122.45, 96, true, 'https://s.shopee.com.my/LmNrbzY8v'),
  ('perodua-gr-steering', 'Perodua GR Steering', 'Stereng gaya GR untuk model Myvi, Bezza, Axia dan Alza terpilih.', 'https://jimatmy.lovable.app/assets/perodua-gr-steering-Ce3sq_oj.webp', 'automotive', 'shopee', 1494, 1494, 91, true, 'https://s.shopee.com.my/9ANmO6OHEx'),
  ('baju-pahlawan-merdeka-kanak-kanak', 'Baju Pahlawan Merdeka Melayu Kanak-kanak', 'Pilihan warna dan saiz untuk sambutan Merdeka. Harga bermula RM8.80.', 'https://jimatmy.lovable.app/assets/baju-pahlawan-merdeka-GjcNQhIM.webp', 'lifestyle', 'shopee', 8.80, 8.80, 88, true, 'https://s.shopee.com.my/3LPzRVmL7n'),
  ('eaglade-riding-pants', 'EAGLADE Motorcycle Riding Pants', 'Seluar motosikal quick dry 4-way stretch. Harga bermula RM75.99.', 'https://jimatmy.lovable.app/assets/eaglade-riding-pants-BIH5KDCZ.webp', 'automotive', 'shopee', 75.99, 75.99, 84, true, 'https://s.shopee.com.my/8KofPoEHwL'),
  ('ktm-v2-waterproof-jacket', 'KTM V2 Waterproof Sport Jacket', 'Jaket sukan bertudung dengan beberapa pilihan warna. Harga bermula RM57.75.', 'https://jimatmy.lovable.app/assets/ktm-v2-jacket-BIy84kU3.webp', 'lifestyle', 'shopee', 57.75, 57.75, 76, false, 'https://s.shopee.com.my/70JHpPobGp'),
  ('amazfit-bip-6', 'Amazfit Bip 6 Smart Watch', 'Jam pintar original dengan beberapa pilihan warna. Harga bermula RM399.', 'https://jimatmy.lovable.app/assets/amazfit-bip-6-DAza4E8i.webp', 'lifestyle', 'shopee', 399, 399, 72, false, 'https://s.shopee.com.my/1VyLHMBLqG'),
  ('kingston-fury-beast-ddr4', 'Kingston Fury Beast DDR4 Desktop RAM', 'Pilihan 4GB, 8GB dan 16GB dengan pelbagai kelajuan. Harga bermula RM335.', 'https://jimatmy.lovable.app/assets/kingston-fury-beast-ddr4-USwoc1j2.webp', 'gaming', 'shopee', 335, 335, 68, false, 'https://s.shopee.com.my/6VN1Ec7t45'),
  ('magic-pocket-kermit-camping-chair', 'Magic Pocket Kermit Double Camping Chair', 'Kerusi lipat mudah alih 2–3 tempat duduk. Harga bermula RM40.60.', 'https://jimatmy.lovable.app/assets/kermit-camping-chair-Opr6f5_r.webp', 'lifestyle', 'shopee', 40.60, 40.60, 64, false, 'https://s.shopee.com.my/2BE24kDIY5')
on conflict (id) do nothing;

create table if not exists public.price_reports (
  id uuid primary key default gen_random_uuid(),
  page_url text not null check (char_length(page_url) between 1 and 500),
  reason text not null check (reason in ('Harga sudah berubah', 'Produk sudah habis', 'Pautan tidak berfungsi', 'Maklumat produk salah')),
  details text not null default '' check (char_length(details) <= 300),
  status text not null default 'baru' check (status in ('baru', 'selesai')),
  created_at timestamptz not null default now()
);

alter table public.price_reports enable row level security;

create policy "Visitors can submit price reports"
on public.price_reports for insert to anon, authenticated
with check (status = 'baru');

create policy "Owner can read price reports"
on public.price_reports for select to authenticated
using ((select auth.jwt()->>'email') = 'dady.izz85@gmail.com');

create policy "Owner can update price reports"
on public.price_reports for update to authenticated
using ((select auth.jwt()->>'email') = 'dady.izz85@gmail.com')
with check ((select auth.jwt()->>'email') = 'dady.izz85@gmail.com');

create policy "Owner can delete price reports"
on public.price_reports for delete to authenticated
using ((select auth.jwt()->>'email') = 'dady.izz85@gmail.com');
