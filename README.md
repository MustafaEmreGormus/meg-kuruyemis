PROJE RAPORU: 
MEG KURUYEMİŞ E-TİCARET PLATFORMU
1. Proje Özeti
Bu proje, geleneksel kuruyemiş satışını modern web teknolojileri ve yapay zeka destekli özelliklerle birleştiren, tam kapsamlı bir e-ticaret web uygulamasıdır. Proje, kullanıcı dostu bir arayüz (Frontend) ile gerçek zamanlı bir veritabanı yönetimini (Backend) entegre etmektedir.
2. Kullanılan Teknolojiler
2.1. Frontend (Önyüz)
 * HTML5 & CSS3: Semantik yapı ve mobil uyumlu (Responsive) tasarım için kullanıldı.
 * JavaScript (ES6+): Sayfa içi dinamik etkileşimler, sepet yönetimi ve filtreleme işlemleri için kullanıldı.
 * Fuse.js: AI tabanlı arama motoru özelliği için entegre edildi. Bu sayede yazım hataları olsa dahi (Fuzzy Search) doğru ürünlerin bulunması sağlandı.
2.2. Backend (Arkayüz) & Veritabanı
 * Firebase Cloud Firestore: NoSQL tabanlı, bulut üzerinde çalışan veritabanı.
 * Real-time Listener (onSnapshot): Veritabanındaki herhangi bir veri değişikliğinin (fiyat güncellemesi vb.) kullanıcı tarafında sayfayı yenilemeden anlık olarak görünmesi sağlandı.
 * Firebase Hosting: Projenin tüm dünyadan erişilebilir olması için GitHub ile entegre bir şekilde canlıya alındı.
3. Temel Özellikler
3.1. Akıllı Ürün Yönetimi
Veritabanında her ürün; ad, kgFiyat, eskiFiyat, kategori ve resim gibi teknik alanlarla tanımlanmıştır. Dinamik yapı sayesinde yönetici panelinden eklenen her yeni ürün anında vitrinde yerini alır.
3.2. AI Destekli Arama ve Danışman
 * Akıllı Arama: Kullanıcı "Kaju" yerine "Kaj" yazsa bile AI algoritması en yakın sonucu bulup listeler.
 * AI Danışman: Kullanıcının ihtiyaçlarına (diyet, enerji, tatlı isteği) göre uygun ürünleri öneren bir algoritma kurgulanmıştır.
3.3. Dinamik Sepet ve Kategori Sistemi
 * Ürünler arasında "Kuruyemiş" ve "Şekerleme" gibi kategorilere göre hızlı geçiş yapılabilir.
 * Sepete eklenen ürünler toplam fiyatı anlık günceller.
 * Hatalı eklemeler için "Sepetten Çıkar" fonksiyonu aktiftir.
4. Güvenlik ve Mimari
 * Firestore Güvenlik Kuralları: Veritabanına yetkisiz erişimi engellemek için zaman damgalı ve izin tabanlı güvenlik kuralları (rules) tanımlanmıştır.
 * Mobil Öncelikli Tasarım: Uygulama, hem masaüstü hem de mobil cihazlarda (tablet, telefon) kusursuz görünecek şekilde CSS Media Queries ile optimize edilmiştir.
5. Kurulum ve Yayınlama (GitHub)
Proje, GitHub üzerinden versiyon kontrol sistemiyle yönetilmektedir. Kod yapısı; modüler scriptler, merkezi CSS ve Firebase bağlantı konfigürasyonları şeklinde organize edilmiştir.
6. Proje Çıktıları ve Sonuç
Bu çalışma sonucunda;
 * Gerçek zamanlı veri akışı sağlayan,
 * Yapay zeka asistanı ile kullanıcı deneyimini artıran,
 * Profesyonel bir kullanıcı giriş ve kayıt paneli sunan,
 * Modern bir e-ticaret altyapısı başarıyla kurulmuştur.

"Teknik Detay"
> " Projemin en güçlü yanı Firebase onSnapshot teknolojisidir. Veritabanında bir fiyat değiştiğinde, binlerce kilometredeki kullanıcı hiçbir işlem yapmadan o değişimi ekranında görür. Bu, modern bulut mimarisinin en üst seviye kullanımıdır."
> 
