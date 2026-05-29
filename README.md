# Tbilisi Style 21 — UX Mockup

> სტატიკური HTML/CSS/JS demo, რომელიც აჩვენებს გასწორებულ ვერსიას
> დაფუძნებულია 4 ანალიზის დოკუმენტზე
> ფრემვორკის გარეშე — pure HTML/CSS/Vanilla JS

## როგორ გავხსნათ

**ვარიანტი 1 — პირდაპირ ფაილიდან:**
ორჯერ დააწერეთ [index.html](index.html)-ს. ბრაუზერი გახსნის. სურათები იტვირთება `../public/`-დან relative path-ით.

**ვარიანტი 2 — Local server (რეკომენდირებული):**
```bash
cd mockup
npx serve .          # ან: python -m http.server 8000
```

## სტრუქტურა

```
mockup/
├── index.html       # ერთი გვერდი — სრული demo
├── css/style.css    # ყველა სტილი
├── js/main.js       # countdown, drawer, filter, modal, validation
└── README.md
```

## რა გასწორდა — 16 პრობლემა → 16 FIX

ყოველი FIX მონიშნულია HTML-ში comment-ით (`<!-- FIX #N -->`).

### სიგნალური ფაილებიდან მოტანილი ცვლილებები

| # | პრობლემა (დოკიდან) | სად მუშავდება demo-ში |
|---|---|---|
| 1 | Featured banner არ არსებობდა | `<div class="banner">` — Early Bird შეტყობინება |
| 2 | Desktop-ზე მხოლოდ ჰამბურგერი | `nav-desktop` + drawer mobile-ზე |
| 3 | Hero მხოლოდ "ENTER" — თარიღი/ლოკაცია/CTA არ ჩანდა | Hero-ში თარიღი + ლოკაცია + ფასი + 2 CTA |
| 4 | Countdown არ არსებობდა | ცოცხალი countdown (`initCountdown()`) |
| 5 | Stats / social proof არ ჩანდა | "60+ artists / 4 stages / 3 days / 30K capacity" |
| 6 | UPPERCASE wall-ი ტექსტებში | Lowercase body, drop-cap პირველ ასოზე |
| 7 | Lineup — სტატიკური poster | Interactive day filter (All/Day 1/Day 2/Day 3/Rave) |
| 8 | Stages — overview არ არსებობდა | 4 visual card-ი ერთ გვერდზე |
| 9 | Ticket cards-ი ფოტოს გარეშე, urgency-ის გარეშე | სურათი, badge, progress bar, "112 left" |
| 10 | Food zone — ერთი დიდი uppercase ბლოკი | Drop-cap + ჩიპები (Vegan/Late-night/Card) |
| 11 | "Plan Your Visit" არ არსებობდა | 4 ბარათი: Map / Transport / Hotels / What to Bring |
| 12 | FAQ არ არსებობდა | 6 კითხვის accordion |
| 13 | Newsletter არ არსებობდა | "Get lineup updates" form |
| 14 | Footer არ არსებობდა | 4 სვეტი + სოც.ბმულები + payment ლოგო |
| 15 | Mobile-ზე sticky "Buy" არ ჩანდა | Bottom bar: "From 80 ₾ — Buy Now" |
| 16 | Modal-ი — Order Summary, T&C, validation hints, loading | სრულად აწყობილია (იხ. ქვემოთ) |

### Buy Modal-ის გასწორებები (ბილეთის გადახდის ფლოუ)

| რა გასწორდა | სად სცადო demo-ში |
|---|---|
| **Order Summary** გადახდამდე | "Buy" → Modal-ის ზევით ცხრილია — Ticket / Date / Quantity / Total |
| **Latin-only filter + visible hint** | Name-ში ჩაწერე "გიორგი" → წითელი hint გამოჩნდება "Latin letters only" |
| **Personal Number — digits only + 11 check** | Numeric keyboard mobile-ზე, ცოცხლი counter "5/11 digits" → "✓ Valid" |
| **Email typo detection** | "test@gmial.com" → "Did you mean gmail.com?" link-ი |
| **Email format real-time validation** | Valid → "✓ Looks good" success state |
| **Terms & Conditions checkbox** | სავალდებულოა გაიაროს |
| **Multi-stage loading feedback** | Submit → "Checking your details…" → "Reserving your ticket…" → "Redirecting to payment…" |
| **Same-tab redirect (toast შეტყობინება)** | Toast: "In production: redirecting to secure payment (same tab)" |
| **Trust note** | "🔒 Secure 3DS payment by Quipu · No card data stored" |

