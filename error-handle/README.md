# Learning:
- **Handle error**
- **Fetch api**
### 1. Handle error
នេះត្រូវបានសិក្សាអំពី យល់ពីរបៀបប្រើ error.tsx ជា Error Boundary ក្នុង Next.js។ 

[docs about error.tsx](https://docs.google.com/document/d/1eMEaS6JZuQdHol9UaJZz-lErJ3kO8-1ounvz4P65fSI/edit?tab=t.0)
---
### 2. Sarch 
-  **បង្កើត API route**
- **fetch data**: វាត្រូវបាន fetch data ជាមួយ url api route
- **filter+includes**: method នេះដើម្បីស្វែងរកទិន្ន័យពី data ដែលមានមន្ទិចបន្ទួចក៏បង្ហាញដែរ
- **debounce**: ប្រើដើម្បីទប់ការ search នៅពេលកំពុងសេរសេរ ដោយប្រើ 1000 milliseconds។ 
- **Proms search**: នៅពេលការបញ្ចូលពាក្យនៅក្នុង input ទទេរគឺ clear ទិន្ន័យដោយប្រើ !e.trim()
- **error**: ប្រើបញ្ហាញ error នៅពេល api មានបញ្ហា ដោយប្រើជាមួយ try/catch method.
### image demo
![alt](/public/searchDic.jpg)
