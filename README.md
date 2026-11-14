# ZOMEN

موقع ثابت (HTML + CSS + JavaScript فقط، بدون أي Framework أو أدوات بناء) لبيع دورات ZOMEN البرمجية. يعمل بفتح `index.html` مباشرة من أي جهاز، وجاهز للرفع على GitHub Pages.

## هيكل المشروع

```
/
├── index.html                  الصفحة الرئيسية
├── 404.html                    صفحة الخطأ
├── courses/                    صفحات الدورات الخمس
│   ├── cpp-fundamentals.html
│   ├── cpp-oop.html
│   ├── java-fundamentals.html
│   ├── java-oop.html
│   └── python-fundamentals.html
├── assets/
│   ├── css/
│   │   ├── tokens.css          الألوان والخطوط والمسافات (CSS Variables)
│   │   ├── base.css            إعادة تهيئة + RTL + Typography
│   │   ├── components.css      المكونات المشتركة (navbar, footer, buttons, cards...)
│   │   └── pages.css           تنسيقات خاصة بتخطيط الصفحات
│   ├── js/
│   │   ├── config.js           كل الإعدادات القابلة للتغيير (الأسعار، الروابط، تاريخ العرض)
│   │   └── main.js             السلوك التفاعلي (Accordion, Sticky bar, Reveal...)
│   └── images/
│       ├── feedback/           صور آراء الطلاب (feedback-01.jpg … feedback-13.jpg)
│       ├── favicon.svg
│       └── og-image.png
├── .nojekyll
└── .gitignore
```

## كيف تُعدّل الأسعار وتاريخ العرض

كل الإعدادات القابلة للتغيير موجودة في ملف واحد: [`assets/js/config.js`](assets/js/config.js).

- **تاريخ انتهاء العرض:** غيّر قيمة `offerEndDate`. بعد هذا التاريخ تختفي الشارة والسعر القديم تلقائياً من كل الصفحات بدون أي تعديل إضافي.
- **رابط إنستغرام:** غيّر قيمة `instagramLink`، وكل أزرار "سجّل الآن" و"تواصل معنا" في الموقع ستُحدَّث تلقائياً.
- **الأسعار:** كل دورة لها سعر قديم وجديد بالدينار والدولار داخل كائن `courses`.

> ملاحظة: الأسعار المكتوبة داخل كل صفحة HTML هي قيم fallback تظهر فقط إذا تعطّل JavaScript. إذا غيّرت سعراً في `config.js`، عدّل نفس الرقم يدوياً داخل كروت الأسعار في الصفحات (`index.html` وصفحة الدورة المعنية) حتى تبقى متطابقة.

## كيف تُستبدل صور آراء الطلاب

الصور موجودة في `assets/images/feedback/` بأسماء `feedback-01.jpg` إلى `feedback-08.jpg`. لاستبدال أي واحدة منها:

1. جهّز لقطة الشاشة (Screenshot) الجديدة لرسالة الطالب.
2. احفظها بنفس الاسم (مثلاً `feedback-03.jpg`) في نفس المجلد لتحل محل القديمة تلقائياً، أو غيّر مسار الصورة داخل `index.html` وصفحات الدورات إذا استخدمت اسماً مختلفاً.

## خطوات الرفع على GitHub Pages

1. أنشئ مستودع (Repository) جديد على GitHub.
2. من داخل مجلد المشروع، نفّذ:
   ```bash
   git init
   git add .
   git commit -m "ZOMEN website"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO-NAME.git
   git push -u origin main
   ```
3. من إعدادات المستودع على GitHub: **Settings → Pages → Build and deployment → Source** اختر **Deploy from a branch**، ثم اختر الفرع `main` والمجلد `/ (root)`.
4. بعد بضع دقائق سيكون الموقع متاحاً على:
   ```
   https://USERNAME.github.io/REPO-NAME/
   ```

كل المسارات في الموقع نسبية، لذلك يعمل بشكل صحيح سواء فتحته محلياً أو على رابط فرعي مثل الرابط أعلاه.
