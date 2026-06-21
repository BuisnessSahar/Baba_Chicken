# באבא עוף — אתר מסעדה רשמי

אתר סטטי מקצועי למסעדת **באבא עוף — גריל ישראלי אמיתי**, חולון.
האתר בנוי בעברית מלאה, RTL מלא, ומותאם לכל המכשירים.

---

## מבנה הפרויקט

```
BAGEOT-I/
├── index.html              # עמוד ראשי — כל הסקשנים
├── css/
│   └── style.css           # עיצוב מלא
├── js/
│   └── script.js           # לוגיקה, סינון, טופס
├── assets/
│   └── images/
│       ├── logo.png         # לוגו המסעדה (עגול עם תרנגול)
│       ├── hero-bg.jpg      # תמונת רקע הירו — יש להוסיף
│       ├── menu-food.jpg    # תמונה כללית לכרטיסי תפריט
│       └── ...              # תמונות נוספות לפי צורך
├── sitemap.xml              # מפת אתר לגוגל
├── robots.txt               # הנחיות לסורקי גוגל
└── README.md                # קובץ זה
```

---

## הפעלה מקומית

1. הורידו את כל הקבצים לתיקייה אחת.
2. פתחו את הקובץ `index.html` בדפדפן (Chrome / Firefox / Edge).
3. האתר יעבוד מיד ללא שרת.

---

## העלאה ל-GitHub

```bash
git init
git add .
git commit -m "אתר באבא עוף — גרסה ראשונה"
git branch -M main
git remote add origin https://github.com/USERNAME/REPOSITORY-NAME.git
git push -u origin main
```

---

## פריסה עם GitHub Pages

1. היכנסו לדף ה-Repository ב-GitHub.
2. לחצו על **Settings** → **Pages**.
3. בחרו Branch: `main`, Folder: `/ (root)`.
4. לחצו **Save**.
5. תוך דקה–שתיים יהיה כתובת:
   `https://USERNAME.github.io/REPOSITORY-NAME/`

---

## פריסה עם Netlify

1. גשו ל-[netlify.com](https://netlify.com) והתחברו.
2. לחצו **Add new site → Import an existing project**.
3. חברו את ה-GitHub Repository.
4. לחצו **Deploy site**.

---

## פריסה עם Vercel

1. גשו ל-[vercel.com](https://vercel.com).
2. לחצו **New Project** → ייבאו מ-GitHub.
3. לחצו **Deploy**.

---

## היכן להחליף פרטים

### טלפון
- `index.html` — חפשו `03-505-1212` (7 מקומות)
- `js/script.js` — אין טלפון

### מספר וואטסאפ
- `index.html` — חפשו `97235051212` — החליפו בפורמט: `972` + מספר ללא אפס

### כתובת
- `index.html` — חפשו `התנאים 5, חולון`
- `index.html` → JSON-LD → `streetAddress` ו-`addressLocality`

### שעות פעילות
- `index.html` — סקשן `contact` ו-`footer`
- `index.html` → JSON-LD → `openingHoursSpecification`

### לוגו
- שמרו את קובץ הלוגו בשם `assets/images/logo.png`
- הלוגו מוצג ב-Header ו-Footer

### תמונת הירו (רקע)
- שמרו תמונת אוכל/מסעדה בשם `assets/images/hero-bg.jpg`

### תמונות תפריט
- שמרו תמונות אוכל ספציפיות ועדכנו את ה-`src` בכרטיסי התפריט

### מחירים ומנות
- `index.html` — חפשו `מחיר יעודכן בהמשך` ועדכנו

### ביקורות
- `index.html` — סקשן `reviews` — ניתן לעדכן טקסטים

### קישור כתיבת ביקורת בגוגל
- `index.html` — חפשו `g.co/kgs/babaof` — החליפו בקישור האמיתי

### קישור Google Maps (iframe)
- `index.html` — סקשן `contact` — החליפו את ה-`src` של ה-iframe

### URL קנוניקלי ו-Open Graph
- `index.html` — חפשו `USERNAME.github.io/REPOSITORY-NAME` — החליפו ב-URL הסופי
- `sitemap.xml` — עדכנו את ה-`<loc>`
- `robots.txt` — עדכנו את שורת `Sitemap:`

---

## חיבור האתר לגוגל ול-Google Maps

לאחר שהאתר חי, בצעו את השלבים הבאים:

1. **העלו את האתר** ל-GitHub Pages (או Netlify/Vercel).
2. **העתיקו את כתובת האתר הסופית** (למשל `https://USERNAME.github.io/babaof/`).
3. **היכנסו ל-[Google Business Profile](https://business.google.com)** של באבא עוף.
4. **הוסיפו את כתובת האתר** בשדה "אתר" בפרופיל העסק.
5. **העתיקו את קישור Google Maps** של המסעדה והחליפו את ה-iframe בסקשן "צור קשר".
6. **היכנסו ל-[Google Search Console](https://search.google.com/search-console)**.
7. **הוסיפו את האתר** כנכס חדש (URL Prefix).
8. **אמתו בעלות** — השיטה הקלה ביותר היא דרך Google Analytics או HTML tag.
9. **שלחו את sitemap.xml** — בתפריט Search Console → Sitemaps → הדביקו `sitemap.xml`.
10. **השתמשו ב-URL Inspection** ובקשו אינדוקס לעמוד הראשי.

---

## קבצי SEO שנוצרו

| קובץ | תיאור |
|------|-------|
| `index.html` | Title, Description, OG tags, Twitter tags, JSON-LD |
| `sitemap.xml` | מפת אתר לגוגל |
| `robots.txt` | הנחיות לסורקים |

---

## הפעלה מהירה

פתחו `index.html` בדפדפן — האתר יעבוד מיד.
