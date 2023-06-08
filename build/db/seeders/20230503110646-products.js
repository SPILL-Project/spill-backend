'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */


      await queryInterface.bulkInsert('Products', 
      [
        {
          judul: 'PROMO TERLARIS SCARLETT WHITENING BODY LOTION - FANTASIA |CHARMING |JOLLY | FRESHY | ROMANSA | HANDBODY SCARLET WHITENING ORGINAL',
          gambar: 'https://down-id.img.susercontent.com/file/id-11134207-23020-nh7fddepblnvc1_tn',
          harga: 14000,
          link: 'https://shopee.co.id/PROMO-TERLARIS-SCARLETT-WHITENING-BODY-LOTION-FANTASIA-CHARMING-JOLLY-FRESHY-ROMANSA-HANDBODY-SCARLET-WHITENING-ORGINAL-i.363734095.23822434305?sp_atk=046a35e5-4ead-4d91-8415-d925dd4bed39&xptdk=046a35e5-4ead-4d91-8415-d925dd4bed39',
          terjual:  '10RB+ Terjual',
        },
        {
          judul: "dijaketan [ COD ] Switer Sweater Hoodie Pria aesthetic ANCE STUDIOS Beludru PanasMusim Gugur Berkerudung Dingin Remaja VersiKoreaTren", 
          gambar: 'https://down-id.img.susercontent.com/file/200a7847ea798d2fdae2dba7eadc58b4_tn',
          harga:  32900,
          link: 'https://shopee.co.id/dijaketan-COD-Switer-Sweater-Hoodie-Pria-aesthetic-ANCE-STUDIOS-Beludru-PanasMusim-Gugur-Berkerudung-Dingin-Remaja-VersiKoreaTren-i.111746656.9467518755?sp_atk=f5379587-9d56-499f-b0de-3b56e3b61c2e&xptdk=f5379587-9d56-499f-b0de-3b56e3b61c2e',
          terjual: '10RB+ Terjual',
        },
        {
          judul: 'Sendal Slip On Casual Pria By Fashion Sandal Slop Sandal Kokop Murah Pria Wanita Kekinian (Unisex)',
          gambar: 'https://down-id.img.susercontent.com/file/0a40227721c1ee73114e13858998644e_tn',
          harga: 10000,
          link: 'https://shopee.co.id/Sendal-Slip-On-Casual-Pria-By-Fashion-Sandal-Slop-Sandal-Kokop-Murah-Pria-Wanita-Kekinian-(Unisex)-i.158618602.20312344759?sp_atk=0382b830-74ef-4a12-8bad-7877e8b097f7&xptdk=0382b830-74ef-4a12-8bad-7877e8b097f7',
          terjual: '6,2RB Terjual',
        },
        {
          judul: 'Parfum Vanilla Cake 60ml Parfum Khas Aroma Vanilla Parfum Unisex', 
          gambar: 'https://down-id.img.susercontent.com/file/55ef6e51269efeea6167375c50052972_tn', 
          harga: 3500, 
          link: 'https://shopee.co.id/Parfum-Vanilla-Cake-60ml-Parfum-Khas-Aroma-Vanilla-Parfum-Unisex-i.603783036.19239775700?sp_atk=6bd3e932-1956-4248-9941-ed59e5d27a9d&xptdk=6bd3e932-1956-4248-9941-ed59e5d27a9d', 
          terjual: '10RB+ Terjual'
        },
        {
          judul: 'KAOS OVERSIZE ANGEL BEAR SHOWOFF', 
          gambar: 'https://down-id.img.susercontent.com/file/c6d3551def0064576c3cc1fc0d7e81b9_tn', 
          harga: 13299, 
          link: 'https://shopee.co.id/KAOS-OVERSIZE-ANGEL-BEAR-SHOWOFF-i.791671015.16283370083?sp_atk=6fea8132-9def-4fdf-8961-81bed8c9d28c&xptdk=6fea8132-9def-4fdf-8961-81bed8c9d28c', 
          terjual: '911 Terjual'
        },
        {
          judul: 'TWS Handsfree Headset Earphone Bluetooth Wireless Inpods', 
          gambar: 'https://down-id.img.susercontent.com/file/6045a3c260b71eb3c0601c10be5c9b27_tn', 
          harga: 27300, 
          link: 'https://shopee.co.id/TWS-Handsfree-Headset-Earphone-Bluetooth-Wireless-Inpods-i.315471606.8209972668?sp_atk=c8b7824a-cb0d-4813-9f80-ad4bd7e15781&xptdk=c8b7824a-cb0d-4813-9f80-ad4bd7e15781',
          terjual: '10RB+ Terjual'
        },
        {
          judul: 'Pulsa Paket Data Indosat Combo 100Mb Super Hemat', 
          gambar: 'https://down-id.img.susercontent.com/file/id-11134207-7qul4-lfbgi1j3isjla9_tn', 
          harga: 6990,
          link: 'https://shopee.co.id/Pulsa-Paket-Data-Indosat-Combo-100Mb-Super-Hemat-i.946954574.23037534209?sp_atk=fafc1d89-149c-423c-963e-861509bfa0f7&xptdk=fafc1d89-149c-423c-963e-861509bfa0f7', 
          terjual: '544 Terjual' 
        },
        {
          judul: 'kemeja panjang pria cowok gatlemen cowok biru navy dongker polos formal kantor', 
          gambar: 'https://down-id.img.susercontent.com/file/sg-11134201-22100-3bu15qmnz0iv00_tn', 
          harga: 24999, 
          link: 'https://shopee.co.id/kemeja-panjang-pria-cowok-gatlemen-cowok-biru-navy-dongker-polos-formal-kantor-i.14107285.19351638740?sp_atk=90603500-2042-4dcd-aba1-b7fdafdeade3&xptdk=90603500-2042-4dcd-aba1-b7fdafdeade3', 
          terjual: '7,9RB Terjual'
        },
        {
          judul: 'JAM DINDING TEMPEL DIY 3D ANALOG 7 MOTIF MODERN CLOCK',
          gambar: 'https://down-id.img.susercontent.com/file/e8bae06d130c978af1415ccecfdf5260_tn', 
          harga: 10500, 
          link: 'https://shopee.co.id/JAM-DINDING-TEMPEL-DIY-3D-ANALOG-7-MOTIF-MODERN-CLOCK-i.596325840.20531430044?sp_atk=a01b5bf9-7ae2-413b-9e4e-7f982201af7c&xptdk=a01b5bf9-7ae2-413b-9e4e-7f982201af7c', 
          terjual: '3,3RB Terjual'
        },
        {
          judul: 'kalung titanium model casandra pipih untuk pria dan wanita', 
          gambar: 'https://down-id.img.susercontent.com/file/62f643b70c7bbc85f1f6bb6e075bf3bd_tn', 
          harga:  4000, 
          link: 'https://shopee.co.id/kalung-titanium-model-casandra-pipih-untuk-pria-dan-wanita-i.551176333.12834908293?sp_atk=658ab375-cb29-4020-992d-81b4e85fdd75&xptdk=658ab375-cb29-4020-992d-81b4e85fdd75', 
          terjual: '10RB+ Terjual'
        }
      ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
