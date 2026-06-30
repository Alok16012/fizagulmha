import type { Metadata } from 'next';
import Image from 'next/image';

const whatsappNumber = '919171316681';
const orderMessage = encodeURIComponent(
  [
    'Hi Gulemaah, I want to place a custom gift/flower order.',
    '',
    'Occasion:',
    'Date needed:',
    'Budget:',
    'Delivery or pickup:',
    'Preferred colours/theme:',
    'Reference idea/photo:',
    '',
    'Please share available options and pricing.',
  ].join('\n')
);
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${orderMessage}`;
const instagramLink = 'https://www.instagram.com/gulemaah?igsh=MTV5NDl4bGNrYWU4Zg==';
const emailLink =
  'mailto:fiza19khan2@gmail.com?subject=Gulemaah%20Order%20Inquiry&body=Hi%20Gulemaah,%20I%20want%20to%20place%20a%20custom%20order.';

const categories = [
  {
    title: 'Forever Flower Bouquets',
    description: 'Handmade fuzzy wire flowers for birthdays, anniversaries, proposals, and keepsakes.',
  },
  {
    title: 'Custom Gift Hampers',
    description: 'Premium hampers with flowers, jars, mugs, candles, ribbons, and occasion styling.',
  },
  {
    title: 'Personalised Surprises',
    description: 'Share your photo, name, date, colour theme, and budget. We design around your moment.',
  },
];

const occasions = ['Birthday', 'Anniversary', 'Proposal', 'Bridal', 'Return Gifts', 'Festive'];

export const metadata: Metadata = {
  title: 'Gulemaah | Custom Handmade Gifts & Forever Flowers',
  description:
    'Order custom handmade flower bouquets, personalised hampers, and premium gifts from Gulemaah on WhatsApp or Instagram.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#ead4ba] text-[#17100c] md:bg-[#d9bf9f]">
      <div className="mx-auto min-h-screen w-full max-w-[460px] bg-[#f7e6d4] shadow-2xl md:my-6 md:overflow-hidden md:rounded-[28px]">
        <section className="relative overflow-hidden px-5 pb-8 pt-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_2%,rgba(255,255,255,0.72),transparent_38%),radial-gradient(circle_at_88%_18%,rgba(183,137,91,0.22),transparent_34%),linear-gradient(180deg,#f7e6d4_0%,#f2dcc4_100%)]" />
          <div className="relative z-10 flex flex-col items-center px-2 pb-2 pt-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#6c4a32]">Handmade by</p>
            <h1 className="sr-only">Gul-e-Maah</h1>
            <Image
              src="/gulemaah/brand-logo-original.png"
              alt="Gul-e-Maah logo"
              width={475}
              height={375}
              priority
              className="mt-1 h-auto w-[244px] max-w-full object-contain"
            />
          </div>

          <div className="relative z-10 mt-5 overflow-hidden rounded-[8px] border border-[#b88a5f] bg-[#17100c] shadow-[0_20px_48px_rgba(86,55,32,0.2)]">
            <Image
              src="/gulemaah/forever-flower-bouquet.png"
              alt="Handmade forever flower bouquet with gift box"
              width={971}
              height={1619}
              priority
              sizes="(max-width: 768px) 100vw, 460px"
              className="h-[430px] w-full object-cover object-center"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#17100c] via-[#17100c]/82 to-transparent px-4 pb-4 pt-24">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#eac098]">Custom gifts made to order</p>
              <h2 className="mt-2 text-[34px] font-extrabold leading-[0.98] text-white">
                Flowers that stay. Gifts that feel personal.
              </h2>
              <p className="mt-3 max-w-[330px] text-sm leading-6 text-[#f4ddc5]">
                Bouquets, hampers, and occasion surprises crafted for your theme, budget, and date.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-5 grid grid-cols-[1fr_auto] gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="flex h-[52px] items-center justify-center rounded-[8px] bg-[#17100c] px-4 text-sm font-extrabold text-[#f7e6d4] shadow-[0_12px_34px_rgba(23,16,12,0.22)]"
            >
              Order on WhatsApp
            </a>
            <a
              href={instagramLink}
              target="_blank"
              rel="noreferrer"
              aria-label="Open Gulemaah Instagram"
              className="flex h-[52px] w-[52px] items-center justify-center rounded-[8px] border border-[#b88a5f] bg-[#f2dcc4] text-sm font-extrabold text-[#17100c]"
            >
              IG
            </a>
          </div>
        </section>

        <section className="px-5 py-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#8a5b35]">Shop by need</p>
              <h2 className="mt-1 text-2xl font-extrabold text-[#17100c]">What you can order</h2>
            </div>
            <a href={emailLink} className="text-xs font-bold text-[#7c4e2d]">
              Email
            </a>
          </div>

          <div className="mt-4 grid gap-3">
            {categories.map((category, index) => (
              <article key={category.title} className="rounded-[8px] border border-[#d4ab80] bg-[#fff4e8] p-4 shadow-[0_12px_30px_rgba(117,78,45,0.09)]">
                <div className="flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#17100c] text-sm font-extrabold text-[#f7e6d4]">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-extrabold text-[#17100c]">{category.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#6c4a32]">{category.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="px-5 py-5">
          <div className="overflow-hidden rounded-[8px] border border-[#b88a5f] bg-[#fff4e8] shadow-[0_18px_42px_rgba(117,78,45,0.12)]">
            <Image
              src="/gulemaah/custom-gift-hamper.png"
              alt="Custom gift hamper, bouquet, and keepsake jar"
              width={887}
              height={1774}
              sizes="(max-width: 768px) 100vw, 460px"
              className="h-[390px] w-full object-cover object-center"
            />
            <div className="p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#8a5b35]">Premium gifting</p>
              <h2 className="mt-1 text-2xl font-extrabold leading-tight text-[#17100c]">Send a photo, theme, or idea.</h2>
              <p className="mt-2 text-sm leading-6 text-[#6c4a32]">
                We confirm availability, colour palette, delivery/pickup timing, and final price on WhatsApp.
              </p>
            </div>
          </div>
        </section>

        <section className="px-5 py-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#8a5b35]">Occasions</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {occasions.map((occasion) => (
              <span
                key={occasion}
                className="rounded-full border border-[#c99a6a] bg-[#fff4e8] px-4 py-2 text-xs font-bold text-[#17100c]"
              >
                {occasion}
              </span>
            ))}
          </div>
        </section>

        <section className="px-5 py-5">
          <div className="rounded-[8px] border border-[#b88a5f] bg-[#17100c] p-5 text-[#f7e6d4] shadow-[0_18px_42px_rgba(23,16,12,0.18)]">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#eac098]">Order process</p>
            <h2 className="mt-1 text-2xl font-extrabold">3 steps, done.</h2>
            <div className="mt-4 grid gap-3 text-sm font-semibold leading-6 text-[#f4ddc5]">
              <p>1. Send your occasion, date, budget, and reference photo on WhatsApp.</p>
              <p>2. Confirm the colour theme, items, pickup/delivery timing, and final quote.</p>
              <p>3. Once the advance is confirmed, your custom piece goes into making.</p>
            </div>
          </div>
        </section>

        <section className="px-5 pb-28 pt-5">
          <div className="rounded-[8px] border border-[#d4ab80] bg-[#fff4e8] p-5 shadow-[0_12px_30px_rgba(117,78,45,0.09)]">
            <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#8a5b35]">Contact</p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#17100c]">Ready to place an order?</h2>
            <div className="mt-4 grid gap-3 text-sm text-[#6c4a32]">
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="font-bold text-[#7c4e2d]">
                WhatsApp: +91 91713 16681
              </a>
              <a href={instagramLink} target="_blank" rel="noreferrer" className="font-bold text-[#7c4e2d]">
                Instagram: @gulemaah
              </a>
              <a href={emailLink} className="font-bold text-[#7c4e2d]">
                Email: fiza19khan2@gmail.com
              </a>
            </div>
          </div>
        </section>

        <div className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-[460px] border-t border-[#c99a6a] bg-[#f7e6d4]/96 px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 backdrop-blur">
          <div className="grid grid-cols-[1fr_auto] gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="flex h-12 items-center justify-center rounded-[8px] bg-[#17100c] text-sm font-extrabold text-[#f7e6d4]"
            >
              Order Now
            </a>
            <a
              href={instagramLink}
              target="_blank"
              rel="noreferrer"
              aria-label="Open Instagram"
              className="flex h-12 w-12 items-center justify-center rounded-[8px] border border-[#b88a5f] bg-[#fff4e8] text-xs font-extrabold text-[#17100c]"
            >
              IG
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
