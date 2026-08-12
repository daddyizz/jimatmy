# JimatMY Smart Shopper

JimatMY — Malaysian Smart Shopping Utility Platform

Build a complete, polished, mobile-first web application called JimatMY.

Brand

Name: JimatMY
Tagline: Beli Bijak. Jimat Lebih.

JimatMY is a Malaysian smart-shopping utility platform that helps users calculate discounts, estimate seller profits, compare products, discover deals, and make smarter buying decisions.

The product should feel like a genuine consumer technology platform, not a generic blog and not a simple affiliate website.

The initial target market is Malaysia.

1. Main Product Goal

Build an MVP that combines:

Shopping utility tools

Product discovery

Product comparison

Buying guides

Affiliate-ready product cards

SEO-friendly content

Mobile-first design

The website must provide useful functionality even when no affiliate links are clicked.

Do not make the entire site feel like advertising.

Aim for approximately:

70% useful content/tools

and

30% commercial/affiliate content

2. Visual Design

Create a clean, modern, premium shopping-tech interface.

Do NOT copy Shopee, TikTok, Lazada, Amazon, or any other marketplace.

Use an original JimatMY visual identity.

Suggested palette

Primary:
Emerald / fresh green

Secondary:
Dark navy / charcoal

Background:
Soft off-white

Cards:
White

Accent:
Use subtle green shades for savings, positive values, discounts, and CTAs.

Avoid excessive gradients.

Use generous spacing, rounded cards, subtle borders, and restrained shadows.

3. Logo

Create a simple temporary text/logo treatment for:

JimatMY

The logo may combine:

Letter J

Price tag

Discount symbol

Downward price arrow

Keep it minimalist.

Do not use marketplace logos.

4. Navigation

Create the following primary navigation:

Home

Deals

Compare

Tools

Guides

About

Tools should include:

Discount Calculator

Seller Profit Calculator

Deals should support categories such as:

Gadget

Home

Automotive

Gaming

Lifestyle

The navigation must work well on desktop and mobile.

Create a proper mobile hamburger menu.

5. Homepage

Design a strong homepage with these sections.

Hero

Headline:

Beli Bijak. Jimat Lebih.

Subheadline:

Kira harga sebenar, banding produk dan cari pilihan yang lebih berbaloi sebelum membeli.

Add a large search field:

Cari produk, kategori atau deal...

Primary CTA:

Cari Deal

Secondary CTA:

Guna Shopping Tools

6. Shopping Tools Section

Display prominent cards for:

Discount Calculator

Description:

Kira harga sebenar selepas diskaun, voucher dan kos penghantaran.

CTA:

Kira Sekarang

Seller Profit Calculator

Description:

Anggar keuntungan sebenar selepas kos produk, yuran dan perbelanjaan iklan.

CTA:

Kira Profit

Both tools must actually work.

7. Discount Calculator

Create a dedicated page.

Inputs:

Original Price

Discount %

Voucher Amount

Shipping Cost

Optional extra discount

Currency:

RM

Calculate and display:

Original price

Discount amount

Voucher savings

Shipping

Final price

Total amount saved

Effective discount percentage

Highlight:

Anda Jimat RMXX.XX

Add validation.

Do not allow invalid negative values.

Include a reset button.

Make the calculator responsive and very easy to use on mobile.

8. Seller Profit Calculator

Create a dedicated page for Malaysian online sellers.

Inputs:

Selling Price

Product Cost

Shipping Cost Paid by Seller

Marketplace Fee %

Advertising Cost

Packaging Cost

Other Cost

Calculate:

Revenue

Total Costs

Marketplace Fees

Net Profit

Profit Margin %

ROI %

Display a prominent result:

Anggaran Untung Bersih

Also show a status such as:

Sangat Baik

Sihat

Margin Rendah

Rugi

based on estimated profit margin.

Include a reset button.

Do not claim these calculations represent official marketplace fees.

Add a note:

Anggaran ini adalah untuk tujuan perancangan sahaja. Yuran sebenar bergantung pada platform, program dan promosi yang digunakan.

9. Featured Deals

Create a section titled:

Deal Pilihan

Use sample product data initially.

Each product card should support:

Product image

Product name

Short description

Current price

Previous price

Discount percentage

Marketplace label

Category

CTA

CTA example:

Semak Harga

Affiliate URLs will be added later.

Create the data model so affiliate URLs can easily be replaced from one place.

Do NOT hard-code tracking IDs throughout individual components.

10. Product Comparison

Create a Compare page.

Example comparison:

Xiaomi TV Box S vs ONN 4K Streaming Box

Display comparison in a clean mobile-friendly format.

Fields:

Price range

Operating system

Resolution

RAM

Storage

Connectivity

Streaming compatibility

Gaming suitability

Advantages

Disadvantages

Best for

Include:

Pilihan JimatMY

with a concise explanation of which type of buyer should choose each product.

Do not present one product as universally superior.

11. Compare Feature Structure

Design the system so more products can later be added through structured data.

Use reusable components.

Avoid creating separate duplicated layouts for every comparison.

Potential future comparisons:

Android TV boxes

Earbuds

Power banks

Smart watches

Wireless routers

Gaming accessories

Car accessories

12. Deals Page

Create a Deals page with filtering.

Filters:

Category

Price

Marketplace

Discount

Sort

Sorting:

Popular

Price Low to High

Price High to Low

Biggest Discount

Display product cards in a responsive grid.

On mobile, prioritize speed and readability.

13. Guides

Create a buying-guide section.

Initial sample guide titles:

Cara Pilih Android TV Box Yang Berbaloi

