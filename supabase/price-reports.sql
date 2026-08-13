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
