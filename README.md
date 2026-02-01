YAPAY ZEKA DESTEKLİ KURUYEMİŞ E-TİCARET
WEB SİTESİ PROJESİ
1. Proje Özeti
Bu proje, İleri Web Programlama dersi kapsamında geliştirilen yapay zeka destekli bir e-ticaret web
sitesidir. Projede, kuruyemiş ürünlerinin çevrim içi satışı hedeflenmiş; kullanıcıların ürünleri kategori,
gramaj ve fiyat bazında seçebileceği, sepete ekleyip çıkarabileceği ve deneme amaçlı sipariş
oluşturabileceği bir sistem tasarlanmıştır.
Web sitesi; kullanıcı arayüzü (frontend), sunucu tarafı (backend), veritabanı yapısı ve yapay zeka destekli
öneri mekanizmasını içermektedir. Sistem tamamen ücretsiz araçlar kullanılarak geliştirilmiş ve yayına
alınabilir durumdadır.
2. Projenin Amacı
Basit ama çalışan bir e-ticaret sistemi geliştirmek
Frontend ve backend yapılarının birlikte çalışmasını göstermek
Veritabanı tasarımı ve kullanımını uygulamalı olarak göstermek
Yapay zekânın e-ticaret sistemlerinde nasıl entegre edilebileceğini göstermek
3. Hedef Kitle
Online alışveriş yapan bireysel kullanıcılar
Kuruyemiş ürünlerini gramaj bazlı satın almak isteyen müşteriler
Küçük ölçekli işletmeler için örnek e-ticaret altyapısı
4. Sistem Mimarisi
4.1 Frontend (Kullanıcı Arayüzü)
Github Sites kullanılarak geliştirilmiştir
Mobil uyumlu ve sade tasarım
Kullanıcıların ürünleri görüntüleyip sepete ekleyebildiği yapı
4.2 Backend (Sunucu Tarafı)
Firebase altyapısı kullanılmıştır
Kullanıcı, ürün, sepet ve sipariş verileri Firebase üzerinden yönetilmektedir
4.3 Veritabanı Yapısı
Users (Kullanıcılar) - userId - ad_soyad - email - telefon - adres
•
•
•
•
•
•
•
•
•
•
•
•
1
Products (Ürünler) - productId - urun_adi - kategori - fiyat_250gr - fiyat_500gr - fiyat_1000gr
Cart (Sepet) - userId - productId - gramaj - adet
Orders (Siparişler) - orderId - userId - urunler - toplam_tutar - siparis_tarihi
5. Ürün Kategorileri
Kuruyemişler (Fındık, Badem, Ceviz)
Kuru Meyveler (Kayısı, İncir)
Karışımlar (Fitness Karışımı, Öğrenci Karışımı)
Her ürün için kullanıcı gramaj seçimi yapabilmekte ve fiyat otomatik olarak değişmektedir.
6. Sepet ve Sipariş Sistemi
Sepete ürün ekleme
Sepetten ürün çıkarma
Adet artırma / azaltma
Toplam tutar hesaplama
Deneme amaçlı sipariş oluşturma
Gerçek ödeme sistemi entegre edilmemiştir. Siparişler simülasyon amaçlıdır.
7. Yapay Zeka Destekli Özellikler
7.1 Akıllı Ürün Öneri Sistemi
Kullanıcının önceki seçimlerine göre benzer ürünler önerilmektedir.
Örnek: - Kullanıcı daha önce tuzsuz badem tercih ettiyse - Sistem, tuzsuz kaju veya fitness karışımı
önermektedir
Bu yapı kural tabanlı algoritma ve yapay zeka destekli metin açıklamaları ile sağlanmıştır.
7.2 Yapay Zeka ile Ürün Açıklaması
Kullanıcının tercihine göre ürün açıklamaları dinamik olarak oluşturulmaktadır.
Örnek: "Bu ürün spor yapan ve sağlıklı beslenmeyi tercih eden kullanıcılar için uygundur."
•
•
•
•
•
•
•
•
2
8. Fizibilite Analizi
8.1 Teknik Fizibilite
Kullanılan teknolojiler ücretsizdir
Sistem düşük donanım gereksinimine sahiptir
8.2 Ekonomik Fizibilite
Hosting maliyeti: 0 TL
Veritabanı maliyeti: 0 TL
Yapay zeka entegrasyonu: Ücretsiz servisler
8.3 Sürdürülebilirlik
Sistem daha sonra gerçek ödeme altyapısı ile genişletilebilir
Ürün sayısı artırılabilir
Gerçek AI modelleri entegre edilebilir
9. Sonuç
Bu projede, yapay zeka destekli bir e-ticaret web sitesinin temel bileşenleri başarıyla uygulanmıştır.
Proje; frontend, backend, veritabanı ve yapay zeka kavramlarını birlikte içeren, çalışabilir ve
geliştirilebilir bir örnek sunmaktadır.
Akademik gereksinimleri karşılayan bu sistem, gerçek hayatta da uygulanabilecek bir altyapıya sahiptir.
10. Kaynakça
Github sites
Firebase Resmi Dokümantasyonu
Yapay Zeka ve E-Ticaret Uygulamaları
•
•
•
•
•
•
•
•
•
•
•
3