7 Perkara Wajib Semak Sebelum Beli Power Bank

Cara Kira Harga Selepas Voucher dan Diskaun

Cara Kira Margin Untung Seller Online

Barang Murah Tidak Semestinya Lebih Jimat

Guide pages should have:

Title

Introduction

Table of contents where appropriate

Clear headings

Helpful explanations

Internal links

Related tools

Related products

Do not generate thin or spammy affiliate content.

14. Search

Create site-wide search.

Users should be able to search for:

Products

Deals

Comparisons

Guides

Tools

Search results must clearly identify the type of result.

15. Saved Deals

Add a simple:

Saved Deals / Favorites

feature.

For MVP, local storage is acceptable.

Users should be able to save and remove products.

Do not require login yet.

16. Affiliate Architecture

The website will later use:

Shopee Affiliate

TikTok Shop Affiliate

Possibly other affiliate networks

Build reusable affiliate-link handling.

Create a centralized data structure for:

Product URL

Marketplace

Affiliate URL

Tracking source

Do not automatically invent real affiliate links.

Use placeholder URLs.

Clearly identify affiliate buttons where appropriate without making the UI ugly.

17. Analytics-Ready Architecture

Prepare the site structure for later integration with:

Google Analytics

Google Search Console

AdSense

Meta/TikTok tracking if needed

Do not insert fake analytics IDs.

Use placeholders or configuration variables.

18. Advertising

Design optional ad placements without making the website cluttered.

Potential placements:

Between homepage sections

Inside long guides

Deals listing

Comparison pages

Use placeholder components such as:

Advertisement

Do not display fake ads.

The site must remain usable when ads are disabled.

19. SEO

Implement solid technical SEO.

Every page should support:

Unique title

Meta description

Canonical URL

Open Graph title

Open Graph description

Social preview metadata

Create:

robots.txt

sitemap.xml

Use semantic HTML.

Use proper H1/H2/H3 hierarchy.

Avoid keyword stuffing.

20. Structured Data

Where appropriate, prepare structured data support for:

Article

FAQ

Breadcrumb

WebSite

SoftwareApplication / WebApplication

Do not create fake reviews, ratings, or testimonials.

21. Footer

Create a professional footer with:

JimatMY

Beli Bijak. Jimat Lebih.

Links:

About

Contact

Privacy Policy

Terms

Affiliate Disclosure

Disclaimer

Categories:

Gadget

Home

Automotive

Gaming

Lifestyle

Tools:

Discount Calculator

Seller Profit Calculator

22. About Page

Explain that JimatMY helps Malaysian consumers make more informed purchasing decisions using:

Calculators

Comparisons

Guides

Deal discovery

Do not claim the company independently tests every product unless it actually does.

23. Affiliate Disclosure Page

Create a clear disclosure explaining that some links may be affiliate links and JimatMY may receive a commission when purchases are made through eligible links.

Explain that this does not necessarily increase the price paid by the buyer.

Avoid legal guarantees.

24. Disclaimer

State that:

Prices may change

Promotions may expire

Product specifications may change

Marketplace information should be verified before purchase

Calculator results are estimates

25. Privacy Policy

Create a sensible privacy-policy placeholder suitable for an early-stage website.

Include sections for:

Analytics

Cookies

Affiliate links

Advertising

Local storage

Third-party services

Make it easy to update later.

26. Performance

Performance is important.

Optimize for:

Mobile

Slow connections

Core Web Vitals

Lazy-loaded images

Minimal unnecessary JavaScript

Efficient components

Do not use huge animations.

27. Accessibility

Use:

Proper contrast

Accessible forms

Labels

Keyboard navigation

Focus states

Alt text

Large enough tap targets

28. Language

Primary UI language:

Bahasa Melayu

Use natural Malaysian Malay.

Do not translate English technology terms awkwardly when Malaysians commonly use the English term.

Examples:

Use:

Deal
Gaming
Seller
Profit
Voucher

where natural.

29. Responsive Design

The entire platform must work at:

Small Android phones

Large phones

Tablets

Desktop

Mobile should not feel like a shrunken desktop website.

Design mobile layouts intentionally.

30. Data Architecture

Use mock/local structured data initially.

Separate:

UI

Product data

Guide data

Comparison data

Affiliate-link configuration

Make future migration to a database/API straightforward.

31. Code Quality

Create maintainable production-quality code.

Requirements:

Reusable components

Clear folder structure

No unnecessary duplication

No huge monolithic components

Clear variable names

Proper error handling

Clean responsive implementation

Remove unused demo code.

32. Future Android App

Build the website with the expectation that JimatMY may later have an Android application.

Keep:

Navigation

Cards

Tool interfaces

Product structures

consistent enough that they can later inspire the Android UI.

However, do not turn the current website into a fake mobile app.

33. MVP Priority

Prioritize fully working features over large quantities of placeholder pages.

The most important MVP functionality is:

Homepage

Navigation

Discount Calculator

Seller Profit Calculator

Deals

Comparison

Guides

Saved Deals

Basic SEO

Legal/footer pages

Do not add complicated authentication, payment subscriptions, chatbots, AI APIs, or unnecessary backend infrastructure yet.

34. Final Requirement

The finished MVP should make a first-time visitor immediately understand:

What JimatMY does
+
Why it is useful
+
What they can do next

The product should look credible enough to later support:

Organic Google traffic

TikTok traffic

Affiliate monetization

Display advertising

Android app expansion

Build a polished first version rather than only creating mockups.

All interactive elements in the MVP must work.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://jimatmy.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5841aef3-b732-492f-a7e4-c969eb219aa7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
