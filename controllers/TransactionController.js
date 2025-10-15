const Product = require("../models/Product"); // import model Product

exports.createTransaction = async (req, res) => {
  try {
    const { first_name, amount, product_id, quantity } = req.body;

    // Ambil produk
    const product = await Product.findById(product_id);
    if (!product) return res.status(404).json({ message: "Produk tidak ditemukan" });

    // Cek stock
    if (quantity > product.stock) {
      return res.status(400).json({ message: "Jumlah melebihi stok tersedia" });
    }

    // Kurangi stock dan tambah sales
    product.stock -= quantity;
    product.sales = (product.sales || 0) + quantity;
    await product.save();

    // Midtrans Snap
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    const order_id = "ORDER-" + new Date().getTime();
    const parameter = {
      transaction_details: {
        order_id,
        gross_amount: amount,
      },
      credit_card: { secure: true },
      customer_details: { first_name },
      callbacks: { finish: `${process.env.CLIENT_URL}/success-payment/${product_id}` },
    };

    const transactionSnap = await snap.createTransaction(parameter);
    const snapToken = transactionSnap.token;

    // Simpan transaksi
    const newTransaction = new Transaction({
      ...req.body,
      transaction_id: order_id,
      midtrans_url: snapToken,
    });

    await newTransaction.save();

    res.status(201).json({ message: "Transaksi berhasil dibuat", snap_token: snapToken, transaction_id: order_id });
  } catch (err) {
    console.error("Gagal membuat transaksi:", err);
    res.status(400).json({ message: err.message });
  }
};
