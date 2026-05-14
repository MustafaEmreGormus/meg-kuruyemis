const firebaseConfig = {
        apiKey: "AIzaSy...", 
        authDomain: "meg-kuruyemis.firebaseapp.com",
        projectId: "meg-kuruyemis",
        storageBucket: "meg-kuruyemis.appspot.com",
        messagingSenderId: "...",
        appId: "..."
    };

    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    let sepet = [];
    let toplam = 0;
    let aktifKullanici = null;

    function urunleriYukle() {
        const urunKutusu = document.getElementById("urun-kutusu");
        db.collection("urunler").onSnapshot((querySnapshot) => {
            urunKutusu.innerHTML = "";
            querySnapshot.forEach((doc) => {
                const urun = doc.data();
                const id = doc.id;
                const stokVarMi = urun.stok > 0;
                const urunResmi = urun.resim ? urun.resim : `https://via.placeholder.com/300x300?text=${urun.ad}`;

                urunKutusu.innerHTML += `
                    <div class="urun-karti" data-kategori="${urun.kategori}">
                        <img src="${urunResmi}" alt="${urun.ad}">
                        <h3>${urun.ad}</h3>
                        <p style="font-size:0.9em;">Stok: ${urun.stok || 0} Adet</p>
                        <select id="gramaj-${id}" onchange="fiyatHesapla('${id}', ${urun.kgFiyat})" class="gramaj-secici">
                            <option value="0.25">250 gr</option>
                            <option value="0.5">500 gr</option>
                            <option value="1">1 kg</option>
                        </select>
                        <p id="fiyat-gosterge-${id}" style="font-size:1.3em; font-weight:bold;">
                            ${(urun.kgFiyat * 0.25).toFixed(2)} TL
                        </p>
                        <button class="btn-ekle" ${stokVarMi ? '' : 'disabled'} onclick="sepeteEkleDinamik('${id}', '${urun.ad}')">
                            ${stokVarMi ? 'Sepete Ekle' : 'Stokta Yok'}
                        </button>
                    </div>`;
            });
        });
    }

    function fiyatHesapla(id, kgFiyat) {
        const oran = document.getElementById(`gramaj-${id}`).value;
        const sonuc = (kgFiyat * oran).toFixed(2);
        document.getElementById(`fiyat-gosterge-${id}`).innerText = sonuc + " TL";
    }

    function sepeteEkleDinamik(id, ad) {
        const liste = document.getElementById(`gramaj-${id}`);
        const gramajMetni = liste.options[liste.selectedIndex].text;
        const anlikFiyat = parseFloat(document.getElementById(`fiyat-gosterge-${id}`).innerText);

        sepet.push({ id: id, ad: ad + " (" + gramajMetni + ")", fiyat: anlikFiyat, miktar: 1 });
        toplam += anlikFiyat;
        guncelle();
    }

    function guncelle() {
        const liste = document.getElementById('sepet-listesi');
        const adresAlani = document.getElementById('adres-alani');
        
        if(sepet.length === 0) {
            liste.innerHTML = "<li>Sepetiniz boş.</li>";
            adresAlani.style.display = "none";
        } else {
            adresAlani.style.display = "block";
            liste.innerHTML = sepet.map((i, index) => `
                <li>${i.ad} - ${i.fiyat.toFixed(2)} TL 
                <button class="btn-cikar" onclick="sepettenCikar(${index})">x</button></li>`).join('');
        }
        document.getElementById('toplam-fiyat').innerText = toplam.toFixed(2);
    }

    function sepettenCikar(index) {
        toplam -= sepet[index].fiyat;
        sepet.splice(index, 1);
        guncelle();
    }

    async function stokGuncelleVeGonder() {
        const adres = document.getElementById('musteri-adres').value;
        if (sepet.length === 0) { alert("Sepetiniz boş!"); return; }
        if (!adres || adres.trim().length < 10) { alert("Lütfen geçerli bir adres giriniz."); return; }

        try {
            // İADE TAKİBİ İÇİN: Sipariş verileri
            const siparisVerileri = {
                tarih: new Date(),
                urunler: sepet,
                toplamTutar: toplam,
                adres: adres,
                durum: "tamamlandi",
                musteriEposta: aktifKullanici ? aktifKullanici.eposta : "misafir"
            };

            for (let urun of sepet) {
                const urunRef = db.collection("urunler").doc(urun.id);
                await db.runTransaction(async (transaction) => {
                    const sfDoc = await transaction.get(urunRef);
                    const yeniStok = sfDoc.data().stok - urun.miktar;
                    if (yeniStok < 0) throw urun.ad + " için stok yetersiz!";
                    transaction.update(urunRef, { stok: yeniStok });
                });
            }

            await db.collection("siparisler").add(siparisVerileri);
            whatsappSiparisiGonder(adres);
        } catch (error) {
            alert("Hata oluştu: " + error);
        }
    }

    function whatsappSiparisiGonder(adres) {
        let urunMetni = "";
        sepet.forEach((urun, index) => {
            urunMetni += `${index + 1}. ${urun.ad} - ${urun.fiyat.toFixed(2)} TL%0A`;
        });
        const toplamFiyat = document.getElementById('toplam-fiyat').innerText;
        const telNo = "905052464244"; 
        const mesaj = `*YENİ SİPARİŞ (MEG KURUYEMİŞ)*%0A%0A*Ürünler:*%0A${urunMetni}%0A*Toplam Tutar:* ${toplamFiyat} TL%0A%0A*Teslimat Adresi:*%0A${adres}`;
        window.open(`https://api.whatsapp.com/send?phone=${telNo}&text=${mesaj}`, '_blank');
        sepet = []; toplam = 0; guncelle();
    }

    // --- PROFİL VE SİPARİŞ GEÇMİŞİ ---

    function panelAc(tip) {
        const panel = document.getElementById("panelIcerik");
        if(tip === 'giris') {
            panel.innerHTML = `
                <h3>Giriş</h3>
                <div class="input-grubu"><input type="text" id="giris-email" placeholder="E-posta"></div>
                <div class="input-grubu"><input type="password" id="giris-sifre" placeholder="Şifre"></div>
                <button class="giris-btn" onclick="sistemeGirisYap()">GİRİŞ</button>`;
        } else if (tip === 'profil') {
            panel.innerHTML = `
                <h3>Hoş geldin, ${aktifKullanici.adSoyad}</h3>
                <hr>
                <h4>Sipariş Geçmişim</h4>
                <div id="siparis-listesi">Yükleniyor...</div>
                <button class="giris-btn" onclick="cikisYap()" style="background:red;">ÇIKIŞ YAP</button>`;
            siparisleriYukle();
        } else {
            panel.innerHTML = `
                <h3>Kayıt Ol</h3>
                <div class="input-grubu"><input type="text" id="kayit-ad" placeholder="Ad Soyad"></div>
                <div class="input-grubu"><input type="email" id="kayit-email" placeholder="E-posta"></div>
                <div class="input-grubu"><input type="password" id="kayit-sifre" placeholder="Şifre"></div>
                <button class="giris-btn" onclick="musteriKaydet()" style="background:green;">KAYDET</button>`;
        }
        document.getElementById("yanPanel").style.width = "350px";
    }

    function sistemeGirisYap() {
        const email = document.getElementById('giris-email').value;
        const sifre = document.getElementById('giris-sifre').value;

        db.collection("musteriler")
            .where("eposta", "==", email)
            .where("sifre", "==", sifre)
            .get()
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    aktifKullanici = querySnapshot.docs[0].data();
                    alert("Giriş Başarılı!");
                    document.getElementById('kullanici-alani').innerHTML = `
                        <button onclick="panelAc('profil')" style="background:none; border:none; cursor:pointer; font-size:1.1em;">👤 Profilim</button>`;
                    panelKapat();
                } else {
                    alert("Hatalı bilgiler!");
                }
            });
    }

    function siparisleriYukle() {
        const listeDiv = document.getElementById("siparis-listesi");
        db.collection("siparisler")
            .where("musteriEposta", "==", aktifKullanici.eposta)
            .get()
            .then((querySnapshot) => {
                listeDiv.innerHTML = "";
                if(querySnapshot.empty) { listeDiv.innerHTML = "Sipariş bulunamadı."; return; }
                querySnapshot.forEach((doc) => {
                    const s = doc.data();
                    const id = doc.id;
                    const tarih = s.tarih.toDate().toLocaleDateString();
                    listeDiv.innerHTML += `
                        <div class="siparis-kart">
                            <b>Tarih:</b> ${tarih} <br>
                            <b>Tutar:</b> ${s.toplamTutar} TL <br>
                            <b>Durum:</b> ${s.durum} <br>
                            ${s.durum === 'tamamlandi' ? `<button onclick="urunIadeEt('${id}', '${s.urunler[0].id}', 1)" style="margin-top:5px; background:orange; color:white; border:none; padding:5px; border-radius:5px; cursor:pointer;">İade Et</button>` : ''}
                        </div>`;
                });
            });
    }

    async function urunIadeEt(siparisId, urunId, miktar) {
        if (!confirm("Ürünü iade edip stoğa eklemek istiyor musunuz?")) return;
        try {
            const urunRef = db.collection("urunler").doc(urunId);
            const siparisRef = db.collection("siparisler").doc(siparisId);

            await db.runTransaction(async (transaction) => {
                const urunDoc = await transaction.get(urunRef);
                const yeniStok = urunDoc.data().stok + miktar; // Stoğu geri ekle
                transaction.update(urunRef, { stok: yeniStok });
                transaction.update(siparisRef, { durum: "iade_edildi" });
            });
            alert("İade başarılı!");
            siparisleriYukle();
        } catch (e) { alert("Hata: " + e); }
    }

    function cikisYap() {
        aktifKullanici = null;
        document.getElementById('kullanici-alani').innerHTML = `
            <button onclick="panelAc('giris')" style="background:none; border:none; cursor:pointer; font-size:1.1em;">👤 Giriş Yap</button> | 
            <button onclick="panelAc('kayit')" style="background:none; border:none; cursor:pointer; font-size:1.1em;">📝 Kayıt Ol</button>`;
        panelKapat();
    }

    function musteriKaydet() {
        const ad = document.getElementById('kayit-ad').value;
        const mail = document.getElementById('kayit-email').value;
        const sifre = document.getElementById('kayit-sifre').value;
        db.collection("musteriler").add({ adSoyad: ad, eposta: mail, sifre: sifre, tarih: new Date() })
            .then(() => { alert("Kayıt Başarılı!"); panelAc('giris'); });
    }

    function panelKapat() { document.getElementById("yanPanel").style.width = "0"; }
    function filtrele(k) {
        document.querySelectorAll('.urun-karti').forEach(kart => {
            kart.style.display = (k === 'hepsi' || kart.dataset.kategori === k) ? 'block' : 'none';
        });
    }

    function aiAra() {
        const terim = document.getElementById('ai-arama').value;
        const kartlar = document.querySelectorAll('.urun-karti');
        const veriler = Array.from(kartlar).map((k, i) => ({ id: i, ad: k.querySelector('h3').innerText }));
        if(!terim) { filtrele('hepsi'); return; }
        const fuse = new Fuse(veriler, { keys: ['ad'], threshold: 0.4 });
        const sonuc = fuse.search(terim).map(s => s.item.id);
        kartlar.forEach((k, i) => k.style.display = sonuc.includes(i) ? 'block' : 'none');
    }

    function aiDanis() {
        const soru = document.getElementById('ai-soru').value.toLowerCase();
        let cevap = "Şu an en taze ürünümüz Antep Fıstığı!";
        if(soru.includes("diyet")) cevap = "Diyet için Çiğ Badem öneririm!";
        document.getElementById('ai-cevap').innerText = cevap;
    }

    window.onload = urunleriYukle;