## ტესტისთვის — გაიარეთ ეს ფლოუ

### ფლოუ 1: სრული გვერდი
1. გახსენი [index.html](index.html)
2. დააჭირე countdown — რეალურ დროში ცოცხალია (target: 27.08.2027)
3. სქროლი ↓ — fade-in ანიმაცია სექციებზე
4. Lineup ფილტრს გაუსვი — Day 1 / Day 2 / Day 3 / Rave
5. FAQ კითხვებზე დააჭირე — accordion ხსნება
6. Newsletter-ში "test" შეიყვანე → toast: "Please enter a valid email"
7. Mobile resize-ი → ქვევით sticky bar გამოჩნდება

### ფლოუ 2: ბილეთის შეძენა (UX fixes)
1. სქროლი "Tickets" სექციამდე
2. "Buy Day Pass" დააჭირე → Modal იხსნება
3. Name ველში ცადე **"გიორგი"** → წითელი hint "Latin letters only"
4. Name = "Giorgi", Surname = "Beridze"
5. Personal Number ცადე **"abc"** → ვერაფერი ემართება
6. ცადე **"12345"** → counter "5/11 digits"
7. ცადე **"01001012345"** → "✓ Valid format" (green)
8. Email ცადე **"test@gmial.com"** → "Did you mean gmail.com?" → click → corrected
9. T&C checkbox-ის გარეშე submit → toast "Please accept the Terms & Conditions"
10. T&C ✓ → Submit → ღილაკი ეტაპობრივად იცვლება:
    - "Checking your details…"
    - "Reserving your ticket…"
    - "Redirecting to payment…"
11. Toast: "✓ In production: redirecting to secure payment (same tab)"

### ფლოუ 3: ნავიგაცია
1. Desktop-ზე (>1024px): Top header tabs ჩანს
2. Mobile-ზე: ჰამბურგერი → drawer ჯგუფირებული
3. Drawer-ში 5 ჯგუფი: Language / Festival / Music / Experience / Plan Your Visit
4. ენის გადართვა: EN/KA/RU/UA (visual only demo-ში)

## რა არ არის demo-ში (გამორჩენილია)

- რეალური backend (Quipu, MongoDB)
- რეალური PDF + email
- რეალური Spotify embed (placeholder ფოტოები)
- ენების switching რეალურად (UI კი ჩანს)
- რეალური ფავორიტი DJ-ის "Add to schedule"
- რეალური map (placeholder)
- სრული 60 DJ-ის სია (12 sample)

## ფაილების მონაცემები

- **HTML:** 1 ფაილი, ~620 ხაზი
- **CSS:** ~960 ხაზი, CSS variables-ით, mobile-first
- **JS:** ~220 ხაზი, vanilla, ფრემვორკის გარეშე
- **Dependencies:** 0 — მხოლოდ Google Fonts (Inter + Noto Sans Georgian)
- **Images:** referenced from `../public/images/` (existing project assets)

## ბრაუზერის თავსებადობა

- Chrome / Edge / Safari / Firefox — recent versions ✅
- IE11 — არ არის სამიზნე (modern CSS variables, IntersectionObserver)
- Mobile Safari / Chrome Android — ✅ tested viewport meta

## შემდეგი ნაბიჯი (თუ აიღო რეალურ პროექტში)

1. ეს HTML/CSS გადააქცე **React/Next.js კომპონენტებად** არსებულ კოდბაზაში
2. სტატიკური ტექსტი → `messages/*.json` (translations)
3. სტატიკური ლაინაფი → MongoDB collection (`artists`)
4. სტატიკური ticket data → ახლა გაქვს admin panel-ში
5. Modal-ის ლოგიკა → `BuyTicketModal.tsx`-ში გადაიტანე გასწორებებით
6. `window.location.href` Quipu redirect-ისთვის (არა `window.open`)

ანალიზის სრული დოკუმენტი იხ:
- [PROJECT_ANALYSIS.md](../PROJECT_ANALYSIS.md)
- [ADMIN_PANEL_DOC.md](../ADMIN_PANEL_DOC.md)
- [FRONTEND_REVIEW.md](../FRONTEND_REVIEW.md)
- [TICKET_FLOW_REVIEW.md](../TICKET_FLOW_REVIEW.md)
#   m o c k u p  
 